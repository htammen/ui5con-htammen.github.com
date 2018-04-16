sap.ui.define([
	"de/tammenit/ui5/homepage/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"de/tammenit/ui5/homepage/model/models"
], function(BaseController, JSONModel, Models) {
	"use strict";

	return BaseController.extend("de.tammenit.ui5.homepage.controller.PDF", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf de.tammenit.ui5.homepage.view.Aboutme
		 */
		onInit: function() {
			this.getView().bindElement("/Profiles/0");

			var pdfModel = new JSONModel();
			var sModelPath = jQuery.sap.getModulePath(this._getComponentName(), "/model/pdfs.json");
			pdfModel.loadData(sModelPath);
			// pdfModel.loadData('./webapp/model/pdfs.json');
			this.getView().setModel(pdfModel, "pdfs");
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf de.tammenit.ui5.homepage.view.Aboutme
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf de.tammenit.ui5.homepage.view.Aboutme
		 */
		onAfterRendering: function() {
			var title = this.getModel("i18n").getProperty("view.profile.pdfs.header");
			this.setModel(Models.createHeaderFragmentController(title), "headerModel");
		}
	});

});