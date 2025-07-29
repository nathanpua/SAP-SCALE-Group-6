namespace maintenance;
entity Aircraft {
 key tailNumber          : String(10);
     model               : String(50);
     lastCheck           : Date;
     nextCheck           : Date;
     flightHours         : Integer;
     
     // Sensor Data Fields
     engineTemperature   : Decimal(5,2);  // in Celsius
     vibrationLevel      : Decimal(4,2);  // in g-force
     hydraulicPressure   : Decimal(6,2);  // in PSI
     brakeWearPercent    : Decimal(5,2);  // percentage 0-100
     oilParticleCount    : Integer;       // particles per ml
     
     // Weather and Operational Fields
     weatherStressIndex           : Decimal(4,2);  // stress factor 0-10
     flightHoursSinceLastMaintenance : Integer;    // hours since last maintenance
     aircraftAgeYears            : Integer;       // age in years
     flightCycles                : Integer;       // number of takeoff/landing cycles
     
     // Controller expected fields
     lastFailureDate             : Date;          // last failure date
     lastFailureType             : String(50);    // last failure type
     
     // Additional controller compatibility fields
     overallStatus               : String(20);    // overall status (normal, warning, critical)
     predictiveFlags             : String(500);   // JSON string of predictive flags
     failureHistory              : String(1000);  // JSON string of failure history array
     
     // Predictive Analytics Fields
     riskScore                   : Decimal(4,2);  // risk score 0-100
     mtbf                        : Integer;       // Mean Time Between Failures in hours
     nextMaintenanceEstimate     : Date;          // predicted next maintenance date
     alertStatus                 : String(20);    // Green, Yellow, Red, Critical
     thresholdExceeded           : Boolean;       // true if any threshold is exceeded
     
     // Maintenance Scheduling Fields
     scheduledMaintenanceDate    : Date;          // scheduled maintenance date
     maintenanceStatus           : String(20);    // Scheduled, In Progress, Completed, Cancelled
     scheduledBy                 : String(50);    // name of person who scheduled maintenance
}

entity FailureHistory {
 key ID                  : UUID;
     failureDate         : Date;
     failureType         : String(50);
     description         : String(500);
     severity            : Integer;  // 1=Low, 2=Medium, 3=High, 4=Critical
     aircraft            : Association to Aircraft;
}

entity SensorThresholds {
 key ID                  : UUID;
     aircraftType        : String(50);    // e.g., "Boeing 737", "Airbus A320"
     sensorType          : String(30);    // e.g., "engineTemperature", "vibrationLevel"
     warningThreshold    : Decimal(8,2);  // warning level threshold
     criticalThreshold   : Decimal(8,2);  // critical level threshold
     unit                : String(20);    // unit of measurement
     description         : String(200);   // description of the threshold
     isActive            : Boolean;       // whether this threshold is active
}
