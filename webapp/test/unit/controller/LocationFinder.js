/*global QUnit*/

sap.ui.require([
		"wizard-poc/controller/LocationFinder.controller"
	], function (LocationFinder) {

	QUnit.module("Location Finder");
	
	QUnit.test("LocationFinder has to be function", function () {
		assert.equal(typeof LocationFinder, "function", "LocationFinder has to be function");
	});
	
	QUnit.test("LocationFinder can be instant", function () {
		var oCtrl = new LocationFinder({});
		assert.notEqual(oCtrl, undefined, "LocationFinder instance can be undefined");
		assert.notEqual(oCtrl, null, "LocationFinder instance can be null");
		assert.notOk(oCtrl.getView(), "The view is not defined");
		// var oSearchModel = oCtrl.getView().getModel("searcher");
		// assert.notOk(oSearchModel, "Search is not defined!");
		oCtrl.destroy();
	});
	
	var mockControl = function (oCtrl) {
		oCtrl.oTestModel = {
			oData: {},
			getData: function () {
				return oData;
			},
			setData: function (oData) {
				this.oData = oData;
			}
		};
		oCtrl.getView = function () {
			return {
				getModel: function () {
					return oCtrl.oTestModel;
				},
				setModel: function (oModel) {
					oCtrl.oTestModel = oModel;
				}
			};
		};
	};
	
	QUnit.test("LocationFinder can onInit", function () {
		var oCtrl = new LocationFinder({});
		mockControl(oCtrl);
		//oCtrl.placeAt("qunit-fixture");
		assert.ok(oCtrl.getView(), "The view is not being mock!");
		oCtrl.onInit();
		var oModel = oCtrl.getView().getModel();
		assert.ok(oModel);
		var oData = oModel.getData();
		assert.ok(oData);
		assert.ok(oData.location);
		assert.equal(oData.location.visible,false,"Search result must not be visible by default");
		assert.equal(oData.searchKey, "", "It must has no search key by default");
		assert.ok(oData.matchList);
		assert.ok(oData.matchList instanceof Array, "Match list must be an array");
		oCtrl.destroy();
	});
});