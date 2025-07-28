sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/controls/VizFrame",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",
    "sap/ui/model/json/JSONModel"
], function (Controller, VizFrame, FlattenedDataset, ChartFormatter, Format, JSONModel) {
    "use strict";

    return Controller.extend("project1.controller.ChartController", {
        onInit: function () {
            // Initialize chart formatter
            Format.numericFormatter(ChartFormatter.getInstance());
            
            // Create models for chart data
            this._createChartModels();
            
            // Initialize charts
            this._initializeCharts();
        },

        _createChartModels: function () {
            // Model for temperature trend chart
            var oTemperatureModel = new JSONModel({
                dataset: {
                    dimensions: [
                        {
                            name: "Time",
                            values: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
                        }
                    ],
                    measures: [
                        {
                            name: "Engine Temperature",
                            values: [85, 87, 92, 95, 89, 86]
                        }
                    ]
                }
            });
            this.getView().setModel(oTemperatureModel, "temperatureModel");

            // Model for vibration trend chart
            var oVibrationModel = new JSONModel({
                dataset: {
                    dimensions: [
                        {
                            name: "Time",
                            values: ["00:00", "04:00", "08:00", "12:00", "16:00", "20:00"]
                        }
                    ],
                    measures: [
                        {
                            name: "Vibration Level",
                            values: [0.8, 0.9, 1.2, 1.5, 1.1, 0.9]
                        }
                    ]
                }
            });
            this.getView().setModel(oVibrationModel, "vibrationModel");
        },

        _initializeCharts: function () {
            // Initialize temperature trend chart
            this._createTemperatureChart();
            
            // Initialize vibration trend chart
            this._createVibrationChart();
        },

        _createTemperatureChart: function () {
            var oVizFrame = this.byId("temperatureChart");
            if (!oVizFrame) {
                return;
            }

            var oDataset = new FlattenedDataset({
                dimensions: [{
                    axis: 1,
                    name: "Time",
                    value: "{Time}"
                }],
                measures: [{
                    name: "Engine Temperature (°C)",
                    value: "{Engine Temperature}"
                }],
                data: {
                    path: "/dataset"
                }
            });

            oVizFrame.setDataset(oDataset);
            oVizFrame.setModel(this.getView().getModel("temperatureModel"));
            oVizFrame.setVizType("line");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        visible: true,
                        formatString: "%.1f°C"
                    }
                },
                title: {
                    visible: true,
                    text: "Engine Temperature Trend"
                },
                xAxis: {
                    title: {
                        visible: true,
                        text: "Time"
                    }
                },
                yAxis: {
                    title: {
                        visible: true,
                        text: "Temperature (°C)"
                    }
                }
            });
        },

        _createVibrationChart: function () {
            var oVizFrame = this.byId("vibrationChart");
            if (!oVizFrame) {
                return;
            }

            var oDataset = new FlattenedDataset({
                dimensions: [{
                    axis: 1,
                    name: "Time",
                    value: "{Time}"
                }],
                measures: [{
                    name: "Vibration Level (g)",
                    value: "{Vibration Level}"
                }],
                data: {
                    path: "/dataset"
                }
            });

            oVizFrame.setDataset(oDataset);
            oVizFrame.setModel(this.getView().getModel("vibrationModel"));
            oVizFrame.setVizType("line");
            oVizFrame.setVizProperties({
                plotArea: {
                    dataLabel: {
                        visible: true,
                        formatString: "%.2fg"
                    }
                },
                title: {
                    visible: true,
                    text: "Vibration Level Trend"
                },
                xAxis: {
                    title: {
                        visible: true,
                        text: "Time"
                    }
                },
                yAxis: {
                    title: {
                        visible: true,
                        text: "Vibration (g-force)"
                    }
                }
            });
        },

        // Method to update chart data with real-time values
        updateChartData: function (sAircraftId) {
            // This method will be called to update chart data with real-time sensor readings
            // Implementation will be added in Task 3.1 for real-time data refresh
        },

        // Method to handle chart interactions
        onChartClick: function (oEvent) {
            var oData = oEvent.getParameter("data");
            if (oData && oData.data) {
                // Handle chart click events for drill-down functionality
                this._handleChartDrillDown(oData);
            }
        },

        _handleChartDrillDown: function (oData) {
            // Implementation for drill-down functionality
            // Will be enhanced in future tasks
        }
    });
}); 