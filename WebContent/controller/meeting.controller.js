sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   'sap/m/MessageToast'
   ], function(Controller, JSONModel, MessageToast){
	"use strict"
	var dept,eid,date,time,flag;
	var memberSelected = [];
	return Controller.extend("workflow.controller.meeting", {
		onInit : function(){
			var oModel = new JSONModel("./webapi/tiles");
			this.getView().setModel(oModel, "depts");
			oModel = new JSONModel("./webapi/user/fetchAll");
			this.getView().setModel(oModel, "users");
			this._refresh();
		},
		
		//Action List Functionality
        
        _refresh : function(evt) {
        	try {
        		eid=parseInt(sap.ui.getCore().getModel("GlobalModel").oData.eid);
        		if(eid == 0){
        			this.getView().byId("willAttendToggle").setEnabled(false);
        		}
        		if(eid >= 5000){
        			this.getView().byId("OrganizeMeetingButton").setEnabled(false);
        		}
        		
        		var oModel = new JSONModel("./webapi/meeting/"+eid);
    			this.getView().setModel(oModel, "meeting");
        	}
        	catch(err) {
        		console.log(err);
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
        
        //----------------------------------------------------------------
        
        _back : function (oEvent) {
        	window.history.go(-1);
        },
        
        //----------------------------------------------------------------
        
        _getAddMeetingDialog : function () {
            if (!this._oDialog101) {
               this._oDialog101 = sap.ui.xmlfragment("workflow.view.AddMeeting", this);
               this.getView().addDependent(this._oDialog101);
            }
            return this._oDialog101;
         },
         
         onOpenAddMeetingDialog : function () {
        	 this._getAddMeetingDialog().close();
             this._getAddMeetingDialog().open();
         },
         
         onCloseAddMeetingDialog : function () {
             this._getAddMeetingDialog().close();
          },
          
          onDepartmentSelectionChange : function(oEvent) {
        	  dept = oEvent.getParameters("selectedItem").selectedItem.getText();
          },
          
          onMemberSelectionFinish : function (oEvent) {
        	  var selectedItems = oEvent.getParameter("selectedItems");
          	for(var i =0; i< selectedItems.length; i++) {
          		memberSelected.push({"username" : selectedItems[i].getText()});
          	}
          },
          
          onDateChange : function(oEvent) {
        	  date=oEvent.getParameters().value;
          },
          
          onTimeChange : function(oEvent) {
        	  time=oEvent.getParameters().value;
          },
          
          onAddMeetingSubmit : function () {
        	 
        	 var data= {};
        	 var canSend=true;
        	 var xhr = new XMLHttpRequest();
        	 var url="./webapi/user/"+eid;
        	 xhr.open("GET",url,false);
        	 xhr.send();
        	 data["title"]=sap.ui.getCore().byId("meetingTitle").getValue();
        	 data["details"]=sap.ui.getCore().byId("desc").getValue();
        	 data["organizer"]=dept;
        	 data["poster"]=xhr.responseText;
        	 data["eDate"]=date+" at "+time;
        	 data["priority"]=flag;
        	 data["willAttend"]=false;
        	 if(memberSelected.length > 0){
	        	 data["userName"]=memberSelected;
	        	 for(var x in data){
	        		 if(data[x] === "" || data[x] === null){
	        			 canSend=false;
	        		 }
	        	 }
	        	 if(canSend){
		        	 url="./webapi/meeting";
		        	 xhr.open("POST", url, false);
		        	 xhr.setRequestHeader("Content-Type", "application/json");
		        	 console.log(JSON.stringify(data));
		        	 xhr.send(JSON.stringify(data));
		        	 if(xhr.responseText == "success") {
		        		 MessageToast.show("Meeting Successfully Created", {
			        		duration : 5000,
			        		closeOnBrowserNavigation : false
		        		 });
		        		 this._refresh();
						this._getAddMeetingDialog().close();
						memberSelected = null;
						memberSelected = [];
		        	 }
		        	 else {
		        		 MessageToast.show("Failed to create user!", {
			        		duration : 5000,
			        		closeOnBrowserNavigation : false
		        		 });
		        	 }
	        	 }
	        	 else {
	        		 MessageToast.show("Fields cannot be empty!", {
		        		duration : 5000,
		        		closeOnBrowserNavigation : false
	        		 });
	        	 }
        	 }
        	 else {
        		 MessageToast.show("Select users for meeting!", {
	        		duration : 5000,
	        		closeOnBrowserNavigation : false
        		 });
        	 }
         	 
          },
          onAccept : function (evt) {
        	  var xhr = new XMLHttpRequest();
        	  var url="./webapi/user/"+eid;
         	  xhr.open("GET",url,false);
         	  xhr.send();
         	  
        	  var url="./webapi/meeting/"+xhr.responseText+"/"+ evt.getSource().getText();
        	  console.log(url);
        	  var val = evt.getSource().getPressed();
        	  xhr.open("PUT", url, false);
        	  xhr.send(val);
        	  this._refresh();
          },
          
          onFlag : function (evt) {
        	  if(evt.getSource().getPressed()){
        		  evt.getSource().setType("Reject");
        		  flag="Reject";
        	  }
        	  else{
        		  evt.getSource().setType("Default");
        		  flag="Default";
        	  }
          },
          
          _getOpenMeetingDialog : function () {
              if (!this._oDialog11) {
                 this._oDialog11 = sap.ui.xmlfragment("workflow.view.ViewMeeting2", this);
                 this.getView().addDependent(this._oDialog11);
              }
              return this._oDialog11;
           },
           
          openMeeting : function (oEvent) {
        	  var str=oEvent.getSource().getText();
        	  var xhr = new XMLHttpRequest();
        	  var url;
        	  //var oModel = new JSONModel(JSON.parse(xhr.response));
        	  var oModel = new JSONModel("./webapi/meeting/byId/"+str.substring(0,6));
        	 	this.getView().setModel(oModel, "participants");	
        	  this._getOpenMeetingDialog().close();
          	 	this._getOpenMeetingDialog().open();
           },
           
           onCloseOpenMeetingDialog : function () {
               this._getOpenMeetingDialog().close();
            },
	})
});