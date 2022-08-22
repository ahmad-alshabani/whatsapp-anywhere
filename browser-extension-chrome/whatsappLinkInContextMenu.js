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

chrome.contextMenus.create({
	id: "some-command",
  title: "Whatsapp: %s", 
  contexts:["selection"], 
});

chrome.contextMenus.onClicked.addListener(function(){
	getword
});
