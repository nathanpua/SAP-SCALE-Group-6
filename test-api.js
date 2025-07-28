const axios = require('axios');

async function testAPIs() {
    const baseURL = 'http://localhost:4004/odata/v4/maintenance';
    
    try {
        console.log('🔮 Testing Demand Forecast Generation...');
        const forecastResponse = await axios.post(`${baseURL}/generateDemandForecast`, {
            routeId: 'RT001',
            forecastDays: 7
        });
        console.log('✅ Forecast Result:', forecastResponse.data);

        console.log('\n💰 Testing Pricing Optimization...');
        const pricingResponse = await axios.post(`${baseURL}/optimizePricing`, {
            routeId: 'RT001'
        });
        console.log('✅ Optimized Price:', pricingResponse.data);

        console.log('\n🎭 Testing Pricing Simulation...');
        const scenarios = ['low', 'normal', 'high', 'peak'];
        for (const scenario of scenarios) {
            const simResponse = await axios.post(`${baseURL}/simulatePricing`, {
                routeId: 'RT001',
                demandScenario: scenario
            });
            console.log(`✅ ${scenario.toUpperCase()} scenario:`, JSON.parse(simResponse.data));
        }

        console.log('\n📊 Testing Analytics...');
        const trendsResponse = await axios.post(`${baseURL}/getDemandTrends`, {
            routeId: 'RT001',
            days: 7
        });
        console.log('✅ Demand Trends:', JSON.parse(trendsResponse.data));

    } catch (error) {
        console.error('❌ API Test failed:', error.response?.data || error.message);
    }
}

testAPIs();
