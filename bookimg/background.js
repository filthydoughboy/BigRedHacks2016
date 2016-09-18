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

        var id = 100;
        chrome.tabs.captureVisibleTab(function(screenshotUrl) {
          var imageUrl = screenshotUrl;
          var targetId = null;

          chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
            // We are waiting for the tab we opened to finish loading.
            // Check that the tab's id matches the tab we opened,
            // and that the tab is done loading.
            if (tabId != targetId || changedProps.status != "complete")
              return;

            // Passing the above test means this is the event we were waiting for.
            // There is nothing we need to do for future onUpdated events, so we
            // use removeListner to stop getting called when onUpdated events fire.
            chrome.tabs.onUpdated.removeListener(listener);

            // Look through all views to find the window which will display
            // the screenshot.  The url of the tab which will display the
            // screenshot includes a query parameter with a unique id, which
            // ensures that exactly one view will have the matching URL.
            var views = chrome.extension.getViews();
            for (var i = 0; i < views.length; i++) {
              var view = views[i];
              if (view.location.href == imageUrl) {
                view.setScreenshotUrl(screenshotUrl);
                break;
              }
            }
          });

          chrome.tabs.executeScript({file: 'dialog.js'}, function() {
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
              chrome.tabs.sendMessage(tabs[0].id, {
                'curr_url': url,
                'img_url': imageUrl
              });
            });
          });
        });
      });
      sendResponse({}); // sending back empty response to sender
      break;
    case "seemore":
      chrome.tabs.create({ url: "seemore.html"}, function(tab) {
        chrome.storage.local.get('bookmarks', function(result) {
          chrome.tabs.sendMessage(tab.id, result.bookmarks);
        });
      });
      sendResponse({}); // sending back empty response to sender
      break;
    case "popup":
      chrome.storage.local.get('bookmarks', function(result){
        var bookmarks = result.bookmarks;
        var message = (bookmarks.length <= 5) ? bookmarks : bookmarks.slice(bookmarks.length-5);
        sendResponse({'message': message});
      });
      return true;
    case "save":
      // Get a value saved in a form.
      // Check that there's some code there.
      if (!request.curr_url || !request.img_url) {   
        return;
      }
      // Save it using the Chrome extension storage API.
      chrome.storage.local.get('bookmarks', function(result){
        console.log(result);
        var bookmarks = (Object.keys(result).length == 0) ? [] : result.bookmarks;
        bookmarks.push({
          'url': request.curr_url, 
          'img_url': request.img_url,
          'tit': request.tit,
          'desc': request.desc
        });
        chrome.storage.local.set({
          'bookmarks': bookmarks
        });
      });
      sendResponse({}); // sending back empty response to sender
      break;
    default:
      // helps debug when request directive doesn't match
      alert("Unmatched request of '" + request + "' from script to background.js from " + sender);
    }
  }
);
