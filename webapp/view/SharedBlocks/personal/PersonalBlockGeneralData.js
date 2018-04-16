sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var PersonalBlockGeneralData = BlockBase.extend("de.tammenit.ui5.homepage.view.SharedBlocks.personal.PersonalBlockGeneralData", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "de.tammenit.ui5.homepage.view.SharedBlocks.personal.PersonalBlockGeneralData",
					type: "XML"
				},
				Expanded: {
					viewName: "de.tammenit.ui5.homepage.view.SharedBlocks.personal.PersonalBlockGeneralData",
					type: "XML"
				}
			}
		}
	});

	return PersonalBlockGeneralData;
});