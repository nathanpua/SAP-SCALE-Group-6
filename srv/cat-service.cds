using maintenance as my from '../db/data-model';
service MaintenanceService {
   @readonly
   entity Aircraft as projection on my.Aircraft {
       *,
       // Ensure all controller-expected fields are available
       flightHoursSinceLastMaintenance,
       
       // Calculated overall status based on alert status
       case alertStatus
           when 'Critical' then 'critical'
           when 'Warning' then 'warning'
           else 'normal'
       end as overallStatus : String,
       
       // Calculated failure risk percentage based on multiple factors
       case
           when (vibrationLevel > 2.0 and flightHoursSinceLastMaintenance > 800) then 75
           when brakeWearPercent > 85 then 60
           when oilParticleCount > 1000 then 40
           when engineTemperature > 520 then 30
           else cast(riskScore as Integer)
       end as predictedFailureRisk : Integer,
       
       // TNP calculation (days until maintenance)
       cast(((mtbf - flightHoursSinceLastMaintenance) / 12) as Integer) as daysUntilMaintenance : Integer,
       
       // Urgent maintenance flag
       case
           when ((mtbf - flightHoursSinceLastMaintenance) / 12) <= 7 then true
           else false
       end as isUrgent : Boolean,
       
       // Predictive flags as JSON string (simplified)
       case
           when (vibrationLevel > 2.0 and flightHoursSinceLastMaintenance > 800) then '[{"type":"critical","message":"High failure probability (75%) - Vibration + Flight Hours","priority":"immediate"}]'
           when oilParticleCount > 1000 then '[{"type":"warning","message":"Maintenance alert - Oil contamination detected","priority":"high"}]'
           when brakeWearPercent > 85 then '[{"type":"critical","message":"Critical brake wear - Immediate replacement required","priority":"immediate"}]'
           else '[]'
       end as predictiveFlags : String
   };
   
   @readonly
   entity FailureHistory as projection on my.FailureHistory;
   
   @readonly
   entity SensorThresholds as projection on my.SensorThresholds;
}


annotate MaintenanceService.Aircraft with @(
   UI.LineItem : [
       { Value: tailNumber, Label: 'Tail Number' },
       { Value: model, Label: 'Model' },
       { 
           Value: lastCheck, 
           Label: 'Last Check'
       },
       { 
           Value: nextCheck, 
           Label: 'Next Check'
       },
       { Value: flightHours, Label: 'Flight Hours' },
       { 
           Value: riskScore, 
           Label: 'Risk Score'
       },
       { 
           Value: alertStatus, 
           Label: 'Alert Status'
       },
       { Value: nextMaintenanceEstimate, Label: 'Next Maintenance' },
       { 
           Value: engineTemperature, 
           Label: 'Engine Temp (°C)'
       },
       { 
           Value: vibrationLevel, 
           Label: 'Vibration (g)'
       },
       { 
           Value: hydraulicPressure, 
           Label: 'Hydraulic (PSI)'
       },
       { 
           Value: brakeWearPercent, 
           Label: 'Brake Wear (%)'
       },
       { Value: thresholdExceeded, Label: 'Threshold Status' },
       { Value: maintenanceStatus, Label: 'Maintenance Status' }
   ],
   UI.SelectionFields : [
       tailNumber,
       model,
       alertStatus,
       riskScore,
       engineTemperature,
       vibrationLevel,
       thresholdExceeded,
       maintenanceStatus,
       lastCheck,
       nextCheck,
       nextMaintenanceEstimate
   ]
);
