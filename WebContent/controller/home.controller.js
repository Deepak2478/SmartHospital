sap.ui.define([
   "sap/ui/core/mvc/Controller",
   "sap/ui/model/json/JSONModel"
   ], function(Controller, JSONModel){
	"use strict"
	var that;
	var dirn=1;
	var x=0;
	return Controller.extend("workflow.controller.home", {
		onInit : function (evt) {
			that=this;
			this.changeCarouselImage();
		},
		_login : function () {
			window.open("./#/login", "_blank", "");
		},
		changeCarouselImage : function () {
			if(dirn == 1){
				that.getView().byId("imageSlide").next();
				x++;
				if(x == 4)
					dirn=-1;
			}
			else{
				that.getView().byId("imageSlide").previous();
				x--;
				if(x == 1)
					dirn = 1;
			}
			setTimeout(that.changeCarouselImage, 5000);  
		}
	})
});