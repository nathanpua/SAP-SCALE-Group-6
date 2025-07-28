namespace maintenance;

entity Aircraft {
 key tailNumber          : String(10);
     model               : String(50);
     lastCheck           : Date;
     nextCheck           : Date;
     flightHours         : Integer;
}

// New entities for demand forecasting and pricing optimization
entity Routes {
    key routeId         : String(10);
        origin          : String(50);
        destination     : String(50);
        distance        : Integer;
        basePrice       : Decimal(10,2);
        currentPrice    : Decimal(10,2);
        currency        : String(3) default 'USD';
        isActive        : Boolean default true;
        createdAt       : Timestamp;
        modifiedAt      : Timestamp;
}

entity DemandForecast {
    key forecastId      : UUID;
    key route           : Association to Routes;
    key forecastDate    : Date;
        predictedDemand : Integer;
        confidence      : Decimal(3,2); // 0.00 to 1.00
        seasonalFactor  : Decimal(3,2);
        trendFactor     : Decimal(3,2);
        historicalData  : LargeString; // JSON with historical booking data
        modelVersion    : String(20);
        createdAt       : Timestamp;
}

entity PricingRule {
    key ruleId          : UUID;
        route           : Association to Routes;
        ruleName        : String(100);
        demandThreshold : Integer;
        priceMultiplier : Decimal(3,2);
        maxPriceIncrease: Decimal(3,2); // Maximum % increase allowed
        validFrom       : Date;
        validTo         : Date;
        isActive        : Boolean default true;
        priority        : Integer default 1;
        createdAt       : Timestamp;
}

entity BookingHistory {
    key bookingId       : UUID;
        route           : Association to Routes;
        bookingDate     : Date;
        travelDate      : Date;
        passengerCount  : Integer;
        priceAtBooking  : Decimal(10,2);
        seasonCode      : String(10); // SPRING, SUMMER, FALL, WINTER
        dayOfWeek       : Integer; // 1-7 (Monday-Sunday)
        isHoliday       : Boolean default false;
        weatherCondition: String(20);
        competitorPrice : Decimal(10,2);
        createdAt       : Timestamp;
}

entity PriceHistory {
    key priceHistoryId  : UUID;
        route           : Association to Routes;
        effectiveDate   : Date;
        oldPrice        : Decimal(10,2);
        newPrice        : Decimal(10,2);
        changeReason    : String(200);
        demandAtTime    : Integer;
        changeType      : String(20); // MANUAL, AUTO_DEMAND, AUTO_SEASONAL
        createdBy       : String(100);
        createdAt       : Timestamp;
}
