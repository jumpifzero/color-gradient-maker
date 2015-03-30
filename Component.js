sap.ui.core.UIComponent.extend("namespace.Component", {
	metadata: {
		name : "UI5 Starter App",
		version : "1.0.0",
		includes : ["css/styles.css"],
		dependencies : {
			libs : ["sap.m"]
		},
		rootView : "namespace.view.App"
	}
});
