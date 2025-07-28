sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/core/format/NumberFormat"
], function (Controller, JSONModel, MessageToast, NumberFormat) {
    "use strict";

    return Controller.extend("project1.controller.AnalyticalTableController", {
        onInit: function () {
            // Initialize formatters
            this._initializeFormatters();
            
            // Set up conditional formatting
            this._setupConditionalFormatting();
        },

        _initializeFormatters: function () {
            // Number formatter for sensor values
            this.oNumberFormatter = NumberFormat.getFloatInstance({
                minFractionDigits: 1,
                maxFractionDigits: 2
            });
        },

        _setupConditionalFormatting: function () {
            // This will be called when the table is initialized
            // Conditional formatting will be applied through data binding
        },

        // Formatter for risk score with color coding
        formatRiskScore: function (value) {
            if (!value) return "";
            
            var formattedValue = this.oNumberFormatter.format(value);
            
            // Return object with value and state for conditional formatting
            return {
                value: formattedValue,
                state: this._getRiskScoreState(value)
            };
        },

        // Formatter for engine temperature with color coding
        formatEngineTemperature: function (value) {
            if (!value) return "";
            
            var formattedValue = this.oNumberFormatter.format(value) + "°C";
            
            return {
                value: formattedValue,
                state: this._getTemperatureState(value)
            };
        },

        // Formatter for vibration level with color coding
        formatVibrationLevel: function (value) {
            if (!value) return "";
            
            var formattedValue = this.oNumberFormatter.format(value) + "g";
            
            return {
                value: formattedValue,
                state: this._getVibrationState(value)
            };
        },

        // Formatter for hydraulic pressure with color coding
        formatHydraulicPressure: function (value) {
            if (!value) return "";
            
            var formattedValue = this.oNumberFormatter.format(value) + " PSI";
            
            return {
                value: formattedValue,
                state: this._getHydraulicState(value)
            };
        },

        // Formatter for brake wear with color coding
        formatBrakeWear: function (value) {
            if (!value) return "";
            
            var formattedValue = this.oNumberFormatter.format(value) + "%";
            
            return {
                value: formattedValue,
                state: this._getBrakeWearState(value)
            };
        },

        // Get state for risk score
        _getRiskScoreState: function (value) {
            if (value >= 75) return "Error";
            if (value >= 50) return "Warning";
            return "Success";
        },

        // Get state for engine temperature
        _getTemperatureState: function (value) {
            if (value >= 95) return "Error";
            if (value >= 90) return "Warning";
            return "Success";
        },

        // Get state for vibration level
        _getVibrationState: function (value) {
            if (value >= 1.5) return "Error";
            if (value >= 1.2) return "Warning";
            return "Success";
        },

        // Get state for hydraulic pressure
        _getHydraulicState: function (value) {
            if (value < 1500 || value > 4000) return "Error";
            if (value < 2000 || value > 3500) return "Warning";
            return "Success";
        },

        // Get state for brake wear
        _getBrakeWearState: function (value) {
            if (value >= 85) return "Error";
            if (value >= 70) return "Warning";
            return "Success";
        },

        // Handle row selection
        onRowSelectionChange: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");
            if (oSelectedItem) {
                var oContext = oSelectedItem.getBindingContext();
                var oAircraft = oContext.getObject();
                
                // Show aircraft details or navigate to detail page
                this._showAircraftDetails(oAircraft);
            }
        },

        // Show aircraft details
        _showAircraftDetails: function (oAircraft) {
            // Implementation for showing aircraft details
            // This will be enhanced in future tasks
            MessageToast.show("Selected: " + oAircraft.tailNumber);
        },

        // Handle filter change
        onFilterChange: function (oEvent) {
            var sFilterValue = oEvent.getParameter("newValue");
            var oFilter = this.byId("analyticalTable").getBinding("items");
            
            if (sFilterValue) {
                // Apply filter
                oFilter.filter([
                    new sap.ui.model.Filter("tailNumber", sap.ui.model.FilterOperator.Contains, sFilterValue)
                ]);
            } else {
                // Clear filter
                oFilter.filter([]);
            }
        },

        // Handle sort change
        onSortChange: function (oEvent) {
            var sSortBy = oEvent.getParameter("sortBy");
            var bDescending = oEvent.getParameter("descending");
            
            var oSorter = new sap.ui.model.Sorter(sSortBy, bDescending);
            var oBinding = this.byId("analyticalTable").getBinding("items");
            oBinding.sort(oSorter);
        },

        // Refresh table data
        onRefresh: function () {
            var oTable = this.byId("analyticalTable");
            if (oTable) {
                oTable.getBinding("items").refresh();
                MessageToast.show("Table data refreshed");
            }
        },

        // Export table data
        onExport: function () {
            // Implementation for exporting table data
            // This will be enhanced in future tasks
            MessageToast.show("Export functionality will be implemented");
        },

        // Handle threshold alerts
        onThresholdAlert: function (oEvent) {
            var oAircraft = oEvent.getParameter("aircraft");
            var sSensorType = oEvent.getParameter("sensorType");
            var fValue = oEvent.getParameter("value");
            
            // Show alert dialog
            this._showAlertDialog(oAircraft, sSensorType, fValue);
        },

        // Show alert dialog
        _showAlertDialog: function (oAircraft, sSensorType, fValue) {
            // Implementation for showing alert dialog
            // This will be enhanced in Task 3.4
            MessageToast.show("Alert: " + oAircraft.tailNumber + " - " + sSensorType + " threshold exceeded");
        }
    });
}); 