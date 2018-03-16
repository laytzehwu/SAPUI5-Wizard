sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("wizard-poc.controller.LocationFinder", {
		appid: "6cdea36f4d3f8b2408dd611232fa114f",
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf wizard-poc.view.LocationFinder
		 */
		onInit: function() {
			this.getView().setModel(new JSONModel({
				searchKey: "",
				location: {
					visible: false
				},
				matchList:[]
			}), "searcher");
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf wizard-poc.view.LocationFinder
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf wizard-poc.view.LocationFinder
		 */
		//	onAfterRendering: function() {
		//
		//	},
		/**
		 * Set location search result
		 * @param - Object - Location search result
		*/
		setLocationSearchResult: function (data) {
			var oModel = this.getView().getModel("searcher");
			var oData = oModel.getData();
			oData.location.visible = data.hasOwnProperty("name");
			if (oData.location.visible) {
				oData.location.name = data.name;
				oData.location.country = data.sys.country;
				oData.location.coord = data.coord;
			}
			oModel.setData(oData);
		},
		/**
		 * Event of click the search button
		*/
		onSearch: function () {
			var oData = this.getView().getModel("searcher").getData();
			var searchKey = oData.searchKey || "";
			var sURL = "/api/open-weather-api/location?appid=" + this.appid;
			sURL += "&q=" + searchKey;
			var q = new JSONModel(sURL);
			var me = this;
			q.attachRequestCompleted(function (data) {
				me.setLocationSearchResult(q.getData());
			});
			
		},
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf wizard-poc.view.LocationFinder
		 */
			onExit: function() {
				
			}

	});

});