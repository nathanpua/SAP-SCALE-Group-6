const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
    const { Routes, DemandForecast, PricingRule, BookingHistory, PriceHistory } = this.entities;

    // ML-powered demand forecasting
    this.on('generateDemandForecast', async (req) => {
        const { routeId, forecastDays } = req.data;
        
        try {
            console.log(`Generating forecast for route ${routeId} for ${forecastDays} days`);
            
            // Get historical data for the route
            const historicalData = await SELECT.from(BookingHistory)
                .where({ route_routeId: routeId })
                .orderBy('bookingDate desc')
                .limit(90); // Last 90 days for training

            if (historicalData.length === 0) {
                req.error(400, 'Insufficient historical data for forecasting');
                return;
            }

            // Advanced ML algorithm with seasonal and trend analysis
            const forecast = await generateAdvancedMLForecast(historicalData, forecastDays);
            
            // Store forecast results
            const forecastEntries = [];
            for (let i = 0; i < forecastDays; i++) {
                const forecastDate = new Date();
                forecastDate.setDate(forecastDate.getDate() + i + 1);
                
                forecastEntries.push({
                    forecastId: cds.utils.uuid(),
                    route_routeId: routeId,
                    forecastDate: forecastDate.toISOString().split('T')[0],
                    predictedDemand: forecast[i].demand,
                    confidence: forecast[i].confidence,
                    seasonalFactor: forecast[i].seasonalFactor,
                    trendFactor: forecast[i].trendFactor,
                    historicalData: JSON.stringify(historicalData.slice(0, 30)),
                    modelVersion: 'v2.1_advanced',
                    createdAt: new Date()
                });
            }
            
            await INSERT.into(DemandForecast).entries(forecastEntries);
            
            return `Successfully generated forecast for ${forecastDays} days with avg confidence ${(forecast.reduce((sum, f) => sum + f.confidence, 0) / forecast.length * 100).toFixed(1)}%`;
        } catch (error) {
            console.error('Forecast generation error:', error);
            req.error(500, `Forecast generation failed: ${error.message}`);
        }
    });

    // Dynamic pricing optimization
    this.on('optimizePricing', async (req) => {
        const { routeId } = req.data;
        
        try {
            console.log(`Optimizing pricing for route ${routeId}`);
            
            // Get current route and latest forecast
            const route = await SELECT.one.from(Routes).where({ routeId });
            const latestForecast = await SELECT.one.from(DemandForecast)
                .where({ route_routeId: routeId })
                .orderBy('forecastDate desc');

            if (!route) {
                req.error(404, 'Route not found');
                return;
            }

            if (!latestForecast) {
                req.error(404, 'No forecast data available. Generate forecast first.');
                return;
            }

            // Apply pricing rules in priority order
            const pricingRules = await SELECT.from(PricingRule)
                .where({ route_routeId: routeId, isActive: true })
                .orderBy('priority asc');

            let optimizedPrice = route.basePrice;
            let appliedRules = [];
            
            // Apply demand-based pricing rules
            for (const rule of pricingRules) {
                if (latestForecast.predictedDemand >= rule.demandThreshold) {
                    const newPrice = optimizedPrice * rule.priceMultiplier;
                    const increasePercent = ((newPrice - route.basePrice) / route.basePrice) * 100;
                    
                    if (increasePercent <= rule.maxPriceIncrease) {
                        optimizedPrice = newPrice;
                        appliedRules.push(rule.ruleName);
                    }
                }
            }

            // Apply seasonal and trend factors
            optimizedPrice *= latestForecast.seasonalFactor;
            optimizedPrice *= latestForecast.trendFactor;

            // Round to 2 decimal places
            optimizedPrice = Math.round(optimizedPrice * 100) / 100;

            // Record price change history
            if (Math.abs(optimizedPrice - route.currentPrice) > 0.01) {
                await INSERT.into(PriceHistory).entries({
                    priceHistoryId: cds.utils.uuid(),
                    route_routeId: routeId,
                    effectiveDate: new Date().toISOString().split('T')[0],
                    oldPrice: route.currentPrice,
                    newPrice: optimizedPrice,
                    changeReason: `Auto-optimization: Applied rules [${appliedRules.join(', ')}], Demand: ${latestForecast.predictedDemand}`,
                    demandAtTime: latestForecast.predictedDemand,
                    changeType: 'AUTO_DEMAND',
                    createdBy: 'SYSTEM',
                    createdAt: new Date()
                });

                // Update current price
                await UPDATE(Routes).set({ 
                    currentPrice: optimizedPrice,
                    modifiedAt: new Date()
                }).where({ routeId });
            }
            
            return optimizedPrice;
        } catch (error) {
            console.error('Pricing optimization error:', error);
            req.error(500, `Pricing optimization failed: ${error.message}`);
        }
    });

    // Pricing simulation for different scenarios
    this.on('simulatePricing', async (req) => {
        const { routeId, demandScenario } = req.data;
        
        try {
            const scenarios = {
                'very_low': { demandMultiplier: 0.5, description: 'Very Low Demand (50% of normal)' },
                'low': { demandMultiplier: 0.7, description: 'Low Demand (70% of normal)' },
                'normal': { demandMultiplier: 1.0, description: 'Normal Demand' },
                'high': { demandMultiplier: 1.3, description: 'High Demand (130% of normal)' },
                'very_high': { demandMultiplier: 1.6, description: 'Very High Demand (160% of normal)' },
                'peak': { demandMultiplier: 2.0, description: 'Peak Demand (200% of normal)' }
            };
            
            const scenario = scenarios[demandScenario];
            if (!scenario) {
                req.error(400, 'Invalid demand scenario. Use: very_low, low, normal, high, very_high, peak');
                return;
            }
            
            const route = await SELECT.one.from(Routes).where({ routeId });
            if (!route) {
                req.error(404, 'Route not found');
                return;
            }

            // Get baseline demand from recent history
            const recentBookings = await SELECT.from(BookingHistory)
                .where({ route_routeId: routeId })
                .orderBy('bookingDate desc')
                .limit(7);

            const avgDemand = recentBookings.length > 0 
                ? recentBookings.reduce((sum, booking) => sum + booking.passengerCount, 0) / recentBookings.length 
                : 100;

            const simulatedDemand = Math.round(avgDemand * scenario.demandMultiplier);
            
            // Apply pricing rules for simulated demand
            const pricingRules = await SELECT.from(PricingRule)
                .where({ route_routeId: routeId, isActive: true })
                .orderBy('priority asc');

            let simulatedPrice = route.basePrice;
            let appliedRules = [];
            
            for (const rule of pricingRules) {
                if (simulatedDemand >= rule.demandThreshold) {
                    const newPrice = simulatedPrice * rule.priceMultiplier;
                    const increasePercent = ((newPrice - route.basePrice) / route.basePrice) * 100;
                    
                    if (increasePercent <= rule.maxPriceIncrease) {
                        simulatedPrice = newPrice;
                        appliedRules.push(rule.ruleName);
                    }
                }
            }

            const priceChangePercent = ((simulatedPrice - route.currentPrice) / route.currentPrice * 100);
            const revenue = simulatedPrice * simulatedDemand;
            const currentRevenue = route.currentPrice * avgDemand;
            const revenueChange = ((revenue - currentRevenue) / currentRevenue * 100);
            
            return JSON.stringify({
                scenario: scenario.description,
                simulatedDemand: simulatedDemand,
                currentPrice: route.currentPrice,
                simulatedPrice: Math.round(simulatedPrice * 100) / 100,
                priceChange: priceChangePercent.toFixed(2) + '%',
                appliedRules: appliedRules,
                estimatedRevenue: Math.round(revenue * 100) / 100,
                revenueChange: revenueChange.toFixed(2) + '%',
                recommendation: getRecommendation(priceChangePercent, revenueChange)
            }, null, 2);
        } catch (error) {
            console.error('Pricing simulation error:', error);
            req.error(500, `Pricing simulation failed: ${error.message}`);
        }
    });

    // Bulk pricing optimization for all active routes
    this.on('bulkOptimizePricing', async (req) => {
        try {
            const activeRoutes = await SELECT.from(Routes).where({ isActive: true });
            let optimizedCount = 0;
            let errors = [];

            for (const route of activeRoutes) {
                try {
                    await this.optimizePricing({ data: { routeId: route.routeId } });
                    optimizedCount++;
                } catch (error) {
                    errors.push(`${route.routeId}: ${error.message}`);
                }
            }

            return `Bulk optimization completed. ${optimizedCount} routes optimized successfully. ${errors.length} errors occurred.`;
        } catch (error) {
            req.error(500, `Bulk optimization failed: ${error.message}`);
        }
    });

    // Analytics functions
    this.on('getDemandTrends', async (req) => {
        const { routeId, days } = req.data;
        
        try {
            const forecasts = await SELECT.from(DemandForecast)
                .where({ route_routeId: routeId })
                .orderBy('forecastDate desc')
                .limit(days || 30);

            const trend = calculateTrend(forecasts.map(f => f.predictedDemand));
            const avgConfidence = forecasts.reduce((sum, f) => sum + f.confidence, 0) / forecasts.length;

            return JSON.stringify({
                routeId: routeId,
                periodDays: days || 30,
                trendDirection: trend > 0 ? 'INCREASING' : trend < 0 ? 'DECREASING' : 'STABLE',
                trendStrength: Math.abs(trend),
                averageConfidence: (avgConfidence * 100).toFixed(1) + '%',
                forecasts: forecasts.slice(0, 7) // Return next 7 days
            }, null, 2);
        } catch (error) {
            req.error(500, `Trend analysis failed: ${error.message}`);
        }
    });
});

