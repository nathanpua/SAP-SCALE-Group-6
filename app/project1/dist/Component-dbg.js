sap.ui.define(
    ["sap/ui/core/UIComponent", "sap/ui/core/mvc/XMLView"],
    function (UIComponent, XMLView) {
        "use strict";

        return UIComponent.extend("project1.Component", {
            metadata: {
                manifest: "json",
                interfaces: ["sap.ui.core.IAsyncContentCreation"]
            },

            init: function() {
                console.log("Component initializing...");
                
                // Call the parent init method
                UIComponent.prototype.init.apply(this, arguments);

                console.log("Component initialized successfully");
            },

            createContent: function() {
                console.log("Creating component content...");
                
                // Initialize router after component creation
                var oRouter = this.getRouter();
                if (oRouter) {
                    console.log("Router found, initializing...");
                    oRouter.initialize();
                }
                
                console.log("Component content creation complete");
                
                // Return the root view
                return XMLView.create({
                    viewName: "project1.view.App",
                    id: "app"
                });
            }
        });
    }
);