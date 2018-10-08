sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel",
   'sap/m/MessageToast',
   "sap/ui/model/Filter"
   ], function(Controller, JSONModel, MessageToast, Filter){
	"use strict"
	
	var flag=false,fav=false,lock=false,eid,username="",department="";
	return Controller.extend("workflow.controller.bulletin", {
		onInit : function(){
			this._refresh();
		},
		
		
		//Action List Functionality
        
        _refresh : function(evt) {
        	try {
        		eid=parseInt(sap.ui.getCore().getModel("GlobalModel").oData.eid);
        		if(eid >= 5000){
        			this.getView().byId("addButtonBulletin").setEnabled(false);
        		}
    			var oModel = new JSONModel("./webapi/tiles");
    			this.getView().setModel(oModel, "depts");
    			oModel = new JSONModel("./webapi/user/fetchAll");
    			this.getView().setModel(oModel, "users");
    			oModel = new JSONModel("./webapi/bulletin/"+eid);
    			this.getView().setModel(oModel,"bulletin");
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
        
        //----------------------------------------------------------------
        
        _back : function (oEvent) {
        	window.history.go(-1);
        },
        
        //----------------------------------------------------------------
        
      //Add Notice Dialog
        
        onLock : function(oEvent) {
        	lock = true;
        	flag=false;
        	fav=false;
        	username="";
        	sap.ui.getCore().byId("flag").setPressed(false);
        	sap.ui.getCore().byId("fav").setPressed(false);
        	sap.ui.getCore().byId("specUser").setVisible(false);
    		sap.ui.getCore().byId("specCombo").setVisible(false);
        	lock=oEvent.getSource().getPressed();
        },
        
        onFlag : function(oEvent) {
        	lock = false;
        	flag=true;
        	fav=false;
        	username="";
        	sap.ui.getCore().byId("lock").setPressed(false);
        	sap.ui.getCore().byId("fav").setPressed(false);
        	sap.ui.getCore().byId("specUser").setVisible(false);
    		sap.ui.getCore().byId("specCombo").setVisible(false);
        	flag=oEvent.getSource().getPressed();
        },
        
        onFav : function(oEvent) {
        	lock = false;
        	flag=false;
        	fav=true;
        	sap.ui.getCore().byId("flag").setPressed(false);
        	sap.ui.getCore().byId("lock").setPressed(false);
        	fav=oEvent.getSource().getPressed();
        	if(fav){
        		sap.ui.getCore().byId("specUser").setVisible(true);
        		sap.ui.getCore().byId("specCombo").setVisible(true);
        	}
        	else {
        		username="";
            	sap.ui.getCore().byId("specUser").setVisible(false);
        		sap.ui.getCore().byId("specCombo").setVisible(false);
        	}
        },
        
        _getAddNoticeDialog : function () {
            if (!this._oDialog5) {
               this._oDialog5 = sap.ui.xmlfragment("workflow.view.AddBulletin", this);
               this.getView().addDependent(this._oDialog5);
            }
            return this._oDialog5;
         },
         
         onOpenAddNoticeDialog : function () {
        	 this._getAddNoticeDialog().close();
             this._getAddNoticeDialog().open();
         },
         
         onCloseAddNoticeDialog : function () {
             this._getAddNoticeDialog().close();
          },
          
          onDepartmentSelectionChange : function(oEvent) {
        	  department = oEvent.getParameters("selectedItem").selectedItem.getText();
          },
          
          onUserSelectionChange : function(oEvent) {
        	  username = oEvent.getParameters("selectedItem").selectedItem.getText();
          },
        
         onAddNoticeSubmit : function () {
        	 var xhr = new XMLHttpRequest();
        	 var url = "./webapi/user/"+eid;
        	 xhr.open("GET", url, false);
        	 xhr.send();
        	 var canSend=true;
        	 var data = {};
        	 data["poster"]=xhr.responseText;
        	 data["title"] =sap.ui.getCore().byId("noticeTitle").getValue();
        	 data["details"]=sap.ui.getCore().byId("descBullet").getValue();
        	 data["generic"]=flag;
        	 data["conf"]=lock;
        	 data["specific"]=fav;
        	 data["department"]=department;
        	 for (var x in data){
        		 console.log(data[x]);
        		 if(data[x] === "" || data[x] === null){
        			 
        			 canSend=false;
        		 }
        	 }
        	 if(canSend){
	        	 data["username"]=username;
	        	 data["info"] = sap.ui.getCore().byId("addnBullet").getValue();
	        	 console.log(JSON.stringify(data));
	        	 url = "./webapi/bulletin";
	        	 xhr.open("POST", url, false);
	        	 xhr.setRequestHeader("Content-Type", "application/json");
	        	 xhr.send(JSON.stringify(data));
	        	 if(xhr.responseText == "success"){
	        		 MessageToast.show("Notice Successfully Created!", {
	 	        		duration : 5000,
	 	        		closeOnBrowserNavigation : false
	 				});
	 				this._getAddNoticeDialog().close();
	 				this._refresh();
	        	 }
	        	 else{
	        		 MessageToast.show("Failed to create notice!", {
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
          
         //-------------------------------------------------------------------------
          
         onSearch :  function(oEvt)
         {
         	var aFilter = [];
         	var sQuery = oEvt.getSource().getValue();
         	if(sQuery && sQuery.length > 0)
         	{
         		var filter = new Filter("title", sap.ui.model.FilterOperator.Contains, sQuery);
         		aFilter.push(filter);
         	}
         	
         	var list = this.getView().byId("allBulletins");
         	var binding = list.getBinding("items");
         	binding.filter(aFilter, "Application");
         },
         
         onListItemPressed : function(oEvent) {
        	 this._getNoticePopupDialog().open();
        	 var bid=oEvent.getSource().getIntro();
        	 var xhr=new XMLHttpRequest();
        	 var url="./webapi/bulletin/byid/"+bid;
        	 xhr.open("GET",url,false);
        	 xhr.send();
        	 var oModel = JSON.parse(xhr.responseText);
        	 sap.ui.getCore().byId("popupTitle").setValue(oModel.title);
        	 sap.ui.getCore().byId("popupDesc").setValue(oModel.details);
        	 sap.ui.getCore().byId("popupAddn").setValue(oModel.info);
        	 sap.ui.getCore().byId("postedOn").setText(oModel.date);
         },
         
         _getNoticePopupDialog : function () {
             if (!this._oDialog10) {
                this._oDialog10 = sap.ui.xmlfragment("workflow.view.ViewBulletin", this);
                this.getView().addDependent(this._oDialog10);
             }
             return this._oDialog10;
          },
          
          onCloseNoticePopupSubmit : function () {
              this._getNoticePopupDialog().close();
           },
	})
});