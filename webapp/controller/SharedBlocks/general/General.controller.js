sap.ui.define([
	"de/tammenit/ui5/homepage/controller/SharedBlocks/BaseBlockController.controller"
], function(BaseController) {
	"use strict";

	return BaseController.extend("de.tammenit.ui5.homepage.controller.SharedBlocks.general.General", {
		onInit: function () {
			// call the base controllers onInit function
			if(BaseController.prototype.onInit) {
				BaseController.prototype.onInit.apply(this, arguments);
			}
		}

	});

});