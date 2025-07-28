using maintenance as my from '../db/data-model';
service MaintenanceService {
   @readonly
   entity Aircraft as projection on my.Aircraft;
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
