// Copyright (c) 2016 Yujin Koh, Sung Won An, Jonathan Park, Thomas Lee. 
// All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.directive) {
    case "screenshot":
      getCurrentTabUrl(function(url) {
        chrome.tabs.executeScript({file: 'dialog.js'}, function() {
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {current_url: url});
          });
        });
      });
      sendResponse({}); // sending back empty response to sender
      break;
    case "seemore":
      chrome.tabs.create({ url: "seemore.html"});
      sendResponse({}); // sending back empty response to sender
      break;
    case "link":
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
