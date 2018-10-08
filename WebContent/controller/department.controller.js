sap.ui.define([
            'jquery.sap.global',
            'sap/ui/core/mvc/Controller',
            'sap/ui/model/json/JSONModel',
            'sap/m/MessageToast',
            'sap/ui/core/routing/History'
      ], function(jQuery, Controller, JSONModel, MessageToast, History) {
      "use strict";

      var PageController = Controller.extend("workflow.controller.department", {

            onInit : function (evt) {
            	this._refresh();
            },
            
            onDataReceived : function(channel, event,data) {
            	console.log(JSON.stringify(data));
            },
            
            
            handleEditPress : function (evt) {
                  var oTileContainer = this.getView().byId("container");
                  var newValue = ! oTileContainer.getEditable();
                  oTileContainer.setEditable(newValue);
                  evt.getSource().setText(newValue ? "Done" : "Edit");
            },

            handleBusyPress : function (evt) {
                  var oTileContainer = this.getView().byId("container");
                  var newValue = ! oTileContainer.getBusy();
                  oTileContainer.setBusy(newValue);
                  evt.getSource().setText(newValue ? "Done" : "Busy state");
            },

            handleTileDelete : function (evt) {
                  var tile = evt.getParameter("tile");
                  evt.getSource().removeTile(tile);
            },
            
            _refresh : function() {
            	var url="./webapi/tiles";
            	var xhr=new XMLHttpRequest();
            	xhr.open("GET", url, false);
            	xhr.send();
            	var oModel = new JSONModel(JSON.parse(xhr.responseText));
            	this.getView().setModel(oModel);
            },
            
            _callForHelp : function (evt) {
            	sap.m.URLHelper.triggerTel("+91");
            },
            
            _textMessage : function(evt) {
            	sap.m.URLHelper.triggerSms("+91");
            },
            
            _feedback : function(evt) {
            	sap.m.URLHelper.triggerEmail("deep.sharma@live.in", "CIMS - Feedback");
            },
            
            _request : function(evt) {
            	sap.m.URLHelper.triggerEmail("deep.sharma@live.in", "CIMS - Request");
            },
            
            _settings : function (oEvent) {
            	var oButton = oEvent.getSource();
            	if(!this._actionSheet){
            		this._actionSheet = sap.ui.xmlfragment("workflow.view.ActionSheet", this);
            		this.getView().addDependent(this._actionSheet);
            	}
            	this._actionSheet.openBy(oButton);
            },
            
            _logout : function () {
            	window.close();
            },
            
            _back : function (oEvent) {
            	window.history.go(-1);
            },
            onPressTile : function(evt){
            }
      });

      return PageController;

});