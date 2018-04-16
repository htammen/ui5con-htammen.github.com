sap.ui.define([
	"de/tammenit/ui5/homepage/controller/SharedBlocks/BaseBlockController.controller"
], function(BaseController) {
	"use strict";

	return BaseController.extend("de.tammenit.ui5.homepage.controller.SharedBlocks.trainings.Training", {
		
		formatDate: function(dateStr) {
			var d = Date.parse(dateStr);
			var date = new Date(d);
			var df = sap.ui.core.format.DateFormat.getDateInstance({pattern: 'MM / yyyy'});
			return df.format(date);
		}
	});

});