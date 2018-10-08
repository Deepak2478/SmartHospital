sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   "sap/m/MessageToast",
   "sap/ui/model/Filter"
   ], function(Controller, JSONModel, MessageToast, Filter){
	"use strict"
	
	var dept="";
	var eid;
	return Controller.extend("workflow.controller.patientManagement", {
		onInit : function(){
			this._refresh();
		},
		
		//Action List Functionality
        
        _refresh : function(evt) {
        	try {
            	eid=parseInt(sap.ui.getCore().getModel("GlobalModel").oData.eid);
            	var oModel=new JSONModel("./webapi/tiles");
    			this.getView().setModel(oModel,"depts");
    			oModel = new JSONModel("./webapi/patient");
    			this.getView().setModel(oModel,"pat");
    			oModel = new JSONModel("./webapi/patient/num");
    			this.getView().setModel(oModel,"patNum");
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
        	sap.m.URLHelper.triggerTel("+919743211254");
        },
        
        _textMessage : function(evt) {
        	sap.m.URLHelper.triggerSms("+919743211254");
        },
        
        _feedback : function(evt) {
        	sap.m.URLHelper.triggerEmail("deepankar.sharma@live.in", "CIMS - Feedback");
        },
        
        _request : function(evt) {
        	sap.m.URLHelper.triggerEmail("deepankar.sharma@live.in", "CIMS - Request");
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
        
        //------------------------------------------------------------------------
        
        _back : function (oEvent) {
        	window.history.go(-1);
        },
        
        onDepartmentSelectionChange : function(oEvent) {
        	dept = oEvent.getParameters("selectedItem").selectedItem.getText();
        },
        
        //-------------------------------------------------------
        
        onAddPatient : function() {
        	var data = {};
        	data["patientName"]=this.getView().byId("pname").getValue();
        	data["department"]=dept;
        	data["reason"]=this.getView().byId("reason").getValue();
        	data["due"]=this.getView().byId("fee").getValue();
        	var canSend=true;
        	for(var x in data){
        		if(data[x] === "" || data[x] === null){
        			canSend = false;
        		}
        	}
        	if(canSend){
	        	var xhr = new XMLHttpRequest();
	        	var url="./webapi/patient";
	        	xhr.open("POST",url,false);
	        	xhr.setRequestHeader("Content-Type", "application/json");
	        	xhr.send(JSON.stringify(data));
	        	if(xhr.responseText == "success") {
	        		MessageToast.show("Patient added successfully!", {
		        		duration : 5000,
		        		closeOnBrowserNavigation : false
					});
	        		this.getView().byId("pname").setValue("");
	        		this.getView().byId("reason").setValue("");
	        		this.getView().byId("fee").setValue("");
	        		this._refresh();
	        	}
	        	else {
	        		MessageToast.show("Failed to add patient!", {
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
        
        onSearchID : function(oEvt)
        {
        	var aFilter = [];
        	var sQuery = oEvt.getSource().getValue();
        	if(sQuery && sQuery.length > 0)
        	{
        		var filter = new Filter("pid", sap.ui.model.FilterOperator.Contains, sQuery);
        		aFilter.push(filter);
        	}
        	
        	var list = this.getView().byId("allPatients");
        	var binding = list.getBinding("items");
        	binding.filter(aFilter, "Application");
        },
        
        onSearchName : function(oEvt)
        {
        	var aFilter = [];
        	var sQuery = oEvt.getSource().getValue();
        	if(sQuery && sQuery.length > 0)
        	{
        		var filter = new Filter("patientName", sap.ui.model.FilterOperator.Contains, sQuery);
        		aFilter.push(filter);
        	}
        	
        	var list = this.getView().byId("allPatients");
        	var binding = list.getBinding("items");
        	binding.filter(aFilter, "Application");
        },
        
        handleIconTabBarSelect : function (oEvent)
        {
        	var sKey = oEvent.getParameter("key");
        	var aFilter = [];
        	var list;
        	if(sKey === "admitted") {
        		var filter = new Filter("status", sap.ui.model.FilterOperator.Contains, "Admitted");
        		aFilter.push(filter);
        		list = this.getView().byId("admitted");
            	
        	} else if(sKey === "discharged") {
        		var filter = new Filter("status", sap.ui.model.FilterOperator.Contains, "Discharged");
        		aFilter.push(filter);
        		list = this.getView().byId("discharged");
        	} else if(sKey === "overdue") {
        		var filter = new Filter("status", sap.ui.model.FilterOperator.Contains, "Overdue");
        		aFilter.push(filter);
        		list = this.getView().byId("overdue");
        	} else {
        		list = this.getView().byId("allPatients");
        	}
        	var binding = list.getBinding("items");
        	binding.filter(aFilter, "Application");
        	
        }
	})
});