/**
Code to be executed for context menu functionality
**/

//Make sure assets/utility.js is loaded so we have access to _utility.getWhatsappMessageUrl 
const _utility = {
	getWhatsappMessageUrl: function (phonestring, cb) {
		//Returns message url in the form of "https://api.whatsapp.com/send?phone=91232132&text=hi"
		const MESSAGE_API_URL = "https://api.whatsapp.com/send?phone="
		chrome.storage.sync.get({ 'defaultCountryCode': 965, 'defaultMessage': '' }, function (configs) {
			if (!phonestring) {
				return cb("#NotAPhoneNumber");
			}
			//Format the selection - remove the non-digit characters
			var phone = phonestring.replace(/\D+/g, '');
			//Create the url with the given text and message api url 
			if (!phone || phone.length < 8) {
				return cb("#NotAPhoneNumber");
			} else if (phone.length < 11) {
				return cb(MESSAGE_API_URL + configs.defaultCountryCode + phone + "&text=" + encodeURIComponent(configs.defaultMessage));
			} else if (phone.length < 14) {
				return cb(MESSAGE_API_URL + phone + "&text=" + encodeURIComponent(configs.defaultMessage));
			} else {
				return cb("#NotAPhoneNumber");
			}
		});
	}
}

function getword(info, tab) {
	_utility.getWhatsappMessageUrl(info.selectionText, function (whatsappMessageUrl) {
	  chrome.tabs.create({  
    		url: whatsappMessageUrl
	});
  })
}

 chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
	id: "whatsparent",
  title: "Whatsapp: %s", 
  contexts:["selection"], 
	});
});
chrome.contextMenus.onClicked.addListener(onClickHandler);

function onClickHandler(info, tab) {
	if (info.menuItemId === "whatsparent") {
		getword(info, tab);
	}
}
