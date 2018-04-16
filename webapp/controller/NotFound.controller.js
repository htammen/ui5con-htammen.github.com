sap.ui.define([
		"de/tammenit/ui5/homepage/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("de.tammenit.ui5.homepage.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("home");
			}

		});

	}
);