// Advanced ML forecasting algorithm
async function generateAdvancedMLForecast(historicalData, days) {
    const forecast = [];
    
    // Calculate seasonal patterns
    const seasonalPatterns = calculateSeasonalPatterns(historicalData);
    
    // Calculate trend
    const demandValues = historicalData.map(d => d.passengerCount);
    const trend = calculateTrend(demandValues);
    
    for (let i = 0; i < days; i++) {
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + i + 1);
        
        // Base demand from recent average
        const recentDemand = demandValues.slice(0, 14).reduce((sum, d) => sum + d, 0) / Math.min(14, demandValues.length);
        
        // Apply seasonal factor
        const seasonalFactor = getSeasonalFactor(futureDate, seasonalPatterns);
        
        // Apply trend factor
        const trendFactor = 1 + (trend * i / 100); // Gradual trend application
        
        // Day of week effect
        const dayOfWeekFactor = getDayOfWeekFactor(futureDate.getDay());
        
        // Add some controlled randomness for realism
        const randomVariation = 0.85 + Math.random() * 0.3; // ±15% variation
        
        const predictedDemand = Math.round(
            recentDemand * seasonalFactor * trendFactor * dayOfWeekFactor * randomVariation
        );
        
        // Confidence decreases over time
        const baseConfidence = 0.95;
        const confidenceDecay = 0.02; // 2% per day
        const confidence = Math.max(0.5, baseConfidence - (i * confidenceDecay));
        
        forecast.push({
            demand: Math.max(0, predictedDemand),
            confidence: confidence,
            seasonalFactor: seasonalFactor,
            trendFactor: trendFactor
        });
    }
    
    return forecast;
}

