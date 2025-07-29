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
            console.log("Dashboard controller initialized - Aircraft Maintenance Dashboard with Navbar");
            
            // Initialize models and data
            this._initializeModels();
            this._initializeMetrics();
            this._initializeTNPData();
            this._initializeMTBFTrends();
            this._initializeViewData();
        },

        _initializeViewData: function () {
            console.log("Initializing view navigation data");
            
            // Initialize view model for tab navigation
            var viewModel = new JSONModel({
                selectedTab: "flightOperations" // Default to Flight Operations tab
            });
            
            this.getView().setModel(viewModel, "view");
            console.log("View model initialized with default tab: flightOperations");
        },

        // Navigation tab selection handler
        onNavigationTabSelect: function (oEvent) {
            var selectedKey = oEvent.getParameter("selectedKey");
            console.log("Navigation tab selected:", selectedKey);
            
            // Update the view model
            this.getView().getModel("view").setProperty("/selectedTab", selectedKey);
            
            // Show toast for navigation feedback
            var tabNames = {
                "flightOperations": "Flight Operations",
                "fleet": "Fleet Management", 
                "maintenance": "Maintenance",
                "analytics": "Analytics",
                "alerts": "Alerts",
                "compliance": "Compliance"
            };
            
            MessageToast.show("Switched to " + (tabNames[selectedKey] || selectedKey));
        },

        // Navbar action handlers
        onNotifications: function () {
            MessageToast.show("Opening notifications...");
            // TODO: Implement notifications functionality
        },

        onSettings: function () {
            MessageToast.show("Opening settings...");
            // TODO: Implement settings functionality
        },

        onUserProfile: function () {
            MessageToast.show("Opening user profile...");
            // TODO: Implement user profile functionality
        },

        // Flight Operations tab handlers
        onScheduleFlight: function () {
            MessageToast.show("Opening flight scheduling...");
            // TODO: Implement flight scheduling functionality
        },

        onFlightStatus: function () {
            MessageToast.show("Opening flight status dashboard...");
            // TODO: Implement flight status functionality
        },

        onWeatherReport: function () {
            MessageToast.show("Opening weather report...");
            // TODO: Implement weather report functionality
        },

        onCrewManagement: function () {
            MessageToast.show("Opening crew management...");
            // TODO: Implement crew management functionality
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

            // Calculate predictive flags for each aircraft
            aircraftData.forEach(function(aircraft) {
                aircraft.predictiveFlags = this._calculatePredictiveFlags(aircraft);
            }.bind(this));

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

        // ===== NEW AIRCRAFT LIST EVENT HANDLERS =====

        /**
         * Handles press event on aircraft row
         * @param {sap.ui.base.Event} oEvent The press event
         */
        onAircraftRowPress: function(oEvent) {
            var oSource = oEvent.getSource();
            var oBindingContext = oSource.getBindingContext();
            var oAircraftData = oBindingContext.getObject();
            
            console.log("Aircraft row pressed:", oAircraftData.tailNumber);
            
            // Toggle expanded details section
            var sDetailsId = oSource.getId() + "-details";
            var oDetailsSection = oSource.getDependents().find(function(oItem) {
                return oItem.hasStyleClass && oItem.hasStyleClass("aircraft-details-expanded");
            });
            
            if (oDetailsSection) {
                var bCurrentVisible = oDetailsSection.getVisible();
                oDetailsSection.setVisible(!bCurrentVisible);
                
                // Add selection styling
                if (!bCurrentVisible) {
                    oSource.addStyleClass("selected");
                } else {
                    oSource.removeStyleClass("selected");
                }
            }
            
            sap.m.MessageToast.show(`Aircraft ${oAircraftData.tailNumber} details ${oDetailsSection && !oDetailsSection.getVisible() ? 'expanded' : 'collapsed'}`);
        },

        /**
         * Handles aircraft detail view button press
         * @param {sap.ui.base.Event} oEvent The press event
         */
        onAircraftDetailPress: function(oEvent) {
            var oBindingContext = oEvent.getSource().getBindingContext();
            var oAircraftData = oBindingContext.getObject();
            
            console.log("Aircraft detail view requested:", oAircraftData.tailNumber);
            
            // Navigate to aircraft detail view or open dialog
            this._openAircraftDetailDialog(oAircraftData);
        },

        /**
         * Handles schedule maintenance button press
         * @param {sap.ui.base.Event} oEvent The press event
         */
        onScheduleMaintenancePress: function(oEvent) {
            var oBindingContext = oEvent.getSource().getBindingContext();
            var oAircraftData = oBindingContext.getObject();
            
            console.log("Schedule maintenance requested:", oAircraftData.tailNumber);
            
            this._openMaintenanceScheduleDialog(oAircraftData);
        },

        // ===== FORMATTER METHODS FOR AIRCRAFT LIST =====

        /**
         * Formats temperature state for ObjectNumber
         * @param {number} fTemperature The temperature value
         * @returns {string} The state
         */
        formatTempState: function(fTemperature) {
            if (fTemperature > 520) {
                return "Error";
            } else if (fTemperature > 480) {
                return "Warning";
            } else {
                return "Success";
            }
        },

        /**
         * Formats vibration state for ObjectNumber
         * @param {number} fVibration The vibration value
         * @returns {string} The state
         */
        formatVibrationState: function(fVibration) {
            if (fVibration > 2.0) {
                return "Error";
            } else if (fVibration > 1.5) {
                return "Warning";
            } else {
                return "Success";
            }
        },

        /**
         * Formats risk score state for ObjectNumber
         * @param {number} iRiskScore The risk score value
         * @returns {string} The state
         */
        formatRiskState: function(iRiskScore) {
            if (iRiskScore >= 80) {
                return "Error";
            } else if (iRiskScore >= 60) {
                return "Warning";
            } else {
                return "Success";
            }
        },

        /**
         * Formats maintenance status state
         * @param {string} sStatus The maintenance status
         * @returns {string} The state
         */
        formatMaintenanceState: function(sStatus) {
            switch (sStatus) {
                case "Overdue":
                case "Critical":
                    return "Error";
                case "Due Soon":
                case "Scheduled":
                    return "Warning";
                case "Current":
                case "Complete":
                    return "Success";
                default:
                    return "None";
            }
        },

        // ===== PRIVATE HELPER METHODS =====

        /**
         * Opens aircraft detail dialog
         * @param {object} oAircraftData The aircraft data
         * @private
         */
        _openAircraftDetailDialog: function(oAircraftData) {
            var that = this;
            
            if (!this._oAircraftDetailDialog) {
                this._oAircraftDetailDialog = new sap.m.Dialog({
                    title: "Aircraft Details",
                    contentWidth: "800px",
                    contentHeight: "600px",
                    content: [
                        new sap.m.VBox({
                            class: "sapUiMediumMargin",
                            items: [
                                new sap.m.Title({
                                    text: "{tailNumber} - {model}",
                                    level: "H2",
                                    class: "sapUiMediumMarginBottom"
                                }),
                                new sap.m.ObjectHeader({
                                    title: "{tailNumber}",
                                    number: "{overallStatus}",
                                    numberState: "{path: 'overallStatus', formatter: '.formatOverallStatusState'}",
                                    statuses: [
                                        new sap.m.ObjectStatus({
                                            text: "Age: {aircraftAgeYears} years",
                                            state: "Information"
                                        }),
                                        new sap.m.ObjectStatus({
                                            text: "Risk Score: {riskScore}",
                                            state: "{path: 'riskScore', formatter: '.formatRiskState'}"
                                        })
                                    ]
                                }),
                                new sap.m.Table({
                                    headerText: "Operational Metrics",
                                    class: "sapUiMediumMarginTop",
                                    columns: [
                                        new sap.m.Column({header: new sap.m.Text({text: "Metric"})}),
                                        new sap.m.Column({header: new sap.m.Text({text: "Value"})}),
                                        new sap.m.Column({header: new sap.m.Text({text: "Status"})})
                                    ],
                                    items: [
                                        new sap.m.ColumnListItem({
                                            cells: [
                                                new sap.m.Text({text: "Flight Hours"}),
                                                new sap.m.Text({text: "{flightHoursSinceLastMaintenance}"}),
                                                new sap.m.ObjectStatus({text: "Normal", state: "Success"})
                                            ]
                                        }),
                                        new sap.m.ColumnListItem({
                                            cells: [
                                                new sap.m.Text({text: "Engine Temperature"}),
                                                new sap.m.Text({text: "{engineTemperature}°C"}),
                                                new sap.m.ObjectStatus({
                                                    text: "{= ${engineTemperature} > 520 ? 'Critical' : ${engineTemperature} > 480 ? 'Warning' : 'Normal'}",
                                                    state: "{path: 'engineTemperature', formatter: '.formatTempState'}"
                                                })
                                            ]
                                        }),
                                        new sap.m.ColumnListItem({
                                            cells: [
                                                new sap.m.Text({text: "Vibration Level"}),
                                                new sap.m.Text({text: "{vibrationLevel}g"}),
                                                new sap.m.ObjectStatus({
                                                    text: "{= ${vibrationLevel} > 2.0 ? 'Critical' : ${vibrationLevel} > 1.5 ? 'Warning' : 'Normal'}",
                                                    state: "{path: 'vibrationLevel', formatter: '.formatVibrationState'}"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ],
                    beginButton: new sap.m.Button({
                        text: "Close",
                        press: function() {
                            that._oAircraftDetailDialog.close();
                        }
                    })
                });
                this.getView().addDependent(this._oAircraftDetailDialog);
            }
            
            // Create a JSON model for the dialog
            var oDetailModel = new JSONModel(oAircraftData);
            this._oAircraftDetailDialog.setModel(oDetailModel);
            
            this._oAircraftDetailDialog.open();
        },

        /**
         * Opens maintenance schedule dialog
         * @param {object} oAircraftData The aircraft data
         * @private
         */
        _openMaintenanceScheduleDialog: function(oAircraftData) {
            var that = this;
            
            if (!this._oMaintenanceDialog) {
                this._oMaintenanceDialog = new sap.m.Dialog({
                    title: "Schedule Maintenance",
                    contentWidth: "600px",
                    content: [
                        new sap.m.VBox({
                            class: "sapUiMediumMargin",
                            items: [
                                new sap.m.Title({
                                    text: "Schedule Maintenance for {tailNumber}",
                                    level: "H3",
                                    class: "sapUiMediumMarginBottom"
                                }),
                                new sap.m.form.SimpleForm({
                                    editable: true,
                                    layout: "ResponsiveGridLayout",
                                    content: [
                                        new sap.m.Label({text: "Maintenance Type:"}),
                                        new sap.m.ComboBox({
                                            items: [
                                                new sap.ui.core.Item({key: "routine", text: "Routine Inspection"}),
                                                new sap.ui.core.Item({key: "engine", text: "Engine Service"}),
                                                new sap.ui.core.Item({key: "brake", text: "Brake Replacement"}),
                                                new sap.ui.core.Item({key: "emergency", text: "Emergency Repair"})
                                            ]
                                        }),
                                        new sap.m.Label({text: "Scheduled Date:"}),
                                        new sap.m.DatePicker({
                                            value: "{path: 'nextMaintenanceEstimate', type: 'sap.ui.model.type.Date', formatOptions: {pattern: 'yyyy-MM-dd'}}"
                                        }),
                                        new sap.m.Label({text: "Priority:"}),
                                        new sap.m.ComboBox({
                                            items: [
                                                new sap.ui.core.Item({key: "low", text: "Low"}),
                                                new sap.ui.core.Item({key: "medium", text: "Medium"}),
                                                new sap.ui.core.Item({key: "high", text: "High"}),
                                                new sap.ui.core.Item({key: "critical", text: "Critical"})
                                            ]
                                        }),
                                        new sap.m.Label({text: "Notes:"}),
                                        new sap.m.TextArea({
                                            rows: 3,
                                            placeholder: "Enter any additional notes..."
                                        })
                                    ]
                                })
                            ]
                        })
                    ],
                    beginButton: new sap.m.Button({
                        text: "Schedule",
                        type: "Emphasized",
                        press: function() {
                            sap.m.MessageToast.show(`Maintenance scheduled for ${oAircraftData.tailNumber}`);
                            that._oMaintenanceDialog.close();
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: function() {
                            that._oMaintenanceDialog.close();
                        }
                    })
                });
                this.getView().addDependent(this._oMaintenanceDialog);
            }
            
            // Create a JSON model for the dialog
            var oMaintenanceModel = new JSONModel(oAircraftData);
            this._oMaintenanceDialog.setModel(oMaintenanceModel);
            
            this._oMaintenanceDialog.open();
        },

        // ===== EXISTING METHODS (preserved) =====

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

        // ===== IMAGE GALLERY EVENT HANDLERS =====

        /**
         * Handles image press event to show full screen view
         * @param {sap.ui.base.Event} oEvent The press event
         */
        onImagePress: function(oEvent) {
            var oImage = oEvent.getSource();
            var sImageSrc = oImage.getSrc();
            var sImageAlt = oImage.getAlt();
            
            this._showImageModal(sImageSrc, sImageAlt);
        },

        /**
         * Shows all charts in a expanded view
         */
        onViewAllCharts: function() {
            MessageToast.show("Opening comprehensive charts view...");
            // TODO: Implement expanded charts view
            this._openChartsDialog();
        },

        /**
         * Handles chart upload functionality
         */
        onUploadChart: function() {
            MessageToast.show("Opening chart upload dialog...");
            // TODO: Implement chart upload functionality
            this._openUploadDialog();
        },

        /**
         * Exports the entire gallery
         */
        onExportGallery: function() {
            MessageToast.show("Preparing gallery export...");
            // TODO: Implement gallery export functionality
            this._exportGallery();
        },

        // ===== PRIVATE IMAGE GALLERY METHODS =====

        /**
         * Shows image in full screen modal
         * @param {string} sImageSrc The image source URL
         * @param {string} sImageAlt The image alt text
         * @private
         */
        _showImageModal: function(sImageSrc, sImageAlt) {
            var that = this;
            
            if (!this._oImageModal) {
                this._oImageModal = new sap.m.Dialog({
                    title: "Chart Viewer",
                    contentWidth: "90%",
                    contentHeight: "90%",
                    resizable: true,
                    draggable: true,
                    content: [
                        new sap.m.VBox({
                            items: [
                                new sap.m.Image({
                                    id: "modalImage",
                                    width: "100%",
                                    height: "auto",
                                    densityAware: false
                                })
                            ]
                        })
                    ],
                    endButton: new sap.m.Button({
                        text: "Close",
                        press: function() {
                            that._oImageModal.close();
                        }
                    }),
                    beginButton: new sap.m.Button({
                        text: "Download",
                        icon: "sap-icon://download",
                        press: function() {
                            that._downloadImage(sImageSrc, sImageAlt);
                        }
                    })
                });
                
                this.getView().addDependent(this._oImageModal);
            }
            
            // Update modal content
            var oModalImage = sap.ui.getCore().byId("modalImage");
            if (oModalImage) {
                oModalImage.setSrc(sImageSrc);
                oModalImage.setAlt(sImageAlt);
            }
            
            this._oImageModal.setTitle(sImageAlt || "Chart Viewer");
            this._oImageModal.open();
        },

        /**
         * Opens the expanded charts dialog
         * @private
         */
        _openChartsDialog: function() {
            var that = this;
            
            if (!this._oChartsDialog) {
                this._oChartsDialog = new sap.m.Dialog({
                    title: "All Analytics Charts",
                    contentWidth: "95%",
                    contentHeight: "95%",
                    resizable: true,
                    draggable: true,
                    content: [
                        new sap.m.VBox({
                            items: [
                                new sap.m.Text({
                                    text: "This will display all available analytics charts in an expanded grid view."
                                })
                            ]
                        })
                    ],
                    endButton: new sap.m.Button({
                        text: "Close",
                        press: function() {
                            that._oChartsDialog.close();
                        }
                    })
                });
                
                this.getView().addDependent(this._oChartsDialog);
            }
            
            this._oChartsDialog.open();
        },

        /**
         * Opens the upload dialog
         * @private
         */
        _openUploadDialog: function() {
            var that = this;
            
            if (!this._oUploadDialog) {
                this._oUploadDialog = new sap.m.Dialog({
                    title: "Upload New Chart",
                    contentWidth: "500px",
                    content: [
                        new sap.m.VBox({
                            items: [
                                new sap.m.Label({ text: "Chart Title:" }),
                                new sap.m.Input({ 
                                    id: "chartTitleInput",
                                    placeholder: "Enter chart title"
                                }),
                                new sap.m.Label({ text: "Chart Description:" }),
                                new sap.m.TextArea({ 
                                    id: "chartDescInput",
                                    placeholder: "Enter chart description",
                                    rows: 3
                                }),
                                new sap.m.Label({ text: "Upload File:" }),
                                new sap.ui.unified.FileUploader({
                                    id: "chartFileUploader",
                                    uploadUrl: "/upload",
                                    fileType: ["png", "jpg", "jpeg", "svg"],
                                    maximumFileSize: 5,
                                    placeholder: "Choose chart image file..."
                                })
                            ]
                        })
                    ],
                    beginButton: new sap.m.Button({
                        text: "Upload",
                        type: "Emphasized",
                        press: function() {
                            that._handleChartUpload();
                        }
                    }),
                    endButton: new sap.m.Button({
                        text: "Cancel",
                        press: function() {
                            that._oUploadDialog.close();
                        }
                    })
                });
                
                this.getView().addDependent(this._oUploadDialog);
            }
            
            this._oUploadDialog.open();
        },

        /**
         * Handles chart upload
         * @private
         */
        _handleChartUpload: function() {
            var sTitle = sap.ui.getCore().byId("chartTitleInput").getValue();
            var sDescription = sap.ui.getCore().byId("chartDescInput").getValue();
            var oFileUploader = sap.ui.getCore().byId("chartFileUploader");
            
            if (!sTitle || !oFileUploader.getValue()) {
                MessageToast.show("Please provide a title and select a file");
                return;
            }
            
            // Simulate upload
            MessageToast.show("Chart uploaded successfully: " + sTitle);
            this._oUploadDialog.close();
            
            // TODO: Implement actual file upload logic
        },

        /**
         * Downloads an image
         * @param {string} sImageSrc The image source URL
         * @param {string} sFileName The filename for download
         * @private
         */
        _downloadImage: function(sImageSrc, sFileName) {
            try {
                var link = document.createElement('a');
                link.href = sImageSrc;
                link.download = sFileName || 'chart.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                MessageToast.show("Download started: " + (sFileName || 'chart.png'));
            } catch (error) {
                MessageToast.show("Download failed. Please try again.");
                console.error("Download error:", error);
            }
        },

        /**
         * Exports the entire gallery
         * @private
         */
        _exportGallery: function() {
            var galleryData = {
                exportDate: new Date().toISOString(),
                charts: [
                    {
                        title: "Fleet Distribution Analysis",
                        description: "Aircraft distribution across fleet categories",
                        url: "./images/fleet_distribution_histogram_professional.png"
                    },
                    {
                        title: "KPI Summary Dashboard", 
                        description: "Key performance indicators overview",
                        url: "./images/kpi_summary_professional.png"
                    },
                    {
                        title: "Time to Next Predicted Maintenance",
                        description: "Predictive maintenance timeline analysis", 
                        url: "./images/tnp_bar_chart_professional.png"
                    },
                    {
                        title: "Aircraft Selection Interface",
                        description: "Interactive aircraft selection mockup",
                        url: "./images/dropdown_aircraft_mockup.png"
                    }
                ]
            };
            
            var dataStr = JSON.stringify(galleryData, null, 2);
            var dataBlob = new Blob([dataStr], {type: 'application/json'});
            
            var link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = 'analytics-gallery-export.json';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            MessageToast.show("Gallery exported successfully");
        },

        onNavigateToImport: function () {
            MessageToast.show("Navigating to Import Data");
            // Navigate to import page
        },

        // ===== MTBF ANALYSIS EVENT HANDLERS =====

        /**
         * Handles aircraft selection change in MTBF analysis
         * @param {sap.ui.base.Event} oEvent The selection change event
         */
        onAircraftSelectionChange: function(oEvent) {
            var selectedKey = oEvent.getParameter("selectedItem").getKey();
            var selectedText = oEvent.getParameter("selectedItem").getText();
            
            console.log("Selected aircraft for MTBF analysis:", selectedKey);
            MessageToast.show("Analyzing MTBF trends for " + selectedText);
            
            // Update the view model with selected aircraft
            var oModel = this.getView().getModel();
            oModel.setProperty("/selectedAircraft", selectedKey);
            
            // Refresh MTBF chart data for selected aircraft
            this._updateMTBFChart(selectedKey);
        },

        /**
         * Handles time period selection change
         * @param {sap.ui.base.Event} oEvent The selection change event
         */
        onTimePeriodChange: function(oEvent) {
            var selectedPeriod = oEvent.getParameter("item").getKey();
            console.log("Time period changed to:", selectedPeriod);
            
            MessageToast.show("Updating MTBF trends for " + selectedPeriod + " view");
            
            // Update chart with new time period
            this._updateChartTimePeriod(selectedPeriod);
        },

        /**
         * Updates MTBF chart based on selected aircraft
         * @param {string} sAircraftId The selected aircraft ID
         * @private
         */
        _updateMTBFChart: function(sAircraftId) {
            var oModel = this.getView().getModel();
            var aAircraft = oModel.getProperty("/Aircraft");
            var selectedAircraft = aAircraft.find(aircraft => aircraft.tailNumber === sAircraftId);
            
            if (selectedAircraft) {
                // Generate sample MTBF trend data for the selected aircraft
                var aTrendData = this._generateMTBFTrendData(selectedAircraft);
                oModel.setProperty("/selectedAircraftMTBF", aTrendData);
                
                console.log("MTBF chart updated for aircraft:", sAircraftId);
            }
        },

        /**
         * Updates chart display based on time period
         * @param {string} sPeriod The selected time period (weekly/monthly/quarterly)
         * @private
         */
        _updateChartTimePeriod: function(sPeriod) {
            var oModel = this.getView().getModel();
            
            // Generate time-appropriate labels and data
            var aTimeLabels = this._generateTimeLabels(sPeriod);
            var aMTBFData = this._generatePeriodMTBFData(sPeriod);
            
            oModel.setProperty("/chartTimeLabels", aTimeLabels);
            oModel.setProperty("/chartMTBFData", aMTBFData);
            
            console.log("Chart updated for period:", sPeriod);
        },

        /**
         * Generates MTBF trend data for a specific aircraft
         * @param {object} oAircraft The aircraft object
         * @returns {array} Array of trend data points
         * @private
         */
        _generateMTBFTrendData: function(oAircraft) {
            var baseMTBF = oAircraft.mtbf || 400;
            var trendData = [];
            
            // Generate 6 months of trend data
            var months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
            
            for (var i = 0; i < months.length; i++) {
                // Add some variation to the base MTBF
                var variation = (Math.random() - 0.5) * 100; // ±50 hours variation
                var mtbfValue = Math.max(100, baseMTBF + variation);
                
                trendData.push({
                    period: months[i],
                    mtbf: Math.round(mtbfValue),
                    aircraftModel: oAircraft.model,
                    tailNumber: oAircraft.tailNumber
                });
            }
            
            return trendData;
        },

        /**
         * Generates time labels based on period
         * @param {string} sPeriod The time period
         * @returns {array} Array of time labels
         * @private
         */
        _generateTimeLabels: function(sPeriod) {
            switch (sPeriod) {
                case "weekly":
                    return ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
                case "monthly":
                    return ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
                case "quarterly":
                    return ["Q2", "Q3", "Q4", "Q1"];
                default:
                    return ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];
            }
        },

        /**
         * Generates MTBF data for different time periods
         * @param {string} sPeriod The time period
         * @returns {array} Array of MTBF data by aircraft model
         * @private
         */
        _generatePeriodMTBFData: function(sPeriod) {
            var models = ["Boeing 737", "Airbus A320", "Boeing 777", "Boeing 787", "Airbus A330", "Airbus A321"];
            var timeLabels = this._generateTimeLabels(sPeriod);
            var mtbfData = [];
            
            models.forEach(function(model) {
                var modelData = {
                    model: model,
                    data: []
                };
                
                var baseMTBF = this._getBaseMTBFForModel(model);
                
                timeLabels.forEach(function(label) {
                    var variation = (Math.random() - 0.5) * 100;
                    var mtbfValue = Math.max(100, baseMTBF + variation);
                    
                    modelData.data.push({
                        period: label,
                        mtbf: Math.round(mtbfValue)
                    });
                });
                
                mtbfData.push(modelData);
            }.bind(this));
            
            return mtbfData;
        },

        /**
         * Gets base MTBF value for aircraft model
         * @param {string} sModel The aircraft model
         * @returns {number} Base MTBF value
         * @private
         */
        _getBaseMTBFForModel: function(sModel) {
            var baseMTBFValues = {
                "Boeing 737": 450,
                "Airbus A320": 380,
                "Boeing 777": 680,
                "Boeing 787": 750,
                "Airbus A330": 200,
                "Airbus A321": 380
            };
            
            return baseMTBFValues[sModel] || 400;
        }
    });
});