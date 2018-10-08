sap.ui.define([
   "jquery.sap.global",
   "sap/ui/core/Fragment",
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast"
   ], function(jQuery, Fragment, Controller, JSONModel, MessageToast){
	"use strict"
	var recipient,eid;
	return Controller.extend("workflow.controller.textManagement", {
		onInit : function(){
			
			this.getSplitContObj().setMode("ShowHideMode");
			this._refresh();
			
		},
		getSplitContObj : function() {
			var result = this.byId("MessageSplit");
			if (!result) {
				jQuery.sap.log.error("SplitApp object can't be found");
			}
			return result;
		},
		changeLayout : function (evt) {
			console.log(evt.getSource().getInfo());
			var oModel = new JSONModel("./webapi/messages/byId/"+evt.getSource().getDescription());
			this.getView().setModel(oModel,"currentMessage");
		},
		navigateToMessage : function (oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
			this.getSplitContObj().toDetail(this.createId("detail"));
		},
		
		goToMaster : function() {
			this.getSplitContObj().toMaster(this.createId("master"));
			console.log(sap.ui.getCore().getModel("GlobalModel").oData.eid)
		},
		
		//SplitPageNavigation Ends Here
		
		//---------------------------------------------------------------------
		
		//Action List Functionality
        
        _refresh : function(evt) {
        	try {
        		eid=parseInt(sap.ui.getCore().getModel("GlobalModel").oData.eid);
        		var oModel = new JSONModel("./webapi/messages/"+eid);
    			this.getView().setModel(oModel,"message");
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
        
        //------------------------------------------------------------
        
        _back : function (oEvent) {
        	window.history.go(-1);
        },
        
        //------------------------------------------------------------
        
      //Add Message Dialog
        
        _getAddMessageDialog : function () {
        	if(!this._oDialog1) {
        		var oModel = new JSONModel ("./webapi/user/fetchAll");
        		this.getView().setModel(oModel,"users");
        		this._oDialog1 = sap.ui.xmlfragment("workflow.view.AddMessage", this);
        		this.getView().addDependent(this._oDialog1);
        	}
        	return this._oDialog1;
        },
        
        onOpenAddMessageDialog : function () {
        	this._getAddMessageDialog().close();
        	this._getAddMessageDialog().open();
        },
        
        onCloseAddMessageDialog : function (oEvent) {
        	this._getAddMessageDialog().close();
        },
        
        onRecipientSelectionChange : function (oEvent) {
        	recipient = oEvent.getParameters("selectedItem").selectedItem.getText();
        	
        },
        
        
        onAddMessageSubmit : function () {
        	
        	var data={};
        	
        	var xhr = new XMLHttpRequest();
        	var url="./webapi/user/"+eid;
        	xhr.open("GET",url,false);
        	xhr.send();
        	data["receiver"]=recipient;
        	data["sender"]=xhr.responseText;
        	data["messageSubject"]=sap.ui.getCore().byId("subjectMessage").getValue();
        	data["message"]=sap.ui.getCore().byId("messageMessage").getValue();
        	var canSend=true;
        	for(var x in data){
        		if(data[x] === "" || data[x] === null){
        			canSend=false;
        		}
        	}
        	if(canSend){
        		var url = "./webapi/messages";
        		var xhr = new XMLHttpRequest();
        		xhr.open("POST",url,false);
        		xhr.setRequestHeader("Content-Type", "application/json");
        		xhr.send(JSON.stringify(data));
        		if(xhr.responseText == "success"){
    				MessageToast.show("Message successfully sent!", {
    	        		duration : 5000,
    	        		closeOnBrowserNavigation : false
    				});
    				this._getAddMessageDialog().close();
    				this._refresh();
    			}
    			else{
    				MessageToast.show("Failed to send Message!", {
    	        		duration : 5000,
    	        		closeOnBrowserNavigation : false
    				});
    			}
        	}
        	else{
        		MessageToast.show("Fields Cannot be empty!", {
	        		duration : 5000,
	        		closeOnBrowserNavigation : false
				});
        	}
        },
        
        //Add Department Ends Here
	})
});