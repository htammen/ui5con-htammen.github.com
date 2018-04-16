sap.ui.define([
		"de/tammenit/ui5/homepage/controller/BaseController",
		"sap/ui/core/format/DateFormat"
	], function (Controller, DateFormat) {
		"use strict";

		return Controller.extend("de.tammenit.ui5.homepage.controller.SharedBlocks.BaseBlockController", {
			formatLabel: function(rating) {
				var retValue = sap.m.LabelDesign.Standard;
				var model = this.getModel("model");
				var type = model.getProperty(this.getView().getBindingContext().getPath() + "/Type");
				if(type !== undefined && type === 'emphasize') {
					if(rating === 1) {
						retValue = sap.m.LabelDesign.Bold;
					}
				}
				return retValue;
			},
			
			/**
			 * formats the given birhtday (e.g. 1964-04-21) so that it returns only the year of birth
			 */
			formatBirthdayYearOfBirth: function(birthday) {
				var d = Date.parse(birthday);
				var date = new Date(d);
				var df = DateFormat.getDateInstance({pattern: 'y'});
				return df.format(date);
			},
			
			formatBirthdayAge: function(birthday) {
				var d = Date.parse(birthday);
				var date = new Date(d);
				var today = new Date();
				var utc1 = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
				var utc2 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
				var _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 365;
				return Math.floor((utc2 - utc1) / _MS_PER_YEAR);
			},

			isLink: function (link) {
				if(link) {
					return true;
				} else {
					return false;
				}
			},

			isText: function (link) {
				return !this.isLink(link);
			}


		});
	}
);