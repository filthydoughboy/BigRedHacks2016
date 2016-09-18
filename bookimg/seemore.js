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
  function listener(message, sender, sendResponse) {
  	var content = document.getElementById('content');
    console.log("hello");
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
  }
);
