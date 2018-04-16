sap.ui.define(['sap/uxap/BlockBase'], function (BlockBase) {
	"use strict";

	var PersonalBlockPart2 = BlockBase.extend("de.tammenit.ui5.homepage.view.SharedBlocks.personal.PersonalBlockPart2", {
		metadata: {
			views: {
				Collapsed: {
					viewName: "de.tammenit.ui5.homepage.view.SharedBlocks.personal.PersonalBlockPart2",
					type: "XML"
				},
				Expanded: {
					viewName: "de.tammenit.ui5.homepage.view.SharedBlocks.personal.PersonalBlockPart2",
					type: "XML"
				}
			}
		}
	});

	return PersonalBlockPart2;
});