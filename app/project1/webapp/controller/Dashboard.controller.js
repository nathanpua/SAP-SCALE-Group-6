sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Sorter",
    "project1/model/aircraftData"
], function (Controller, JSONModel, MessageToast, Filter, FilterOperator, Sorter, AircraftData) {
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
            
            // Get aircraft data from the dedicated model following SAP UI5 best practices
            var aircraftData = AircraftData.getAircraftData();

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

        onNavigateToImport: function () {
            MessageToast.show("Navigating to Import Data");
            // Navigate to import page
        }
    });
});