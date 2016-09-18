// Copyright (c) 2016 Yujin Koh, Sung Won An, Jonathan Park, Thomas Lee. 
// All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// function sendResponse() {
//     var content = document.getElementById('content');
//     console.log(message.length);
//     //console.log(message);
//     for (i = 0; i < message.length; i++) {
//       var item = document.createElement("li");
//       var image = document.createElement('img');
//       image.src = message[i].img_url;
//       image.style.height = "200px";
//       item.appendChild(image);
//       content.appendChild(item);
//     }
// }

chrome.runtime.onMessage.addListener(
  function listener(request, sender, sendResponse) {
    console.log(request.directive);
    switch (request.directive) {
      case "display":
        // if (!request.bookmarks) {
        //   return;
        // }
        console.log(request);
        var content = document.getElementById('content');
        var message = request.bookmarks;
        var titleEl = document.createElement('p');
        var title = document.createTextNode("HELLO");
        titleEl.appendChild(title);
        content.appendChild(titleEl);
        //console.log("hello");
        //console.log(message.length);
        //console.log(message);
        for (i = 0; i < message.length; i++) {
          var item = document.createElement("li");
          var image = document.createElement('img');
          image.src = message[i].img_url;
          image.style.height = "200px";
          item.appendChild(image);
          content.appendChild(item);
        }
        chrome.runtime.onMessage.removeListener(listener);
        break;
      default:
        return;
    }
    
  }
);