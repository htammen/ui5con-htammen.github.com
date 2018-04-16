sap.ui.define([
		"de/tammenit/ui5/homepage/controller/BaseController",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast",
		"de/tammenit/ui5/homepage/model/formatter",
	], function(BaseController, JSONModel, MessageToast, formatter) {
	"use strict";
	return BaseController.extend("de.tammenit.ui5.homepage.controller.Home", {
		
		formatter: formatter,
		
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf de.tammenit.ui5.homepage.view.Aboutme
		 */
		onInit: function() {
			var oViewModel = new JSONModel({
				busy : false,
				delay : 0,
				qrCode: window.location.href
			});
			this.setModel(oViewModel, "viewModel");
			
			var pdfModel = new JSONModel();
			pdfModel.loadData(jQuery.sap.getModulePath("de.tammenit.ui5.homepage.model", "/pdfs.json"));
			this.getView().setModel(pdfModel, "pdfs");

			this.getView().bindElement("/Profiles/0");
			
			var oRouter = this.getRouter();
			oRouter.getRoute("home").attachPatternMatched(function() {
				this.getModel("viewModel").setProperty("/busy", false);
			}, this);
			
		},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf de.tammenit.ui5.homepage.view.Aboutme
		 */
		onAfterRendering: function() {
		},
		
		/**
		 * Navigates to the aboutme route where the profile is displayed
		 */
		showAboutMe: function() {
			this.getModel("viewModel").setProperty("/busy", true);
			this.getRouter().navTo("aboutme");
		},
		
		/**
		 * Navigates to the projects route where the projects are displayed
		 */
		showProjects: function() {
			this.getModel("viewModel").setProperty("/busy", true);
			this.getRouter().navTo("projects");
		},
		
		/**
		 * Navigates to the pdf download route target to enable the user to download some PDF versions of my profile
		 */
		showPDFDownload: function() {
			this.getModel("viewModel").setProperty("/busy", true);
			this.getRouter().navTo("pdf");
		},

		/**
		 * Navigates to the print route where the profile can be printed resp. a PDF can be created
		 */
		showPrintView: function () {
			this.getModel("viewModel").setProperty("/busy", true);
			this.getRouter().navTo("print");
		},
	
		comingNext: function() {
			MessageToast.show("Coming next");
		},

		/* =========== QR Code Dialog ================================ */
		onQRCode: function(oEvent) {
			this._getDialog();
			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
				this._oDialog.openBy(oButton);
			});

			//this._getDialog().open();
		},

		_getDialog: function() {
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("de.tammenit.ui5.homepage.view.fragments.QRCodeDialog", this);
				this.getView().addDependent(this._oDialog);
			}
			return this._oDialog;
		},

		onDialogClose: function() {
			this._getDialog().close();
		},

	});
});