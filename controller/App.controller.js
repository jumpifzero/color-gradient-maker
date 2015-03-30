(function() {
	'use strict';

	sap.ui.controller("namespace.controller.App", {

		onInit : function() {
			this.oView = this.getView();
			this.oModel = new sap.ui.model.json.JSONModel("model/data.json");
			this.oView.setModel(this.oModel);
		}

	});

})();
