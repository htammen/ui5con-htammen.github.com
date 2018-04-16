sap.ui.define([
		"sap/uxap/BlockBase",
		"sap/m/LabelDesign"
	], function (BlockBase, LabelDesign) {
	"use strict";

	var BlockServices = BlockBase.extend("de.tammenit.ui5.homepage.view.SharedBlocks.services.BlockServices", {
		metadata: {},
		
		serviceFormatter: function(rating) {
			return (rating === 1 ? LabelDesign.Bold : LabelDesign.Standard);
		}
	});
	return BlockServices;
}, true);