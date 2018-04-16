sap.ui.define([
	"de/tammenit/ui5/homepage/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"de/tammenit/ui5/homepage/model/models",
	"sap/m/MessageToast"
], function(BaseController, JSONModel, Models, MessageToast) {
	"use strict";

	return BaseController.extend("de.tammenit.ui5.homepage.controller.Print", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf de.tammenit.ui5.homepage.view.Aboutme
		 */
		onInit: function() {
			this.getView().bindElement("/Profiles/0");

			var imageModel = new JSONModel({
				pdfFull: "./images/pdffull.png",
				projects: "./images/projects.png"
			});
			this.setModel(imageModel, "imgModel");

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf de.tammenit.ui5.homepage.view.Aboutme
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf de.tammenit.ui5.homepage.view.Aboutme
		 */
		onAfterRendering: function() {
			var title = this.getModel("i18n").getProperty("view.profile.print.header");
			this.setModel(Models.createHeaderFragmentController(title), "headerModel");
		},

		onPressFullPDF: function () {
			// open the PDF in a new window
			new Promise( function (resolve, reject) {
				var sImagePath = jQuery.sap.getModulePath(this._getComponentName(), "/images/logo_tammenit.png");
				this.toBase64Url(sImagePath, function (dataURL) {
					resolve(dataURL);
				})

			}.bind(this))
			.then( function (dataURL) {
				MessageToast.show("PDF opens in new window / tab");
				pdfMake.createPdf(this.createPDFDefinition(dataURL)).open()
				}.bind(this)
			)

		},

		onPressAnonymousPDF: function () {
			MessageToast.show("Coming soon");
			// // open the PDF in a new window
			// new Promise( function (resolve, reject) {
			// 	this.toBase64Url("webapp/images/logo_tammenit.png", function (dataURL) {
			// 		resolve(dataURL);
			// 	})
			//
			// }.bind(this))
			// 	.then( function (dataURL) {
			// 			MessageToast.show("PDF opens in new window / tab");
			// 			pdfMake.createPdf(this.createPDFDefinition(dataURL)).open()
			// 		}.bind(this)
			// 	)

		},
		/**
		 * converts a source image into base64 encoded image
		 * @param src URL to source image
		 * @param callback thats called when image is available
		 * @param outputFormat
		 */
		toBase64Url: function(src, callback, outputFormat) {
			var img = new Image();
			img.crossOrigin = 'Anonymous';
			img.onload = function() {
				var canvas = document.createElement('CANVAS');
				var ctx = canvas.getContext('2d');
				var dataURL;
				canvas.height = this.height;
				canvas.width = this.width;
				ctx.drawImage(this, 0, 0);
				dataURL = canvas.toDataURL(outputFormat);
				callback(dataURL);
			};
			img.src = src;
			if (img.complete || img.complete === undefined) {
				img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
				img.src = src;
			}
		},

		/**
		 * This function creates the pdfmake definition. It can be best maintained by copying the block between "pdfmake begin" and "pdfmake end" into the
		 * pdfmake playground (http://pdfmake.org/playground.html). After pdf has been edited in pdfmake playground copy the code back to here.
		 * To have some sample data in pdfmake playground you can copy the sample data section from ../../pdfMake-script.js
		 * @returns {{pageSize: string, pageMargins: *[], header: {table: {headerRows: number, widths: *[], body: *[]}, style: string}, footer: {}, content: *[], styles: {header: {margin: number}, headermiddle: {alignment: string}, headerleft: {fontSize: number}, columnLeft: {fillColor: string}, header1: {alignment: string, fontSize: number, bold: string}}}}
		 */
		createPDFDefinition: function(imgURL) {
			var ctx = this.getView().getBindingContext();
			var i18n = this.getModel("i18n");
			var profile = this.getModel().getProperty(ctx.getPath());
//######### pdfmake begin #############
			var languages = function() {
				var flatLanguages = profile.Languages.map(function(obj) {
					return obj.Name;
				});
				return flatLanguages.join(', ');
			};

			var createListDigital = function() {
				var retValue = {};
				var mapArr = profile.Priorities.map(function(obj) {
					var ret = {text: obj.Name + ', '};
					if(obj.Rating === 1) {
						ret.style = {bold: true}
					} else {
						ret.style = {color: '#A1A1A1'}
					}
					return ret
				})
				// delete the ',' from the last array element
				var lastElem = mapArr[mapArr.length-1];
				lastElem.text = lastElem.text.substring(0, lastElem.text.length-2);

				return mapArr; // {text: mapArr};
			};

			var createListAnalog = function(list) {
				var retValue = {};
				var mapArr = list.map(function(obj) {
					var ret = {text: obj.Name + ', '};
					if(obj.Rating > 3) {
						ret.style = {bold: true}
					} else {
						ret.style = {color: '#A1A1A1'}
					}
					return ret
				})
				// delete the ',' from the last array element
				var lastElem = mapArr[mapArr.length-1];
				lastElem.text = lastElem.text.substring(0, lastElem.text.length-2);

				return mapArr; // {text: mapArr};
			};

			var otherGraduation = function() {
				var arr = [];
				if(profile.OtherGraduations.length > 0) {
					arr.push( { text: '', style: 'columnLeft' } );
					var arrGrad = [];
					profile.OtherGraduations.forEach(function(grad) {
						arrGrad.push({text: grad.Text});
					});
					arr.push(arrGrad);
				}
				return arr;
			};

			var formatDateToMontAndYear = function(dateStr) {
				var d = Date.parse(dateStr);
				var date = new Date(d);
				return date;
			};

			var createCertificates = function() {
				var mapArr = profile.Certificates.map(function(obj) {
					var ret =
						{
							text: [
								{text: obj.Date + ', '},
								{text: obj.Text + ', '},
								{text: obj.Rating},
							]
						};
					return ret
				})

				return mapArr; // {text: mapArr};
			};

			var createTrainings = function() {
				var mapArr = profile.Trainings.map(function(obj) {
					var ret =
						{
							text: [
								{text: obj.Date + ', '},
								{text: obj.Text + ', '},
								{text: obj.Location},
							]
						};
					return ret
				})

				return mapArr; // {text: mapArr};
			};

			var createProjects = function() {
				console.log(this)
				var mapArr = profile.Projects.map(function(obj) {
					var tmpArr = [];
					tmpArr = obj.items.map(function(project) {
						var ret = [];
						ret.push( [
							{text: this.getCurrentLangValue(project.Start) + " - " + this.getCurrentLangValue(project.End), style: 'headerProject'},
							{text: this.getCurrentLangValue(project.Duration)},
						]);
						ret.push( [
							{text: this.getCurrentLangValue(project.Branch), style: 'headerProject'},
							{text: this.getCurrentLangValue(project.Header), style: 'subHeaderProject'},
							{text: this.getCurrentLangValue(project.Longtext)},
							{text: this.getCurrentLangValue(project.Tools), style: 'projectTools'}
						]);
						return ret
					}.bind(this));
					return tmpArr;
				}.bind(this));
				var retArr = [];
				mapArr.forEach(function(obj) {
					retArr = retArr.concat(obj)
				});
				return retArr; // {text: mapArr};
			};

			var leftColumnWidth = 120;
			var marginLeft = 15;
			var marginTop = 80;
			var marginRight = 20;
			var marginBottom = 60;

			var dd = {

				pageSize: 'A4',
				// [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
				pageMargins: [ marginLeft, marginTop, marginRight, marginBottom ],
				header: {
					table: {
						// headers are automatically repeated if the table spans over multiple pages
						// you can declare how many rows should be treated as headers
						headerRows: 1,
						widths: [ 170, '*', 170 ],

						body: [
							[
								{
									text: [
										profile.Name + '\n',
										profile.Addresses.HomeAddress.Street + ' ' + profile.Addresses.HomeAddress.Housenum + '\n',
										profile.Addresses.HomeAddress.Zipcode + ' ' + profile.Addresses.HomeAddress.City + '\n\n',
										'Email: ' + profile.Email.Work + '\n',
										'Tel: ' + profile.Phone.Mobile
									],
									style: 'headerleft'
								},
								{
									text: i18n.getProperty("consultant_profile"), style: 'headermiddle'
								},
								{
									image: imgURL,
									width: 150,
									style: 'headermiddle'

								}
							]
						]
					},
					style: 'header'
				},
				footer: {

				},
				content: [
					{text: 'General Data', style: 'header1'},
					{
						table: {
							widths: [ leftColumnWidth, '*' ],
							body: [
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
								[
									{ text: 'Name: ', style: 'columnLeft' },
									{ text: profile.Name }
								],
								[
									{ text: 'Year of birth: ', style: 'columnLeft' },
									{ text: profile.Birthday }
								],
								[
									{ text: 'Graduation: ', style: 'columnLeft' },
									{ text: profile.Graduation }
								],
								otherGraduation(),
								[
									{ text: 'IT Experience: ', style: 'columnLeft' },
									{ text: profile.ExperienceSince }
								],
								[
									{ text: 'Nationality: ', style: 'columnLeft' },
									{ text: profile.Nationality }
								],
								[
									{ text: 'Languages: ', style: 'columnLeft' },
									{ text: languages() }
								],
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
							]
						},
						layout: 'noBorders'
					},
					{
						table: {
							widths: [ leftColumnWidth, '*' ],
							body: [
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
								[
									{ text: 'Main Focuses: ', style: 'columnLeft' },
									{
										text: createListDigital(profile.Priorities)
									}
								],
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
							]
						},
						layout: 'noBorders'
					},
					{
						table: {
							widths: [ leftColumnWidth, '*' ],
							body: [
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
								[
									{ text: 'Branches: ', style: 'columnLeft' },
									{
										text: createListAnalog(profile.Branches)
									}
								],
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
							]
						},
						layout: 'noBorders'
					},
					{
						table: {
							widths: [ leftColumnWidth, '*' ],
							body: [
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
								[
									{ text: 'Availability: ', style: 'columnLeft' },
									{ text: profile.Availability }
								],
								[
									{ text: 'Prefered Regions: ', style: 'columnLeft' },
									{ text: profile.Regions }
								],
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
							]
						},
						layout: 'noBorders'
					},
					{
						table: {
							widths: [ leftColumnWidth, '*' ],
							body: [
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
								[
									{ text: 'Certificates: ', style: 'columnLeft' },
									createCertificates()
								],
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
							]
						},
						layout: 'noBorders'
					},
					{
						table: {
							widths: [ leftColumnWidth, '*' ],
							body: [
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
								[
									{ text: 'Trainings: ', style: 'columnLeft' },
									createTrainings()
								],
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
							]
						},
						layout: 'noBorders'
					},
					{text: 'IT Skills', style: 'header1', pageBreak: 'before'},
					{
						table: {
							pageBreak: 'after',
							widths: [ leftColumnWidth, '*' ],
							body: [
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
								[
									{ text: 'OS: ', style: 'columnLeft' },
									{ text: createListAnalog(profile.ITSkills[0].items) }
								],
								[
									{ text: 'Programming: ', style: 'columnLeft' },
									{ text: createListAnalog(profile.ITSkills[1].items) }
								],
								[
									{ text: 'Databases: ', style: 'columnLeft' },
									{ text: createListAnalog(profile.ITSkills[2].items) }
								],
								[
									{ text: 'DBAbstraction: ', style: 'columnLeft' },
									{ text: createListAnalog(profile.ITSkills[3].items) }
								],
								[
									{ text: 'SAP: ', style: 'columnLeft' },
									{ text: createListAnalog(profile.ITSkills[4].items) }
								],
								[
									{ text: 'SCM-Tools: ', style: 'columnLeft' },
									{ text: createListAnalog(profile.ITSkills[5].items) }
								],
								[
									{ text: 'Methods: ', style: 'columnLeft' },
									{ text: createListAnalog(profile.ITSkills[6].items) }
								],
								[
									{ text: '', style: 'columnLeft'},
									{ text: '', style: 'columnLeft'}
								],
							]
						},
						layout: 'noBorders'
					},
					{text: 'Projects', style: 'header1', pageBreak: 'before'},
					{
						table: {
							pageBreak: 'after',
							widths: [ leftColumnWidth, '*' ],
							body: createProjects.bind(this)()
						}
					},
				],

				styles: {
					header: {
						margin: 5
					},
					headermiddle: {
						alignment: 'center'
					},
					headerleft: {
						fontSize: 8
					},
					columnLeft: {
						fillColor: '#CDCDCD'
					},
					header1: {
						alignment: 'center',
						fontSize: 18,
						bold: 'true'
					},
					headerProject: {
						background: '#CDCDCD',
						fillColor: '#CDCDCD',
					},
					subHeaderProject: {
						background: '#EBEBEB'
					},
					projectTools: {
						background: '#EBEBEB'
					}
				}
			};

//######### pdfmake end #############
			return dd;
		}

	});
});