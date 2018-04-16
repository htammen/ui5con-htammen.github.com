sap.ui.define([
	"de/tammenit/ui5/homepage/controller/SharedBlocks/BaseBlockController.controller"
], function(BaseController) {
	"use strict";

	return BaseController.extend("de.tammenit.ui5.homepage.controller.SharedBlocks.projects.Projects", {
		
		isLinkVisible: function(link) {
			if(link !== undefined) {
				return true;
			}
			return false;
		},
		
		isTextVisible: function(link) {
			if(link !== undefined) {
				return false;
			}
			return true;
		}
	});

});