sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter"
], function (Controller, JSONModel, MessageToast, Filter, FilterOperator, Sorter) {
    "use strict";

    return Controller.extend("project1.controller.Dashboard", {

        onInit: function () {
            console.log("Dashboard controller initialized - Aircraft Maintenance Dashboard");
            
            // Initialize models and data
            this._initializeModels();
            this._initializeMetrics();
            this._initializeTNPData();
            this._initializeMTBFTrends();
        },

        _initializeModels: function () {
            console.log("Initializing comprehensive aircraft data models");
            
            // Comprehensive aircraft data matching React dashboard
            var aircraftData = [
                {
                    tailNumber: "N456AB",
                    model: "Boeing 737-800",
                    flightHoursSinceLastMaintenance: 125,
                    engineTemperature: 485,
                    vibrationLevel: 1.8,
                    hydraulicPressure: 3000,
                    brakeWearPercent: 25,
                    oilParticleCount: 850,
                    weatherStressIndex: 7.2,
                    aircraftAgeYears: 8,
                    flightCycles: 8920,
                    mtbf: 450,
                    lastFailureDate: "2023-11-15",
                    lastFailureType: "Hydraulic",
                    failureHistory: [
                        { date: "2023-11-15", type: "Hydraulic", severity: "minor" },
                        { date: "2023-08-22", type: "Engine", severity: "major" },
                        { date: "2023-05-10", type: "Landing Gear", severity: "minor" }
                    ],
                    // Calculated fields
                    overallStatus: "normal",
                    riskScore: 25.5,
                    nextMaintenanceEstimate: "2025-06-15",
                    alertStatus: "Normal",
                    maintenanceStatus: "Scheduled"
                },
                {
                    tailNumber: "N789CD",
                    model: "Airbus A320",
                    flightHoursSinceLastMaintenance: 890,
                    engineTemperature: 512,
                    vibrationLevel: 2.4,
                    hydraulicPressure: 2850,
                    brakeWearPercent: 67,
                    oilParticleCount: 1250,
                    weatherStressIndex: 8.9,
                    aircraftAgeYears: 5,
                    flightCycles: 6420,
                    mtbf: 320,
                    lastFailureDate: "2024-01-08",
                    lastFailureType: "Engine",
                    failureHistory: [
                        { date: "2024-01-08", type: "Engine", severity: "critical" },
                        { date: "2023-10-14", type: "Avionics", severity: "major" },
                        { date: "2023-07-03", type: "Hydraulic", severity: "minor" }
                    ],
                    overallStatus: "critical",
                    riskScore: 78.3,
                    nextMaintenanceEstimate: "2025-03-12",
                    alertStatus: "Critical",
                    maintenanceStatus: "Overdue"
                },
                {
                    tailNumber: "N123EF",
                    model: "Boeing 777-300",
                    flightHoursSinceLastMaintenance: 210,
                    engineTemperature: 498,
                    vibrationLevel: 1.2,
                    hydraulicPressure: 3200,
                    brakeWearPercent: 12,
                    oilParticleCount: 650,
                    weatherStressIndex: 5.1,
                    aircraftAgeYears: 12,
                    flightCycles: 11250,
                    mtbf: 680,
                    lastFailureDate: "2023-09-20",
                    lastFailureType: "Landing Gear",
                    failureHistory: [
                        { date: "2023-09-20", type: "Landing Gear", severity: "minor" },
                        { date: "2023-04-15", type: "Hydraulic", severity: "minor" }
                    ],
                    overallStatus: "normal",
                    riskScore: 18.9,
                    nextMaintenanceEstimate: "2025-12-10",
                    alertStatus: "Normal",
                    maintenanceStatus: "Scheduled"
                },
                {
                    tailNumber: "N654GH",
                    model: "Airbus A330",
                    flightHoursSinceLastMaintenance: 450,
                    engineTemperature: 545,
                    vibrationLevel: 1.9,
                    hydraulicPressure: 2650,
                    brakeWearPercent: 88,
                    oilParticleCount: 1450,
                    weatherStressIndex: 9.7,
                    aircraftAgeYears: 15,
                    flightCycles: 16890,
                    mtbf: 180,
                    lastFailureDate: "2024-02-01",
                    lastFailureType: "Brake System",
                    failureHistory: [
                        { date: "2024-02-01", type: "Brake System", severity: "critical" },
                        { date: "2023-12-18", type: "Engine", severity: "major" },
                        { date: "2023-09-05", type: "Hydraulic", severity: "major" },
                        { date: "2023-06-12", type: "Avionics", severity: "minor" }
                    ],
                    overallStatus: "critical",
                    riskScore: 89.1,
                    nextMaintenanceEstimate: "2025-02-15",
                    alertStatus: "Critical",
                    maintenanceStatus: "Overdue"
                },
                {
                    tailNumber: "N987IJ",
                    model: "Boeing 787-9",
                    flightHoursSinceLastMaintenance: 95,
                    engineTemperature: 475,
                    vibrationLevel: 1.1,
                    hydraulicPressure: 3100,
                    brakeWearPercent: 18,
                    oilParticleCount: 420,
                    weatherStressIndex: 4.3,
                    aircraftAgeYears: 3,
                    flightCycles: 4230,
                    mtbf: 720,
                    lastFailureDate: null,
                    lastFailureType: null,
                    failureHistory: [],
                    overallStatus: "normal",
                    riskScore: 12.4,
                    nextMaintenanceEstimate: "2025-11-20",
                    alertStatus: "Normal",
                    maintenanceStatus: "Scheduled"
                },
                {
                    tailNumber: "N321KL",
                    model: "Airbus A321",
                    flightHoursSinceLastMaintenance: 820,
                    engineTemperature: 501,
                    vibrationLevel: 2.1,
                    hydraulicPressure: 2950,
                    brakeWearPercent: 45,
                    oilParticleCount: 980,
                    weatherStressIndex: 6.8,
                    aircraftAgeYears: 7,
                    flightCycles: 7650,
                    mtbf: 380,
                    lastFailureDate: "2023-12-03",
                    lastFailureType: "Avionics",
                    failureHistory: [
                        { date: "2023-12-03", type: "Avionics", severity: "major" },
                        { date: "2023-08-15", type: "Engine", severity: "minor" }
                    ],
                    overallStatus: "warning",
                    riskScore: 45.2,
                    nextMaintenanceEstimate: "2025-07-18",
                    alertStatus: "Warning",
                    maintenanceStatus: "Scheduled"
                }
            ];

            // Calculate TNP data for each aircraft
            var tnpData = aircraftData.map(this._calculateTNP.bind(this));
            
            // Calculate fleet summary
            var fleetSummary = this._calculateFleetSummary(aircraftData);
            var riskDistribution = this._calculateRiskDistribution(aircraftData);

            // Create the main model with all data
            var dashboardModel = new JSONModel({
                Aircraft: aircraftData,
                TNPData: tnpData,
                FleetSummary: fleetSummary,
                RiskDistribution: riskDistribution,
                Models: this._getUniqueModels(aircraftData),
                AlertStatuses: this._getUniqueStatuses(aircraftData),
                SortOptions: this._getSortOptions(),
                CurrentFilter: {
                    model: "All",
                    sortField: "tailNumber",
                    sortOrder: "asc"
                }
            });

            this.getView().setModel(dashboardModel);
            console.log("Comprehensive dashboard data loaded:", {
                aircraftCount: aircraftData.length,
                fleetSummary: fleetSummary,
                riskDistribution: riskDistribution
            });
        },

        _initializeMetrics: function () {
            console.log("Initializing metrics data");
            
            // Modern metrics structure matching React dashboard
            var metricsData = {
                Metrics: [
                    {
                        title: "Aircraft in Service",
                        subtitle: "Active fleet count",
                        value: "247",
                        change: "+5",
                        trend: "up",
                        status: "success",
                        icon: "sap-icon://flight"
                    },
                    {
                        title: "Scheduled Maintenance",
                        subtitle: "Upcoming maintenance",
                        value: "18",
                        change: "+3",
                        trend: "up",
                        status: "neutral",
                        icon: "sap-icon://calendar"
                    },
                    {
                        title: "Compliance Rate",
                        subtitle: "Regulatory compliance",
                        value: "98.2%",
                        change: "+1.5%",
                        trend: "up",
                        status: "success",
                        icon: "sap-icon://accept"
                    },
                    {
                        title: "Avg. Turnaround Time",
                        subtitle: "Maintenance efficiency",
                        value: "4.2 hrs",
                        change: "-0.8",
                        trend: "down",
                        status: "success",
                        icon: "sap-icon://clock"
                    }
                ]
            };
            
            this.getView().setModel(new JSONModel(metricsData), "metrics");
        },

        _initializeTNPData: function () {
            console.log("Initializing TNP data");
            
            // TNP data will be calculated from aircraft data
            // This is handled in the main model initialization
        },

        _initializeMTBFTrends: function () {
            console.log("Initializing MTBF trends");
            
            // MTBF trend data for charts
            var mtbfTrendData = [
                {
                    month: "Aug",
                    boeing737: 420,
                    airbusA320: 380,
                    boeing777: 650,
                    airbusA330: 200,
                    boeing787: 750,
                    airbusA321: 360
                },
                {
                    month: "Sep",
                    boeing737: 435,
                    airbusA320: 365,
                    boeing777: 665,
                    airbusA330: 190,
                    boeing787: 740,
                    airbusA321: 370
                },
                {
                    month: "Oct",
                    boeing737: 445,
                    airbusA320: 350,
                    boeing777: 670,
                    airbusA330: 185,
                    boeing787: 730,
                    airbusA321: 375
                },
                {
                    month: "Nov",
                    boeing737: 440,
                    airbusA320: 340,
                    boeing777: 675,
                    airbusA330: 175,
                    boeing787: 720,
                    airbusA321: 380
                },
                {
                    month: "Dec",
                    boeing737: 450,
                    airbusA320: 320,
                    boeing777: 680,
                    airbusA330: 180,
                    boeing787: 720,
                    airbusA321: 380
                },
                {
                    month: "Jan",
                    boeing737: 450,
                    airbusA320: 320,
                    boeing777: 680,
                    airbusA330: 180,
                    boeing787: 720,
                    airbusA321: 380
                }
            ];
            
            this.getView().setModel(new JSONModel(mtbfTrendData), "mtbfTrends");
        },

        // Calculate predictive flags for each aircraft
        _calculatePredictiveFlags: function (aircraft) {
            var flags = [];

            // Vibration > 2.0g + FlightHours > 800 → failure probability 75%
            if (aircraft.vibrationLevel > 2.0 && aircraft.flightHoursSinceLastMaintenance > 800) {
                flags.push({
                    type: "critical",
                    message: "High failure probability (75%) - Vibration + Flight Hours",
                    priority: "immediate"
                });
            }

            // Oil particle count > 1000 → maintenance alert triggered
            if (aircraft.oilParticleCount > 1000) {
                flags.push({
                    type: "warning",
                    message: "Maintenance alert - Oil contamination detected",
                    priority: "high"
                });
            }

            // Brake wear > 85% → "critical" status
            if (aircraft.brakeWearPercent > 85) {
                flags.push({
                    type: "critical",
                    message: "Critical brake wear - Immediate replacement required",
                    priority: "immediate"
                });
            }

            // Additional threshold checks
            if (aircraft.vibrationLevel > 2.0) {
                flags.push({
                    type: "warning",
                    message: "Elevated vibration levels detected",
                    priority: "medium"
                });
            }

            if (aircraft.engineTemperature > 520) {
                flags.push({
                    type: "warning",
                    message: "Engine temperature above normal range",
                    priority: "high"
                });
            }

            return flags;
        },

        // Calculate overall status based on predictive flags
        _calculateOverallStatus: function (aircraft) {
            var flags = this._calculatePredictiveFlags(aircraft);
            var criticalFlags = flags.filter(function(f) { return f.type === "critical"; });
            var warningFlags = flags.filter(function(f) { return f.type === "warning"; });

            if (criticalFlags.length > 0) return "critical";
            if (warningFlags.length > 0) return "warning";
            return "normal";
        },

        // Enhanced TNP calculation
        _calculateTNP: function (aircraft) {
            // Base calculation: MTBF - current flight hours since last maintenance
            var baseDaysUntilMaintenance = Math.max(0, (aircraft.mtbf - aircraft.flightHoursSinceLastMaintenance) / 12);

            // Risk factors that reduce time to maintenance
            var riskMultiplier = 1.0;

            // High vibration reduces MTBF
            if (aircraft.vibrationLevel > 2.0) riskMultiplier *= 0.7;
            if (aircraft.vibrationLevel > 2.5) riskMultiplier *= 0.5;

            // High brake wear
            if (aircraft.brakeWearPercent > 70) riskMultiplier *= 0.8;
            if (aircraft.brakeWearPercent > 85) riskMultiplier *= 0.3;

            // Oil contamination
            if (aircraft.oilParticleCount > 1000) riskMultiplier *= 0.6;

            // Engine temperature
            if (aircraft.engineTemperature > 520) riskMultiplier *= 0.7;

            // Weather stress
            if (aircraft.weatherStressIndex > 8) riskMultiplier *= 0.8;

            // Aircraft age
            if (aircraft.aircraftAgeYears > 10) riskMultiplier *= 0.9;

            var adjustedDays = Math.floor(baseDaysUntilMaintenance * riskMultiplier);
            var isUrgent = adjustedDays <= 7;

            // Calculate failure risk based on multiple factors
            var failureRisk = 0;
            if (aircraft.vibrationLevel > 2.0 && aircraft.flightHoursSinceLastMaintenance > 800) failureRisk += 75;
            if (aircraft.brakeWearPercent > 85) failureRisk += 60;
            if (aircraft.oilParticleCount > 1000) failureRisk += 40;
            if (aircraft.engineTemperature > 520) failureRisk += 30;

            failureRisk = Math.min(95, failureRisk); // Cap at 95%

            return {
                tailNumber: aircraft.tailNumber,
                model: aircraft.model,
                daysUntilMaintenance: adjustedDays,
                isUrgent: isUrgent,
                predictedFailureRisk: failureRisk
            };
        },

        // Enhanced fleet summary calculation
        _calculateFleetSummary: function (aircraftData) {
            var totalAircraft = aircraftData.length;
            var criticalAircraft = aircraftData.filter(function(a) { return a.overallStatus === "critical"; }).length;
            var warningAircraft = aircraftData.filter(function(a) { return a.overallStatus === "warning"; }).length;
            var normalAircraft = aircraftData.filter(function(a) { return a.overallStatus === "normal"; }).length;

            var avgRiskScore = aircraftData.reduce(function(sum, a) { return sum + a.riskScore; }, 0) / totalAircraft;
            var avgMTBF = aircraftData.reduce(function(sum, a) { return sum + a.mtbf; }, 0) / totalAircraft;

            return {
                totalAircraft: totalAircraft,
                criticalAircraft: criticalAircraft,
                warningAircraft: warningAircraft,
                normalAircraft: normalAircraft,
                avgRiskScore: Math.round(avgRiskScore * 10) / 10,
                avgMTBF: Math.round(avgMTBF),
                complianceRate: Math.round(((normalAircraft + warningAircraft) / totalAircraft) * 1000) / 10
            };
        },

        // Enhanced risk distribution calculation
        _calculateRiskDistribution: function (aircraftData) {
            var lowRisk = aircraftData.filter(function(a) { return a.riskScore <= 30; }).length;
            var mediumRisk = aircraftData.filter(function(a) { return a.riskScore > 30 && a.riskScore <= 60; }).length;
            var highRisk = aircraftData.filter(function(a) { return a.riskScore > 60; }).length;

            return {
                low: lowRisk,
                medium: mediumRisk,
                high: highRisk
            };
        },

        // Get unique aircraft models for filter
        _getUniqueModels: function (aircraftData) {
            var models = aircraftData.map(function(a) { return a.model; });
            var uniqueModels = [...new Set(models)].sort();
            return uniqueModels.map(function(model) {
                return { model: model };
            });
        },

        // Get unique alert statuses for filter
        _getUniqueStatuses: function (aircraftData) {
            var statuses = aircraftData.map(function(a) { return a.alertStatus; });
            var uniqueStatuses = [...new Set(statuses)].sort();
            return uniqueStatuses.map(function(status) {
                return { status: status };
            });
        },

        // Get sort options
        _getSortOptions: function () {
            return [
                { value: "tailNumber", label: "Tail Number" },
                { value: "model", label: "Aircraft Model" },
                { value: "flightHoursSinceLastMaintenance", label: "Flight Hours" },
                { value: "engineTemperature", label: "Engine Temperature" },
                { value: "vibrationLevel", label: "Vibration Level" },
                { value: "brakeWearPercent", label: "Brake Wear" },
                { value: "oilParticleCount", label: "Oil Particles" },
                { value: "mtbf", label: "MTBF" },
                { value: "aircraftAgeYears", label: "Aircraft Age" },
                { value: "riskScore", label: "Risk Score" }
            ];
        },

        // Enhanced formatter methods
        formatOverallStatusState: function (status) {
            switch (status) {
                case "normal": return "Success";
                case "warning": return "Warning";
                case "critical": return "Error";
                default: return "None";
            }
        },

        formatRiskState: function (riskScore) {
            if (riskScore > 60) return "Error";
            if (riskScore > 30) return "Warning";
            return "Success";
        },

        formatTempState: function (temp) {
            if (temp > 520) return "Error";
            if (temp > 500) return "Warning";
            return "Success";
        },

        formatVibrationState: function (vibration) {
            if (vibration > 2.0) return "Error";
            if (vibration > 1.5) return "Warning";
            return "Success";
        },

        formatMaintenanceState: function (status) {
            switch (status) {
                case "Scheduled": return "Success";
                case "Overdue": return "Error";
                case "Completed": return "Success";
                default: return "None";
            }
        },

        // Event handlers for new functionality
        onAircraftSelect: function (oEvent) {
            var aircraftId = oEvent.getSource().getText();
            MessageToast.show("Selected aircraft: " + aircraftId);
            // Navigate to aircraft detail page
        },

        onViewAllAircraft: function () {
            MessageToast.show("Viewing all aircraft");
            // Navigate to aircraft list page
        },

        onApplyFilters: function () {
            var modelFilter = this.byId("modelFilter").getSelectedKey();
            var alertFilter = this.byId("alertFilter").getSelectedKey();
            var riskFilter = this.byId("riskFilter").getSelectedKey();
            var sortField = this.byId("sortSelect").getSelectedKey();

            MessageToast.show("Filters applied: " + modelFilter + ", " + alertFilter + ", " + riskFilter + ", Sort: " + sortField);
            
            // Apply filters to table
            this._applyTableFilters();
        },

        onResetFilters: function () {
            this.byId("modelFilter").setSelectedKey("");
            this.byId("alertFilter").setSelectedKey("");
            this.byId("riskFilter").setSelectedKey("All");
            this.byId("sortSelect").setSelectedKey("tailNumber");
            
            MessageToast.show("Filters reset");
            
            // Reset table filters
            this._resetTableFilters();
        },

        _applyTableFilters: function () {
            var table = this.byId("aircraftTable");
            var binding = table.getBinding("rows");
            
            if (binding) {
                var filters = [];
                var modelFilter = this.byId("modelFilter").getSelectedKey();
                var alertFilter = this.byId("alertFilter").getSelectedKey();
                var riskFilter = this.byId("riskFilter").getSelectedKey();

                if (modelFilter && modelFilter !== "") {
                    filters.push(new Filter("model", FilterOperator.EQ, modelFilter));
                }

                if (alertFilter && alertFilter !== "") {
                    filters.push(new Filter("alertStatus", FilterOperator.EQ, alertFilter));
                }

                if (riskFilter && riskFilter !== "All") {
                    var minRisk = 0, maxRisk = 100;
                    switch (riskFilter) {
                        case "Low": maxRisk = 30; break;
                        case "Medium": minRisk = 31; maxRisk = 60; break;
                        case "High": minRisk = 61; break;
                    }
                    filters.push(new Filter("riskScore", FilterOperator.BT, minRisk, maxRisk));
                }

                binding.filter(filters);
            }
        },

        _resetTableFilters: function () {
            var table = this.byId("aircraftTable");
            var binding = table.getBinding("rows");
            
            if (binding) {
                binding.filter([]);
            }
        },

        onNavigateToAnalytics: function () {
            MessageToast.show("Navigating to Fleet Analytics");
            // Navigate to analytics page
        },

        onNavigateToCompliance: function () {
            MessageToast.show("Navigating to Safety Compliance");
            // Navigate to compliance page
        },

        onNavigateToImport: function () {
            MessageToast.show("Navigating to Import Data");
            // Navigate to import page
        }
    });
});