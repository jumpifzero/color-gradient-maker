sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("namespace.controller.main", {
		onInit : function() {
			var sComponentId = sap.ui.core.Component.getOwnerIdFor(this.getView());  
			var oComp = sap.ui.component(sComponentId);  
			this.getView().setModel(oComp.getModel());
		},

		handleStepChange: function(ev){
			var oModel = this.getView().getModel();
			var oData = oModel.getProperty('/');
			var startColorCtrl = this.byId('startColor');
			var endColorCtrl = this.byId('endColor');
			var sRGB = startColorCtrl.getRGB();
			var eRGB = endColorCtrl.getRGB();
			var aColors = this.buildColorsArray(sRGB, eRGB, oData.steps);
			oModel.setProperty('/colorsText', this.renderColors(aColors));
		},
		/* Return array of n items with colors interpolated
			between oRGB1 and oRGB2. oRGB is an object with r,g,b properties
			with values between 0 and 255
		*/
		buildColorsArray: function(oRGB1, oRGB2, steps){
			var rStep = Math.floor(Math.abs(oRGB1.r - oRGB2.r) / (steps-1)),
				gStep = Math.floor(Math.abs(oRGB1.g - oRGB2.g) / (steps-1)),
				bStep = Math.floor(Math.abs(oRGB1.b - oRGB2.b) / (steps-1));
			var rSign = (oRGB1.r - oRGB2.r)<0?1:-1,
				gSign = (oRGB1.g - oRGB2.g)<0?1:-1,
				bSign = (oRGB1.b - oRGB2.b)<0?1:-1;
			var result = [];
			for(var i=0 ; i<steps-1 ; i++){
				result[i] = {
					r: oRGB1.r + i*rStep*rSign,
					g: oRGB1.g + i*gStep*gSign,
					b: oRGB1.b + i*bStep*bSign
				};
			}
			// the last one is forced to rgb2 due to roundings
			result[steps-1] = {
				r: oRGB2.r,
				g: oRGB2.g,
				b: oRGB2.b
			};
			return result;
		},
		/* Transforms array of colors into string */
		renderColors: function(aColors){
			return aColors.reduce(function(prevValue, currValue, 
											currIndex, arr){
				return prevValue + "rgb(%r,%g,%b),".replace("%r",currValue.r)
													.replace("%g",currValue.g)
													.replace("%b",currValue.b);
			}, 
			"");
		},
		/* Ensure no nulls */
		formatColor: function(c){
			if(!c) return '#FFF';
			return c;
		}
	});

});