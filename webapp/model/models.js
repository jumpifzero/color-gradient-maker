sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createSimpleModel: function(){
			var oData = {city: 'Lisbon'};
			var oModel = new JSONModel("model/data.json");
			//oModel.setData(oData);
			return oModel;
		}

	};

});