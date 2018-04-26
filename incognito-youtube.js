"use strict";

chrome.webRequest.onBeforeRequest.addListener(
	(details) => {
		if (details.type !== "main_frame")
			return;

		chrome.tabs.query({"currentWindow": true, "active": true},
			(tabs) => {
				tabs.map(tab => chrome.tabs.remove(tab.id));
			});
		chrome.windows.create({"incognito": true, "url": details.url});
		return {"cancel": true};
	},
	{"urls": ["<all_urls>"]},
	["blocking"]
	);
