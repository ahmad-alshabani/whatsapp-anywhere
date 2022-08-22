/**
Code to be executed for context menu functionality
**/

//Make sure assets/utility.js is loaded so we have access to _utility.getWhatsappMessageUrl 
function getword(info,tab) {
  _utility.getWhatsappMessageUrl(info.selectionText, function(whatsappMessageUrl){
  	chrome.tabs.create({  
    		url: whatsappMessageUrl
	});
  })
}

chrome.runtime.onInstalled.addListener(() => {chrome.contextMenus.create({
	id: "whatsparent",
  title: "Whatsapp: %s", 
  contexts:["selection"], 
});
});
					      
chrome.contextMenus.onClicked.addListener(function(info, tab){
	if(tab){
		if(info.menuItemId === "whatsparent"){
			getword(info,tab)}
	}
});
