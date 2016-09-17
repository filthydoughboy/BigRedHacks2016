// Copyright (c) 2016 Yujin Koh, Sung Won An, Jonathan Park, Thomas Lee. 
// All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "content_script.js"});
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.directive) {
    case "popup-click":
      chrome.tabs.create({ url: "seemore.html"});
      sendResponse({}); // sending back empty response to sender
      break;
    case "bookmark-click":
      var url = 'https://www.amazon.com/Master-Tower-Erection-Enhancer-Anal/dp/B0080ID1I2/ref=sr_1_4_a_it?ie=UTF8&qid=1474139689&sr=8-4&keywords=butt+plug';
      chrome.tabs.create({ url: url});
      sendResponse({}); // sending back empty response to sender
      break;
    default:
      // helps debug when request directive doesn't match
      alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
    }
  }
);
