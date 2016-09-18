// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function screenshotHandler() {
  chrome.runtime.sendMessage({directive: "screenshot"}, function(response) {
      this.close(); // close the popup when the background finishes processing request
  });
}

function seeMoreHandler() {
  chrome.runtime.sendMessage({directive: "seemore"}, function(response) {
      this.close(); // close the popup when the background finishes processing request
  });
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.runtime.sendMessage({directive: "popup"}, function(response) {
    var message = response.message;
    var mostrecent = document.getElementById('mostrecent');
    for (i = message.length-1; i >= 0; i--) { 
      var titleEl = document.createElement('p');
      var title = document.createTextNode(message[i].tit);
      titleEl.appendChild(title);
      mostrecent.appendChild(titleEl);

      var image = document.createElement('img');
      image.src = message[i].img_url;
      image.style.height = "200px";
      mostrecent.appendChild(image);
    }
    //this.close(); // close the popup when the background finishes processing request
  });
  document.getElementById('screenshot').addEventListener('click', screenshotHandler);
  document.getElementById('seemore').addEventListener('click', seeMoreHandler);
})
