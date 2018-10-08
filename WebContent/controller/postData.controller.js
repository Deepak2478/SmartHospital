sap.ui.define([
               "sap/ui/core/mvc/Controller"],
               function (Controller){
	"use strict"
	return Controller.extend("workflow.controller.postData",{
		onInit : function (evt) {},
		sendPostRequest : function(){
			var oEntry = {};
			oEntry.eid = 5;
			oEntry.ename = "Deepankar";
			oEntry.eaddr = "Himachal Pradesh";
			
			var xhr = new XMLHttpRequest();
			var url = "./webapi/login/submit";
			var data = {};
			
			data["eid"] = 0;
			data["username"] = "admin";
			data["password"] = "admin";
			
			xhr.open("POST",url,false);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(JSON.stringify(data));
			if(xhr.status == 200)
				console.log("Success - "+xhr.statusText+" - "+xhr.responseText);
			else
				console.log("fail - "+xhr.status+" - "+xhr.statusText);
		},
		sendPutRequest : function(){
			var oEntry = {};
			oEntry.eid = 5;
			oEntry.ename = "Deepankar";
			oEntry.eaddr = "Himachal Pradesh";
			
			var xhr = new XMLHttpRequest();
			var url = "./webapi/testdata";
			var data = {};
			
			data["eid"] = 5;
			data["ename"] = "Deepankar Sharma";
			data["eaddr"] = "Himachal Pradesh";
			
			xhr.open("PUT",url,false);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(JSON.stringify(data));
			if(xhr.status == 200)
				console.log("Success - "+xhr.statusText+" - "+xhr.responseText);
			else
				console.log("fail - "+xhr.status+" - "+xhr.statusText);
		},
		sendDeleteRequest : function(){
			var oEntry = {};
			oEntry.eid = 5;
			oEntry.ename = "Deep";
			oEntry.eaddr = "Himachal Pradesh";
			
			var xhr = new XMLHttpRequest();
			var url = "./webapi/testdata";
			var data = {};
			
			data["eid"] = 5;
			data["ename"] = "Deep";
			data["eaddr"] = "Himachal Pradesh";
			
			xhr.open("DELETE",url,false);
			xhr.setRequestHeader("Content-Type", "application/json");
			xhr.send(JSON.stringify(data));
			if(xhr.status == 200)
				console.log("Success - "+xhr.statusText+" - "+xhr.responseText);
			else
				console.log("fail - "+xhr.status+" - "+xhr.statusText);
		},
		sendGetRequest : function(){
			var oEntry = {};
			oEntry.eid = 5;
			oEntry.ename = "Deepankar";
			oEntry.eaddr = "Himachal Pradesh";
			
			var xhr = new XMLHttpRequest();
			var url = "./webapi/testdata";
			var data = {};
			
					
			xhr.open("GET",url,false);
			
			xhr.send();
			if(xhr.status == 200)
				console.log("Success - "+xhr.statusText+" - "+xhr.responseText);
			else
				console.log("fail - "+xhr.status+" - "+xhr.statusText);
		}
	});
});