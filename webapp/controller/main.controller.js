sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";
	
	var oModel = new JSONModel({message:"Test launched!"});
	return Controller.extend("wizard-poc.controller.main", {
		oWizard: undefined,
		onInit: function () {
			this.getView().setModel(oModel, "debug");
			this._wizard = this.getView().byId("_id_wizard");
			this.getView().setModel(new JSONModel({gender: "F"}), "Identity");
			this.getView().setModel(new JSONModel(), "Contact");
			this.getView().setModel(new JSONModel(), "TermAndCondition");
		},
		/**
		 * It is fired only once when it before enter to the step
		 * It won't be fired if the user click back to the previous step
		 * Wizard.getCurrentStep returns the previous step id instead of the entering step
		 * Wizard.getProgress show the entering progress in integer which is > 1
		*/
		onStep: function () {
			
			var oData = oModel.getData();
			oData.message = "onStep("+this._wizard.getProgress()+") \t";
			oData.message += " Move from current stepid:("+this._wizard.getCurrentStep()+")";
			// oProgressStep is WizardStep
			var oProgressStep = this._wizard.getProgressStep();
			oData.message += " Entering: " + oProgressStep.getTitle();
			oModel.setData(oData);
		},
		onComplete: function () {
			console.log(
				this.getView().getModel("Identity").getData(),
				this.getView().getModel("Contact").getData(),
				this.getView().getModel("TermAndCondition").getData()
			);
			
		},
		onCompleteStep1: function () {
			var oData = oModel.getData();
			oData.message = "onCompleteStep1";
			oModel.setData(oData);
		},
		/**
		 * Step 2 active event.
		 * It is fired before wizard stepActive
		*/
		onStep2Activate: function () {
			// Prepare data for the coming step
			var oModel = this.getView().getModel("Contact");
			var oData = oModel.getData();
			if (!oData.state) {
				oData.state = "J";
			}
			oModel.setData(oData);
			
			// var oData = oModel.getData();
			// oData.message = "onStep2Activate";
			// oModel.setData(oData);
		},
		/**
		 * Step 3 active event.
		 * It is fired before wizard stepActive
		*/
		onStep3Activate: function () {
			
			var oData = oModel.getData();
			oData.message = "onStep3Activate";
			oModel.setData(oData);
		}
	});
});