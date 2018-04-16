sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/core/routing/History"
	], function (Controller, History) {
		"use strict";

		return Controller.extend("de.tammenit.ui5.homepage.controller.BaseController", {
			/**
			 * Convenience method for accessing the router.
			 * @public
			 * @returns {sap.ui.core.routing.Router} the router for this component
			 */
			getRouter : function () {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},

			/**
			 * Convenience method for getting the view model by name.
			 * @public
			 * @param {string} [sName] the model name
			 * @returns {sap.ui.model.Model} the model instance
			 */
			getModel : function (sName) {
				return this.getView().getModel(sName);
			},

			/**
			 * Convenience method for setting the view model.
			 * @public
			 * @param {sap.ui.model.Model} oModel the model instance
			 * @param {string} sName the model name
			 * @returns {sap.ui.mvc.View} the view instance
			 */
			setModel : function (oModel, sName) {
				return this.getView().setModel(oModel, sName);
			},

			/**
			 * Getter for the resource bundle.
			 * @public
			 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
			 */
			getResourceBundle : function () {
				return this.getOwnerComponent().getModel("i18n").getResourceBundle();
			},
			
			/**
			 * Event handler  for navigating back.
			 * It there is a history entry or an previous app-to-app navigation we go one step back in the browser history
			 * If not, it will replace the current entry of the browser history with the worklist route.
			 * @public
			 */
			onNavBack : function() {
				var sPreviousHash = History.getInstance().getPreviousHash();

				if (sPreviousHash !== undefined) {
					history.go(-1);
				} else {
					this.getRouter().navTo("home", {}, true);
				}
			},
			
			/**
			 * This is a formatter for all language aware fields of the profile
			 * If a file is language aware it can define its text in the following way:
			 * "Date": {"en": "Birthday", "de": "Geburtstag"}
			 * If it is not language aware the field is defined as follows:
			 * "Date": "Birthday"
			 * The function has a fallback logic so that it finds the best translation possible.
			 */
			getCurrentLangValue: function(obj) {
				if(typeof obj === "object") {
					var config = sap.ui.getCore().getConfiguration();
					var sCurrentLanguage = config.getLanguage();
					var retValue = obj[sCurrentLanguage];
					if(retValue === undefined) {
						// maybe sCurrentLanguage is something like "de-DE" and profile defines only text for "de"
						sCurrentLanguage = config.getLocale().getLanguage(); // get the language "de" from locale
						retValue = obj[sCurrentLanguage];
						if(retValue === undefined) {
							// fallback to an english text
							retValue = obj.en;
							if(retValue === undefined) {
								// fallback to the first value 
								if(Object.keys(obj).length > 0) {
									sCurrentLanguage = Object.keys(obj)[0];
									retValue = obj[sCurrentLanguage];
								}
							}
						}
					}
					return retValue;
				} else {
					return obj;
				}
			},

			formatEmailLink: function (email) {
				var subject = "Contact from your github homepage";
				var body = "Hi,\nI saw your github profile and would like to contact you regarding ...\n\nBest regards\n";
				return sap.m.URLHelper.normalizeEmail(email, subject, body);
			},

			getUrl: function (url) {
				if(url && url.match(/^https?:\/\//)) {
					return url;
				} else
				{
					var sModulePath = jQuery.sap.getModulePath(this._getComponentName(), "");
					if (sModulePath !== "") sModulePath += "/";

					return sModulePath + url;
				}
			},

			_getComponentName: function () {
				if(!this.getOwnerComponent()) {
					// construct the component name from classname. This is almost correct in every case
					// at least in this application
					var className = this.getMetadata().getName();
					var idx = className.indexOf('.controller');
					return className.slice(0, idx);
				} else {
					return this.getOwnerComponent().getMetadata().getComponentName();
				}
			}

		});

	}
);