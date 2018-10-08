sap.ui.define([
            'jquery.sap.global',
            'sap/ui/core/mvc/Controller',
            'sap/ui/model/json/JSONModel',
            'sap/m/MessageToast'            
], function(jQuery, Controller, JSONModel, MessageToast) {
      "use strict";
      var deleteData=[];
      var eid,pin;
      var iconData;
      var PageController = Controller.extend("workflow.controller.dashboard", {

            onInit : function (evt) {
                  
                  this._refresh();
            	
            },            
            
            
            //-----------------------------------------------------------------------------
            
            //Action List Functionality
            
            _refresh : function(evt) {
            	try {
	            	eid=parseInt(sap.ui.getCore().getModel("GlobalModel").oData.eid);
	            	if(eid == 0) {
	            		MessageToast.show("Logged in as Administrator!", {
	    	        		duration : 5000,
	    	        		closeOnBrowserNavigation : false
	    				});
		            	var oModel = new JSONModel("./model/adminDashboard.json");
		                this.getView().setModel(oModel);
	            	}
	            	else if(eid <= 50) {
	            		MessageToast.show("Logged in as Manager!", {
	    	        		duration : 5000,
	    	        		closeOnBrowserNavigation : false
	    				});
	            		var oModel = new JSONModel("./model/managerDashboard.json");
	                    this.getView().setModel(oModel);
	            	}
	            	else {
	            		MessageToast.show("Logged in as Client!", {
	    	        		duration : 5000,
	    	        		closeOnBrowserNavigation : false
	    				});
	            		var oModel = new JSONModel("./model/genericDashboard.json");
	                    this.getView().setModel(oModel);
	            	}
            	}
            	catch(err) {
            		MessageToast.show("Invalid Operation Performed! Session will close automatically.", {
    	        		duration : 6000,
    	        		closeOnBrowserNavigation : false,
    	        		at : "center center"
    				});
            		setTimeout(function () {
            			window.close();
            		}, 6000);
            	}
            	
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
            
            //Action List ends here
            
            //---------------------------------------------------------------------------------------
            
            //Add User Dialog
            
            _getAddUserDialog : function () {
                if (!this._oDialog1) {
                   this._oDialog1 = sap.ui.xmlfragment("workflow.view.AddUser", this);
                   this.getView().addDependent(this._oDialog1);
                }
                return this._oDialog1;
             },
             
             onOpenAddUserDialog : function () {
            	 this._getAddUserDialog().close();
                 this._getAddUserDialog().open();
             },
             
             onCloseAddUserDialog : function () {
                 this._getAddUserDialog().close();
              },
            
             onAddUserSubmit : function () {
            	 var data = {};
            	 
            	 data["username"] =sap.ui.getCore().byId("username").getValue();
            	 data["password"]=sap.ui.getCore().byId("password").getValue();
            	 var confirm = sap.ui.getCore().byId("confirm").getValue();
            	 data["eid"] = sap.ui.getCore().byId("eid").getValue();
            	 data["pin"]=pin;
            	 if(confirm != data["password"]){
            		 MessageToast.show("User password does not match!", {
 		        		duration : 5000,
 		        		closeOnBrowserNavigation : false
 					});
            	 }
            	 else{
            		var canSend=true;
            		for(var x in data){
            			if(data[x] === "" || data[x] === null)
            				canSend=false;
            		}
            		if(canSend){
		            	var xhr = new XMLHttpRequest();
						var url = "./webapi/user/submit";
						xhr.open("POST",url,false);
						xhr.setRequestHeader("Content-Type", "application/json");
						xhr.send(JSON.stringify(data));
						if(xhr.responseText == "success"){
							MessageToast.show("User Successfully Created!", {
				        		duration : 5000,
				        		closeOnBrowserNavigation : false
							});
							this._getAddUserDialog().close();
						}
						else{
							MessageToast.show("Failed to create user!", {
				        		duration : 5000,
				        		closeOnBrowserNavigation : false
							});
						}
            		}
            		else{
						MessageToast.show("Fields Cannot be left blank!", {
			        		duration : 5000,
			        		closeOnBrowserNavigation : false
						});
					}
            	}
             },
             
             //Add User Dialog Ends Here
             
             
            //---------------------------------------------------------------
             
             
            //Delete User Dialog Begins Here
             
            _getDeleteUserDialog : function () {
            	
            	var oModel = new JSONModel ("./webapi/user/fetchAll");
            	this.getView().setModel(oModel,"delete");
            	if(!this._oDialog2) {
            		this._oDialog2 = sap.ui.xmlfragment("workflow.view.DeleteUser", this);
            		this.getView().addDependent(this._oDialog2);
            	}
            	return this._oDialog2;
            },
            
            onOpenDeleteUserDialog : function () {
            	this._getDeleteUserDialog().close();
            	this._getDeleteUserDialog().open();
            },
            
            onCloseDeleteUserDialog : function (oEvent) {
            	this._getDeleteUserDialog().close();
            },
            
            onDeleteSelectionFinish : function(oEvent) {
            	var selectedItems = oEvent.getParameter("selectedItems");
            	for(var i =0; i< selectedItems.length; i++) {
            		deleteData.push({"username" : selectedItems[i].getText()});
            	}
            },
            
            onDeleteUserSubmit : function (oEvent) {
            	var xhr = new XMLHttpRequest();
            	var url = "./webapi/user";
            	
            	if(deleteData.length > 0){
					xhr.open("DELETE",url,false);
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.send(JSON.stringify(deleteData));
					if(xhr.responseText == "success"){
						MessageToast.show("Successfully Deleted Selected Users!", {
			        		duration : 5000,
			        		closeOnBrowserNavigation : false
						});
						this._getDeleteUserDialog().close();
					}
					else{
						MessageToast.show("Failed to delete one or more users!", {
			        		duration : 5000,
			        		closeOnBrowserNavigation : false
						});
					}
            	}
            	else{
					MessageToast.show("Field cannot be left blank!", {
		        		duration : 5000,
		        		closeOnBrowserNavigation : false
					});
				}
            	
            },
             
            //Delete User Dialog Ends Here
            
            //--------------------------------------------------------------------------------
            
            //Add Department Dialog
             
            _getAddDeptDialog : function () {
            	if(!this._oDialog3) {
            		var oModel = new JSONModel ("./webapi/icon");
            		this.getView().setModel(oModel,"icons");
            		this._oDialog3 = sap.ui.xmlfragment("workflow.view.AddDept", this);
            		this.getView().addDependent(this._oDialog3);
            	}
            	return this._oDialog3;
            },
            
            onOpenAddDeptDialog : function () {
            	this._getAddDeptDialog().close();
            	this._getAddDeptDialog().open();
            },
            
            onCloseAddDeptDialog : function (oEvent) {
            	this._getAddDeptDialog().close();
            },
            
            onIconSelectionChange : function (oEvent) {
            	iconData = oEvent.getParameters("selectedItem").selectedItem.getText();
            	
            },
            
            
            onAddDeptSubmit : function () {
            	var data={};
            	data["icon"]=iconData;
            	var xhr = new XMLHttpRequest();
            	var url = "./webapi/department";
            	xhr.open("GET",url,false);
            	xhr.send();
            	data["id_title"]="tile"+(parseInt(xhr.responseText)+1);
            	data["infoState"]="Success";
            	data["title"]=sap.ui.getCore().byId("deptName").getValue();
            	var canSend=true;
            	for(var x in data){
            		if(data[x] === "" || data[x] === null){
            			canSend=false;
            		}
            	}
            	if(canSend){
					xhr.open("POST",url,false);
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.send(JSON.stringify(data));
					if(xhr.responseText == "success"){
						MessageToast.show("Department successfully created!", {
			        		duration : 5000,
			        		closeOnBrowserNavigation : false
						});
						this._getAddDeptDialog().close();
					}
					else{
						MessageToast.show("Failed to create department!", {
			        		duration : 5000,
			        		closeOnBrowserNavigation : false
						});
					}
            	}
            	else {
            		MessageToast.show("Fields cannot be left blank!", {
		        		duration : 5000,
		        		closeOnBrowserNavigation : false
					});
            	}
            },
            
            //Add Department Ends Here
            
            //-----------------------------------------------------------------------
            
            //Add Icon Begins here
            
            _getAddIconDialog : function () {
                if (!this._oDialog4) {
                   this._oDialog4 = sap.ui.xmlfragment("workflow.view.AddIcon", this);
                   this.getView().addDependent(this._oDialog4);
                }
                return this._oDialog4;
             },
             
             onOpenAddIconDialog : function () {
                 this._getAddIconDialog().close();
                 this._getAddIconDialog().open();
             },
             
             onCloseAddIconDialog : function () {
                 this._getAddIconDialog().close();
              },
            
             onAddIconSubmit : function () {
            	var data = {};
            	data["iconName"] =sap.ui.getCore().byId("iconname").getValue();
            	var canSend=true;
            	if(data["iconName"] === "" || data["iconName"] === null){
            		canSend=false;
            	}
            	if(canSend){
	            	var xhr = new XMLHttpRequest();
					var url = "./webapi/icon";
					xhr.open("POST",url,false);
					xhr.setRequestHeader("Content-Type", "application/json");
					xhr.send(JSON.stringify(data));
					if(xhr.responseText == "success"){
						MessageToast.show("Icon Successfully Created!", {
			        		duration : 5000,
			        		closeOnBrowserNavigation : false
						});
						this._getAddIconDialog().close();
					}
					else{
						MessageToast.show("Failed to add icon!", {
			        		duration : 5000,
			        		closeOnBrowserNavigation : false
						});
					}
            	}
            	else{
					MessageToast.show("Field cannot be left blank!", {
		        		duration : 5000,
		        		closeOnBrowserNavigation : false
					});
				}
             },
             
            //Add Icon Ends Here
             
            //-------------------------------------------------
             
            onPressTile : function(evt){
            var property =evt.getSource().getBindingContext().getProperty("id-title");
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            if(property=="tile1"){
			oRouter.navTo("patientManagement");
            }
            if(property=="tile2"){
            oRouter.navTo("bulletin");
            }
            if(property=="tile3"){
                oRouter.navTo("meeting");
                }
            if(property=="tile4"){
                oRouter.navTo("textManagement");
                }
            if(property=="tile5"){
                oRouter.navTo("department");
                }
            if(property == "tile6"){
            	this.onOpenAddUserDialog();
            	}
            if(property == "tile7"){
            	this.onOpenDeleteUserDialog();
            	}
            if(property == "tile8") {
            	this.onOpenAddDeptDialog();
            	}
            if(property == "tile9") {
            	this.onOpenAddIconDialog();
            }
            },
            
            //-----------------------------------------------------------------
            
            fnClean : function (){
            	sap.ui.getCore().byId("icon1").setPressed(false);
            	sap.ui.getCore().byId("icon2").setPressed(false);
            	sap.ui.getCore().byId("icon3").setPressed(false);
            	sap.ui.getCore().byId("icon4").setPressed(false);
            	sap.ui.getCore().byId("icon5").setPressed(false);
            	sap.ui.getCore().byId("icon6").setPressed(false);
            	sap.ui.getCore().byId("icon7").setPressed(false);
            	sap.ui.getCore().byId("icon8").setPressed(false);
            	sap.ui.getCore().byId("icon9").setPressed(false);
            },
            
            fna : function (oEvt){
            	pin=1;
            	this.fnClean();
            	sap.ui.getCore().byId("icon"+pin).setPressed(true);
            },
            fnb : function (oEvt){
            	pin=2;
            	this.fnClean();
            	sap.ui.getCore().byId("icon"+pin).setPressed(true);
            },
            fnc : function (oEvt){
            	pin=3;
            	this.fnClean();
            	sap.ui.getCore().byId("icon"+pin).setPressed(true);
            },
            fnd : function (oEvt){
            	pin=4;
            	this.fnClean();
            	sap.ui.getCore().byId("icon"+pin).setPressed(true);
            },
            fne : function (oEvt){
            	pin=5;
            	this.fnClean();
            	sap.ui.getCore().byId("icon"+pin).setPressed(true);
            },
            fnf : function (oEvt){
            	pin=6;
            	this.fnClean();
            	sap.ui.getCore().byId("icon"+pin).setPressed(true);
            },
            fng : function (oEvt){
            	pin=7;
            	this.fnClean();
            	sap.ui.getCore().byId("icon"+pin).setPressed(true);
            },
            fnh : function (oEvt){
            	pin=8;
            	this.fnClean();
            	sap.ui.getCore().byId("icon"+pin).setPressed(true);
            },
            fni : function (oEvt){
            	pin=9;
            	this.fnClean();
            	sap.ui.getCore().byId("icon"+pin).setPressed(true);
            }
            
      });

      return PageController;

});