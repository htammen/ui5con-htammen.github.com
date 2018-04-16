sap.ui.define([
		"sap/uxap/BlockBase",
		"sap/ui/model/json/JSONModel"
	], function (BlockBase, JSONModel) {
	"use strict";

	var BlockLanguages = BlockBase.extend("de.tammenit.ui5.homepage.view.SharedBlocks.languages.BlockLanguages", {
		metadata: {}
		
//		init: function() {
			// var model = new JSONModel({
			// 	"Languages": [
			// 		{
			// 			"Name": "german",
			// 			"Rating": 5
			// 		},
			// 		{
			// 			"Name": "english",
			// 			"Rating": 4
			// 		}
			// 	]
			// });
			// this.setModel("lang", model);
//		}
	});
	return BlockLanguages;
}, true);