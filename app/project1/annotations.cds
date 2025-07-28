using MaintenanceService as service from '../../srv/cat-service';

// Existing Aircraft annotations
annotate service.Aircraft with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'tailNumber',
                Value : tailNumber,
            },
            {
                $Type : 'UI.DataField',
                Label : 'model',
                Value : model,
            },
            {
                $Type : 'UI.DataField',
                Label : 'lastCheck',
                Value : lastCheck,
            },
            {
                $Type : 'UI.DataField',
                Label : 'nextCheck',
                Value : nextCheck,
            },
            {
                $Type : 'UI.DataField',
                Label : 'flightHours',
                Value : flightHours,
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
    ]
);

// New Routes annotations
annotate service.Routes with @(
    UI.HeaderInfo: {
        TypeName: 'Route',
        TypeNamePlural: 'Routes',
        Title: { Value: routeId },
        Description: { Value: origin }
    },
    UI.SelectionFields: [
        origin,
        destination,
        isActive
    ],
    UI.FieldGroup #RouteDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Route ID',
                Value : routeId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Origin',
                Value : origin,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Destination',
                Value : destination,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Distance (km)',
                Value : distance,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Active',
                Value : isActive,
            }
        ],
    },
    UI.FieldGroup #PricingInfo : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Base Price',
                Value : basePrice,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Current Price',
                Value : currentPrice,
                Criticality: #Positive
            },
            {
                $Type : 'UI.DataField',
                Label : 'Currency',
                Value : currency,
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'RouteDetails',
            Label : 'Route Information',
            Target : '@UI.FieldGroup#RouteDetails',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'PricingInfo',
            Label : 'Pricing Information',
            Target : '@UI.FieldGroup#PricingInfo',
        }
    ]
);

// Demand Forecast annotations
annotate service.DemandForecast with @(
    UI.HeaderInfo: {
        TypeName: 'Demand Forecast',
        TypeNamePlural: 'Demand Forecasts',
        Title: { Value: route.routeId },
        Description: { Value: forecastDate }
    },
    UI.SelectionFields: [
        route.routeId,
        forecastDate,
        modelVersion
    ],
    UI.FieldGroup #ForecastDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Predicted Demand',
                Value : predictedDemand,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Confidence',
                Value : confidence,
                Criticality: #Positive
            },
            {
                $Type : 'UI.DataField',
                Label : 'Seasonal Factor',
                Value : seasonalFactor,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Trend Factor',
                Value : trendFactor,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Model Version',
                Value : modelVersion,
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'ForecastDetails',
            Label : 'Forecast Details',
            Target : '@UI.FieldGroup#ForecastDetails',
        }
    ]
);

// Pricing Rules annotations
annotate service.PricingRule with @(
    UI.HeaderInfo: {
        TypeName: 'Pricing Rule',
        TypeNamePlural: 'Pricing Rules',
        Title: { Value: ruleName },
        Description: { Value: route.routeId }
    },
    UI.SelectionFields: [
        route.routeId,
        isActive,
        priority
    ],
    UI.FieldGroup #RuleDetails : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Rule Name',
                Value : ruleName,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Demand Threshold',
                Value : demandThreshold,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Price Multiplier',
                Value : priceMultiplier,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Max Price Increase %',
                Value : maxPriceIncrease,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Priority',
                Value : priority,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Active',
                Value : isActive,
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'RuleDetails',
            Label : 'Rule Configuration',
            Target : '@UI.FieldGroup#RuleDetails',
        }
    ]
);

