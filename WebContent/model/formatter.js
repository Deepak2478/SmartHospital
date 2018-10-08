sap.ui.define([], function() {
"use strict";
return {
willAtt : function(willAttend){
if(willAttend)
return "Accept";
else
return "Default";
}
}
});