// Copyright (c) 2016 Yujin Koh, Sung Won An, Jonathan Park, Thomas Lee. 
// All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Returns a handler which will open a new window when activated.
 */
function getClickHandler() {
  return function(info, tab) {

    // The srcUrl property is only available for image elements.
    var url = 'https://www.amazon.com/Master-Tower-Erection-Enhancer-Anal/dp/B0080ID1I2/ref=sr_1_4_a_it?ie=UTF8&qid=1474139689&sr=8-4&keywords=butt+plug';

    // Create a new window to the info page.
    chrome.windows.create({ url: url });
  };
};

// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(null, {file: "content_script.js"});
});

/**
 * Create a context menu which will only show up for images.
 */
chrome.contextMenus.create({
  "title" : "Get image info",
  "type" : "normal",
  "contexts" : ["image", "browser_action"],
  "onclick" : getClickHandler()
});