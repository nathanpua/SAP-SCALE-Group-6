using maintenance as my from '../db/data-model';

service MaintenanceService {
   @readonly
   entity Aircraft as projection on my.Aircraft;
   
   // New entities for demand forecasting and pricing
   entity Routes as projection on my.Routes;
   entity DemandForecast as projection on my.DemandForecast;
   entity PricingRule as projection on my.PricingRule;
   entity BookingHistory as projection on my.BookingHistory;
   entity PriceHistory as projection on my.PriceHistory;
   
   // Custom actions for ML-powered operations
   action generateDemandForecast(routeId: String, forecastDays: Integer) returns String;
   action optimizePricing(routeId: String) returns Decimal;
   action simulatePricing(routeId: String, demandScenario: String) returns String;
   action bulkOptimizePricing() returns String;
   action trainDemandModel(routeId: String) returns String;
   
   // Analytics functions
   function getDemandTrends(routeId: String, days: Integer) returns String;
   function getPricingAnalytics(routeId: String) returns String;
   function getRoutePerformance() returns String;
}

// UI Annotations for Aircraft (existing)
annotate MaintenanceService.Aircraft with @(
   UI.LineItem : [
       { Value: tailNumber, Label: 'Tail Number' },
       { Value: model, Label: 'Model' },
       { Value: lastCheck, Label: 'Last Check' },
       { Value: nextCheck, Label: 'Next Check' },
       { Value: flightHours, Label: 'Flight Hours' }
   ]
);

// UI Annotations for Routes
annotate MaintenanceService.Routes with @(
   UI.LineItem : [
       { Value: routeId, Label: 'Route ID' },
       { Value: origin, Label: 'Origin' },
       { Value: destination, Label: 'Destination' },
       { Value: distance, Label: 'Distance (km)' },
       { Value: basePrice, Label: 'Base Price' },
       { Value: currentPrice, Label: 'Current Price', Criticality: #Positive },
       { Value: isActive, Label: 'Active' }
   ],
   UI.FieldGroup #RouteDetails : {
       $Type : 'UI.FieldGroupType',
       Data : [
           { Value: routeId, Label: 'Route ID' },
           { Value: origin, Label: 'Origin City' },
           { Value: destination, Label: 'Destination City' },
           { Value: distance, Label: 'Distance (km)' },
           { Value: basePrice, Label: 'Base Price' },
           { Value: currentPrice, Label: 'Current Price' },
           { Value: currency, Label: 'Currency' },
           { Value: isActive, Label: 'Status' }
       ]
   },
   UI.Facets : [
       {
           $Type : 'UI.ReferenceFacet',
           ID : 'RouteDetailsFacet',
           Label : 'Route Information',
           Target : '@UI.FieldGroup#RouteDetails'
       }
   ]
);

// UI Annotations for Demand Forecast
annotate MaintenanceService.DemandForecast with @(
   UI.LineItem : [
       { Value: route.routeId, Label: 'Route' },
       { Value: forecastDate, Label: 'Forecast Date' },
       { Value: predictedDemand, Label: 'Predicted Demand' },
       { Value: confidence, Label: 'Confidence %', Criticality: #Positive },
       { Value: seasonalFactor, Label: 'Seasonal Factor' },
       { Value: trendFactor, Label: 'Trend Factor' },
       { Value: modelVersion, Label: 'Model Version' }
   ],
   UI.HeaderInfo: {
       TypeName: 'Demand Forecast',
       TypeNamePlural: 'Demand Forecasts',
       Title: { Value: route.routeId }
   }
);

// UI Annotations for Pricing Rules
annotate MaintenanceService.PricingRule with @(
   UI.LineItem : [
       { Value: route.routeId, Label: 'Route' },
       { Value: ruleName, Label: 'Rule Name' },
       { Value: demandThreshold, Label: 'Demand Threshold' },
       { Value: priceMultiplier, Label: 'Price Multiplier' },
       { Value: maxPriceIncrease, Label: 'Max Increase %' },
       { Value: priority, Label: 'Priority' },
       { Value: isActive, Label: 'Active' }
   ]
);

// UI Annotations for Booking History
annotate MaintenanceService.BookingHistory with @(
   UI.LineItem : [
       { Value: route.routeId, Label: 'Route' },
       { Value: bookingDate, Label: 'Booking Date' },
       { Value: travelDate, Label: 'Travel Date' },
       { Value: passengerCount, Label: 'Passengers' },
       { Value: priceAtBooking, Label: 'Price' },
       { Value: seasonCode, Label: 'Season' },
       { Value: competitorPrice, Label: 'Competitor Price' }
   ]
);
