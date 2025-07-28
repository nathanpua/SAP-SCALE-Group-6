const cds = require('@sap/cds');

async function testDemandForecasting() {
    console.log('🚀 Starting Demand Forecasting & Pricing Optimization Demo...\n');
    
    try {
        // Connect to the service
        const service = await cds.connect.to('MaintenanceService');
        
        console.log('📊 1. Generating Demand Forecast for Route RT001 (NY-LA)...');
        const forecastResult = await service.send('POST', '/generateDemandForecast', {
            routeId: 'RT001',
            forecastDays: 7
        });
        console.log(`✅ ${forecastResult}\n`);
        
        console.log('💰 2. Optimizing Pricing for Route RT001...');
        const optimizedPrice = await service.send('POST', '/optimizePricing', {
            routeId: 'RT001'
        });
        console.log(`✅ Optimized price: $${optimizedPrice}\n`);
        
        console.log('🎭 3. Running Pricing Simulations...');
        const scenarios = ['low', 'normal', 'high', 'peak'];
        
        for (const scenario of scenarios) {
            const simulation = await service.send('POST', '/simulatePricing', {
                routeId: 'RT001',
                demandScenario: scenario
            });
            const result = JSON.parse(simulation);
            console.log(`📈 ${scenario.toUpperCase()} Scenario:`);
            console.log(`   Price: $${result.currentPrice} → $${result.simulatedPrice} (${result.priceChange})`);
            console.log(`   Revenue Change: ${result.revenueChange}`);
            console.log(`   Recommendation: ${result.recommendation}\n`);
        }
        
        console.log('📈 4. Getting Demand Trends Analysis...');
        const trends = await service.send('POST', '/getDemandTrends', {
            routeId: 'RT001',
            days: 7
        });
        const trendData = JSON.parse(trends);
        console.log(`✅ Trend Direction: ${trendData.trendDirection}`);
        console.log(`✅ Average Confidence: ${trendData.averageConfidence}\n`);
        
        console.log('🔄 5. Running Bulk Pricing Optimization...');
        const bulkResult = await service.send('POST', '/bulkOptimizePricing');
        console.log(`✅ ${bulkResult}\n`);
        
        console.log('🎉 Demo completed successfully! Check the UI for updated data.');
        
    } catch (error) {
        console.error('❌ Error during demo:', error.message);
        console.error('Full error:', error);
    }
}

// Run the demo
if (require.main === module) {
    testDemandForecasting().then(() => {
        console.log('\n📝 Next steps:');
        console.log('1. Run "cds watch" to start the application');
        console.log('2. Navigate to the Routes entity to see pricing changes');
        console.log('3. Check Demand Forecasts for ML predictions');
        console.log('4. Review Pricing Rules for optimization logic');
        process.exit(0);
    }).catch(err => {
        console.error('Demo failed:', err);
        process.exit(1);
    });
}

module.exports = { testDemandForecasting };
