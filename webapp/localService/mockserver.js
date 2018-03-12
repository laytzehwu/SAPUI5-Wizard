sap.ui.define([
	"sap/ui/core/util/MockServer"
], function (MockServer) {
	"use strict";
	return {
		init: function () {
			// create
			var oMockServer = new MockServer({
				//rootUri: "/open-weather-api"
				rootUri: "/"
			}); 
			var oUriParameters = jQuery.sap.getUriParameters();
			// configure
			MockServer.config({
				autoRespond: true,
				autoRespondAfter: oUriParameters.get("serverDelay") || 1000
			});
			// simulate
			var sPath = jQuery.sap.getModulePath("wizard-poc.localService");
			//oMockServer.simulate(sPath, sPath + "/mockdata/ipoh");
			//oMockServer.simulate(sPath + "/metadata.xml", sPath + "/mockdata");
			oMockServer.simulate(sPath + "/metadata.xml", {
				sMockdataBaseUrl: sPath + "/mockdata",
				bGenerateMissingMockData: true
			});
			// start
			oMockServer.start();
			jQuery.sap.log.info("Running the app with mock data");
		}
	};
});