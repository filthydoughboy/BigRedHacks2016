// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function screenshotHandler(e) {
  chrome.runtime.sendMessage({directive: "screenshot"}, function(response) {
      this.close(); // close the popup when the background finishes processing request
  });
}

function seeMoreHandler(e) {
  chrome.runtime.sendMessage({directive: "seemore"}, function(response) {
      this.close(); // close the popup when the background finishes processing request
  });
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.sendMessage({directive: "popup"}, function(response) {
     console.log("ERROR: ", chrome.runtime.lastError);
    console.log(response);
    var message = response.message;
    var mostrecent = document.getElementById('mostrecent');
    for (i = message.length-1; i >= 0; i--) { 
      var image = document.createElement('img');
      image.src = message[i].imageurl;
      image.style.height = "200px";
      mostrecent.appendChild(image);
    }
    //this.close(); // close the popup when the background finishes processing request
  });
  document.getElementById('screenshot').addEventListener('click', screenshotHandler);
  document.getElementById('seemore').addEventListener('click', seeMoreHandler);
})
