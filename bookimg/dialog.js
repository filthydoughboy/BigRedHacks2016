// Copyright (c) 2016 Yujin Koh, Sung Won An, Jonathan Park, Thomas Lee. 
// All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 * 
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 *
 * Author: 2014 The Chromium Authors
 * URL: https://developer.chrome.com/extensions/getstarted
 * Date of retrieval: Spetember 17, 2016
 * License: https://creativecommons.org/licenses/by/3.0/
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

function onSave() {

}

var dialog = document.createElement("dialog");
dialog.textContent = "Hello";
var save_button = document.createElement("button");
var close_button = document.createElement("button");
save_button.textContent = "Save";
close_button.textContent = "Close";
dialog.appendChild(save_button);
dialog.appendChild(close_button);
save_button.addEventListener("click", function() {
  onSave();
  dialog.close();
})
close_button.addEventListener("click", function() {
  dialog.close();
})
document.body.appendChild(dialog);
dialog.showModal();

// getCurrentTabUrl(function(url) {
//   console.log(url)
// });