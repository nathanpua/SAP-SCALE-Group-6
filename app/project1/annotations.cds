using MaintenanceService as service from '../../srv/cat-service';

annotate service.Aircraft with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Tail Number',
                Value : tailNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Model',
                Value : model,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Last Check',
                Value : lastCheck,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Next Check',
                Value : nextCheck,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Flight Hours',
                Value : flightHours,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Risk Score',
                Value : riskScore,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Alert Status',
                Value : alertStatus,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Next Maintenance',
                Value : nextMaintenanceEstimate,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Maintenance Status',
                Value : maintenanceStatus,
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
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

