sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/ui/Device"
], function (Controller, JSONModel, MessageToast, Device) {
    "use strict";

    return Controller.extend("project1.controller.App", {

        onInit: function () {
            console.log("App controller initialized - AeroMaint Navigation Hub");
            
            // Initialize navigation model
            this._initializeNavigationModel();
            this._initializeUserSession();
            
            // Set default active section
            this._setActiveSection("dashboard");
            
            // Initialize SplitContainer
            this._initializeSplitContainer();
        },

        _initializeSplitContainer: function () {
            // Ensure SplitContainer is properly configured according to SAP UI5 best practices
            var splitContainer = this.byId("splitContainer");
            if (splitContainer) {
                // Set responsive mode for better device adaptation
                splitContainer.setMode("StretchCompressMode");
                
                // Configure master button visibility
                splitContainer.setMasterButtonText("Menu");
                splitContainer.setMasterButtonTooltip("Toggle Navigation");
                
                // Ensure proper CSS classes
                splitContainer.addStyleClass("sapUiFullHeight");
                
                // Set initial master visibility based on screen size
                var isPhone = Device.system.phone;
                if (isPhone) {
                    splitContainer.hideMaster();
                } else {
                    splitContainer.showMaster();
                }
                
                console.log("SplitContainer initialized successfully with responsive configuration");
            }
        },

        _initializeNavigationModel: function () {
            // Navigation items matching React sidebar structure
            var navigationItems = [
                { 
                    id: "dashboard", 
                    label: "Fleet Dashboard", 
                    icon: "sap-icon://flight",
                    description: "Main aircraft monitoring dashboard",
                    enabled: true,
                    badge: null
                },
                { 
                    id: "import", 
                    label: "Flight Data Import", 
                    icon: "sap-icon://upload",
                    description: "Import flight and maintenance data",
                    enabled: true,
                    badge: null
                },
                { 
                    id: "templates", 
                    label: "Maintenance Templates", 
                    icon: "sap-icon://document",
                    description: "Predefined maintenance procedures",
                    enabled: true,
                    badge: "12"
                },
                { 
                    id: "sequences", 
                    label: "Service Schedules", 
                    icon: "sap-icon://workflow-tasks",
                    description: "Automated service scheduling",
                    enabled: true,
                    badge: null
                },
                { 
                    id: "analytics", 
                    label: "Fleet Analytics", 
                    icon: "sap-icon://bar-chart",
                    description: "Advanced analytics and reporting",
                    enabled: true,
                    badge: "New"
                },
                { 
                    id: "payments", 
                    label: "Parts & Services", 
                    icon: "sap-icon://cart",
                    description: "Parts ordering and service billing",
                    enabled: true,
                    badge: null
                },
                { 
                    id: "compliance", 
                    label: "Safety Compliance", 
                    icon: "sap-icon://shield",
                    description: "Regulatory compliance monitoring",
                    enabled: true,
                    badge: "3"
                },
                { 
                    id: "settings", 
                    label: "System Settings", 
                    icon: "sap-icon://settings",
                    description: "Application configuration",
                    enabled: true,
                    badge: null
                }
            ];

            var navigationModel = new JSONModel({
                navigationItems: navigationItems,
                activeSection: "dashboard",
                userInfo: {
                    name: "Mike Thompson",
                    role: "Maintenance Chief",
                    initials: "MT",
                    lastLogin: new Date().toLocaleDateString(),
                    notifications: 7
                },
                appInfo: {
                    name: "AeroMaint",
                    description: "Aircraft Maintenance",
                    version: "2.1.0",
                    environment: "Production"
                }
            });

            this.getView().setModel(navigationModel, "navigation");
            console.log("Navigation model initialized with sections:", navigationItems.map(item => item.id));
        },

        _initializeUserSession: function () {
            // Initialize user session data
            var userSessionModel = new JSONModel({
                isAuthenticated: true,
                permissions: {
                    viewDashboard: true,
                    viewAnalytics: true,
                    viewCompliance: true,
                    manageSettings: true,
                    exportData: true,
                    importData: true
                },
                preferences: {
                    theme: "sap_horizon",
                    language: "en",
                    dateFormat: "MM/dd/yyyy",
                    timeZone: "UTC-5"
                }
            });

            this.getView().setModel(userSessionModel, "userSession");
        },

        _setActiveSection: function (sectionId) {
            var navigationModel = this.getView().getModel("navigation");
            navigationModel.setProperty("/activeSection", sectionId);
            
            console.log("Active section changed to:", sectionId);
            
            // Update page title based on active section
            this._updatePageTitle(sectionId);
        },

        _updatePageTitle: function (sectionId) {
            var navigationModel = this.getView().getModel("navigation");
            var navigationItems = navigationModel.getProperty("/navigationItems");
            var activeItem = navigationItems.find(item => item.id === sectionId);
            
            if (activeItem) {
                document.title = `AeroMaint - ${activeItem.label}`;
            }
        },

        // Navigation event handlers
        onNavigationItemPress: function (oEvent) {
            var bindingContext = oEvent.getSource().getBindingContext("navigation");
            var sectionId = bindingContext.getProperty("id");
            var enabled = bindingContext.getProperty("enabled");
            
            if (!enabled) {
                MessageToast.show("This section is currently unavailable");
                return;
            }

            console.log("Navigation requested to:", sectionId);
            this._navigateToSection(sectionId);
        },

        _navigateToSection: function (sectionId) {
            // Update active section
            this._setActiveSection(sectionId);
            
            // Handle navigation based on section
            switch (sectionId) {
                case "dashboard":
                    this._showDashboard();
                    break;
                case "analytics":
                    this._showAnalytics();
                    break;
                case "compliance":
                    this._showCompliance();
                    break;
                case "import":
                    this._showImportWizard();
                    break;
                case "templates":
                    this._showTemplateLibrary();
                    break;
                case "sequences":
                    this._showSequenceGenerator();
                    break;
                case "payments":
                    this._showPaymentPortal();
                    break;
                case "settings":
                    this._showSettings();
                    break;
                default:
                    this._showDashboard();
            }
        },

        _showDashboard: function () {
            MessageToast.show("Loading Fleet Dashboard...");
            // In a real implementation, this would navigate to the Dashboard view
            // For now, we'll simulate the navigation
            console.log("Displaying Dashboard view");
        },

        _showAnalytics: function () {
            MessageToast.show("Loading Fleet Analytics...");
            // Navigate to Analytics view
            console.log("Displaying Analytics view");
        },

        _showCompliance: function () {
            MessageToast.show("Loading Safety Compliance...");
            // Navigate to Compliance view
            console.log("Displaying Compliance view");
        },

        _showImportWizard: function () {
            MessageToast.show("Opening Flight Data Import...");
            // Navigate to Import Wizard
            console.log("Displaying Import Wizard");
        },

        _showTemplateLibrary: function () {
            MessageToast.show("Loading Maintenance Templates...");
            // Navigate to Template Library
            console.log("Displaying Template Library");
        },

        _showSequenceGenerator: function () {
            MessageToast.show("Loading Service Schedules...");
            // Navigate to Sequence Generator
            console.log("Displaying Sequence Generator");
        },

        _showPaymentPortal: function () {
            MessageToast.show("Loading Parts & Services...");
            // Navigate to Payment Portal
            console.log("Displaying Payment Portal");
        },

        _showSettings: function () {
            MessageToast.show("Loading System Settings...");
            // Navigate to Settings
            console.log("Displaying Settings");
        },

        // Quick action handlers
        onQuickRefresh: function () {
            MessageToast.show("Refreshing dashboard data...");
            // Refresh current view data
            this._refreshCurrentSection();
        },

        onQuickExport: function () {
            MessageToast.show("Preparing data export...");
            // Export current section data
            this._exportCurrentSection();
        },

        onShowNotifications: function () {
            var userInfo = this.getView().getModel("navigation").getProperty("/userInfo");
            MessageToast.show(`You have ${userInfo.notifications} new notifications`);
        },

        onUserProfilePress: function () {
            MessageToast.show("Opening user profile...");
            // Open user profile dialog
        },

        onLogout: function () {
            MessageToast.show("Logging out...");
            // Handle logout process
        },

        _refreshCurrentSection: function () {
            var activeSection = this.getView().getModel("navigation").getProperty("/activeSection");
            console.log("Refreshing section:", activeSection);
            
            // Refresh data based on active section
            switch (activeSection) {
                case "dashboard":
                    // Refresh dashboard data
                    break;
                case "analytics":
                    // Refresh analytics data
                    break;
                // Add other cases as needed
            }
        },

        _exportCurrentSection: function () {
            var activeSection = this.getView().getModel("navigation").getProperty("/activeSection");
            console.log("Exporting data for section:", activeSection);
            
            // Export data based on active section
            var exportData = this._getExportData(activeSection);
            this._downloadExport(exportData, activeSection);
        },

        _getExportData: function (sectionId) {
            // Generate export data based on section
            var timestamp = new Date().toISOString();
            return {
                section: sectionId,
                exportedAt: timestamp,
                data: `Export data for ${sectionId}`,
                format: "JSON"
            };
        },

        _downloadExport: function (data, sectionId) {
            // Simulate file download
            var filename = `aeromaint_${sectionId}_${new Date().toISOString().split('T')[0]}.json`;
            console.log("Downloading export:", filename, data);
            MessageToast.show(`Export ready: ${filename}`);
        },

        // Emergency and alert handlers
        onEmergencyAlert: function () {
            MessageToast.show("Emergency alert triggered - Opening emergency procedures");
            // Handle emergency alert
        },

        onMaintenanceAlert: function () {
            MessageToast.show("Maintenance alert - Checking urgent items");
            // Handle maintenance alert
        },

        // Search functionality
        onGlobalSearch: function (oEvent) {
            var searchQuery = oEvent.getParameter("query");
            if (searchQuery) {
                MessageToast.show(`Searching for: ${searchQuery}`);
                this._performGlobalSearch(searchQuery);
            }
        },

        _performGlobalSearch: function (query) {
            console.log("Performing global search for:", query);
            // Implement global search across all sections
            // This would search aircraft data, maintenance records, etc.
        },

        // Utility functions
        formatUserInitials: function (name) {
            if (!name) return "";
            return name.split(" ").map(n => n.charAt(0)).join("").toUpperCase();
        },

        formatDateTime: function (date) {
            if (!date) return "";
            return new Date(date).toLocaleString();
        },

        isActiveSection: function (sectionId, activeSection) {
            return sectionId === activeSection;
        },

        hasNotifications: function (count) {
            return count > 0;
        },

        // Section badge formatting
        formatSectionBadge: function (badge) {
            if (!badge) return "";
            if (!isNaN(badge)) {
                return parseInt(badge) > 99 ? "99+" : badge;
            }
            return badge;
        },

        hasBadge: function (badge) {
            return !!badge;
        },

        // Permission checking
        hasPermission: function (permission) {
            var userSession = this.getView().getModel("userSession");
            var permissions = userSession.getProperty("/permissions");
            return permissions && permissions[permission];
        },

        // Theme and preferences
        onThemeChange: function (oEvent) {
            var selectedTheme = oEvent.getParameter("selectedItem").getKey();
            MessageToast.show(`Changing theme to: ${selectedTheme}`);
            // Implement theme change
        },

        onLanguageChange: function (oEvent) {
            var selectedLanguage = oEvent.getParameter("selectedItem").getKey();
            MessageToast.show(`Changing language to: ${selectedLanguage}`);
            // Implement language change
        }
    });
}); 