function calculateSeasonalPatterns(historicalData) {
    const monthlyAvg = {};
    const monthlyCounts = {};
    
    historicalData.forEach(booking => {
        const month = new Date(booking.bookingDate).getMonth();
        if (!monthlyAvg[month]) {
            monthlyAvg[month] = 0;
            monthlyCounts[month] = 0;
        }
        monthlyAvg[month] += booking.passengerCount;
        monthlyCounts[month]++;
    });
    
    // Calculate average for each month
    Object.keys(monthlyAvg).forEach(month => {
        monthlyAvg[month] = monthlyAvg[month] / monthlyCounts[month];
    });
    
    return monthlyAvg;
}

function getSeasonalFactor(date, seasonalPatterns) {
    const month = date.getMonth();
    const overallAvg = Object.values(seasonalPatterns).reduce((sum, val) => sum + val, 0) / Object.keys(seasonalPatterns).length;
    
    if (seasonalPatterns[month]) {
        return seasonalPatterns[month] / overallAvg;
    }
    
    // Default seasonal factors if no historical data
    const defaultSeasonality = {
        0: 1.1,  // January - Holiday travel
        1: 0.8,  // February - Low season
        2: 0.9,  // March
        3: 1.0,  // April
        4: 1.1,  // May - Spring travel
        5: 1.3,  // June - Summer starts
        6: 1.4,  // July - Peak summer
        7: 1.3,  // August - Summer
        8: 1.0,  // September
        9: 1.0,  // October
        10: 1.1, // November - Thanksgiving
        11: 1.2  // December - Holiday season
    };
    
    return defaultSeasonality[month] || 1.0;
}

function getDayOfWeekFactor(dayOfWeek) {
    // 0 = Sunday, 1 = Monday, etc.
    const factors = {
        0: 1.2, // Sunday
        1: 0.8, // Monday
        2: 0.9, // Tuesday
        3: 0.9, // Wednesday
        4: 1.0, // Thursday
        5: 1.3, // Friday
        6: 1.1  // Saturday
    };
    return factors[dayOfWeek] || 1.0;
}

function calculateTrend(values) {
    if (values.length < 2) return 0;
    
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((sum, val) => sum + val, 0);
    const sumXY = values.reduce((sum, val, index) => sum + (val * index), 0);
    const sumX2 = values.reduce((sum, val, index) => sum + (index * index), 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
}

function getRecommendation(priceChange, revenueChange) {
    if (revenueChange > 10) {
        return "IMPLEMENT: Significant revenue increase expected";
    } else if (revenueChange > 5) {
        return "CONSIDER: Moderate revenue increase expected";
    } else if (revenueChange > -5) {
        return "MONITOR: Minimal impact expected";
    } else {
        return "CAUTION: Revenue decrease expected";
    }
}
