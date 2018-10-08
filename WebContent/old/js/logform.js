/**
 * 
 */

function register()
{
	var xhr = new XMLHttpRequest();
	var url = "./webapi/profiles";
	var data = {};
	
	data["fname"]=document.getElementById("fname").value;
	data["lname"]=document.getElementById("lname").value;
	data["email"]=document.getElementById("email").value;
	data["userName"]=document.getElementById("userName").value;
	data["password"]=document.getElementById("password").value;
	console.log(JSON.stringify(data));
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(JSON.stringify(data));
	
	xhr.onloadend = function(){};
	
}