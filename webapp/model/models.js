sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	var headerModel;

	return {

		createMainModel: function () {
			var sModelPath = jQuery.sap.getModulePath("de.tammenit.ui5.homepage.model", "/profile.json");
			// var model = new sap.ui.model.json.JSONModel(sModelPath);
			var model = new sap.ui.model.json.JSONModel();
			model.loadData(sModelPath);
			// model.loadData('./webapp/model/profile.json');
			return model;
		},

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		/**
		 * This function creates, resp. fills, the model for the ObjectHeader fragment. If the model does not already exist
		 * it is created. Otherwise the title property is set according to the parameter
		 * @param title, the new title of the model
		 * @returns {*}
		 */
		createHeaderFragmentController: function(title) {
			if(!headerModel) {
				headerModel = new JSONModel();
				headerModel.setDefaultBindingMode("OneWay");
			}
			headerModel.setProperty("/title", title);
			return headerModel;
		}

	};

});