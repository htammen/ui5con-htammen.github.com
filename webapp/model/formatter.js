sap.ui.define([], function () {
	"use strict";
	return {
		persContentFormatter: function (sName, sAvailability, sZipcode, sCity, sPhone, sSlogan) {
			// grunt task openui5-preload does not support let and template strings
			var oResBundle = this.getModel("i18n").getResourceBundle();
			var str;
			// try {
			// 	str = `${sName}, ${sPhone} ` +
			// 		`\n${oResBundle.getText('view.home.slider1.slide11.availability')}: ${sAvailability}`
			// } catch (err) {
				// for old browser that doesn't support string templates
				str = oResBundle.getText('view.home.slider1.slide11.phone') + ": " + sPhone + "\n" 
						+ oResBundle.getText('view.home.slider1.slide11.availability') + ": " + sAvailability;
			// }
			return str;
		}
	};
});