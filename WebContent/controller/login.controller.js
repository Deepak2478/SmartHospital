sap.ui.define([
            'jquery.sap.global',
            'sap/ui/core/mvc/Controller',
            'sap/ui/model/json/JSONModel',
            'sap/m/MessageToast'
      ], function(jQuery, Controller, JSONModel, MessageToast) {
      "use strict";
      var pin;
      var PageController = Controller.extend("workflow.controller.login", {

            onInit : function (evt) {
                  
            },
            onSubmit: function (oEvent) {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var data = {};
				var oModel;
				data["username"] =this.getView().byId("Username").getValue();
				data["password"] = this.getView().byId("Passwpord").getValue();
				data["pin"]=pin;
				var canSend = true;
				for(var x in data){
					if(data[x] === "" || data[x] === null) {
						canSend = false;
					}
				}
				if(canSend){
					console.log(JSON.stringify(data));
					var xhr = new XMLHttpRequest();
					var url = "./webapi/user/login";
					xhr.open("POST",url,false);
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.send(JSON.stringify(data));
					console.log(xhr.responseText);
					if(Number.isInteger(parseInt(xhr.responseText)))
					{
						oModel = new JSONModel({eid : xhr.responseText});
						sap.ui.getCore().setModel(oModel,"GlobalModel");
						oRouter.navTo("dashboard");
					}
					else{
						MessageToast.show("Incorrect Credentials!", {
			        		duration : 5000,
			        		closeOnBrowserNavigation : false
						});
					}
				}
				else{
					MessageToast.show("Fields cannot be left blank!", {
		        		duration : 5000,
		        		closeOnBrowserNavigation : false
					});
				}
            },
            
            fnClean : function (){
            	this.getView().byId("icon1").setPressed(false);
            	this.getView().byId("icon2").setPressed(false);
            	this.getView().byId("icon3").setPressed(false);
            	this.getView().byId("icon4").setPressed(false);
            	this.getView().byId("icon5").setPressed(false);
            	this.getView().byId("icon6").setPressed(false);
            	this.getView().byId("icon7").setPressed(false);
            	this.getView().byId("icon8").setPressed(false);
            	this.getView().byId("icon9").setPressed(false);
            },
            
            fna : function (oEvt){
            	pin=1;
            	this.fnClean();
            	this.getView().byId("icon"+pin).setPressed(true);
            },
            fnb : function (oEvt){
            	pin=2;
            	this.fnClean();
            	this.getView().byId("icon"+pin).setPressed(true);
            },
            fnc : function (oEvt){
            	pin=3;
            	this.fnClean();
            	this.getView().byId("icon"+pin).setPressed(true);
            },
            fnd : function (oEvt){
            	pin=4;
            	this.fnClean();
            	this.getView().byId("icon"+pin).setPressed(true);
            },
            fne : function (oEvt){
            	pin=5;
            	this.fnClean();
            	this.getView().byId("icon"+pin).setPressed(true);
            },
            fnf : function (oEvt){
            	pin=6;
            	this.fnClean();
            	this.getView().byId("icon"+pin).setPressed(true);
            },
            fng : function (oEvt){
            	pin=7;
            	this.fnClean();
            	this.getView().byId("icon"+pin).setPressed(true);
            },
            fnh : function (oEvt){
            	pin=8;
            	this.fnClean();
            	this.getView().byId("icon"+pin).setPressed(true);
            },
            fni : function (oEvt){
            	pin=9;
            	this.fnClean();
            	this.getView().byId("icon"+pin).setPressed(true);
            }
            
      });
      return PageController;
});