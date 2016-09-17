// Copyright (c) 2016 Yujin Koh, Sung Won An, Jonathan Park, Thomas Lee. 
// All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function onSave() {
  console.log("save");
};


chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
    var dialog = document.createElement("dialog");
    dialog.textContent = message.current_url;
    document.body.appendChild(dialog);
    
    var save_button = document.createElement("button");
    save_button.textContent = "Save";
    dialog.appendChild(save_button);
    save_button.addEventListener("click", function() {
      onSave();
      dialog.close();
    })
    
    var close_button = document.createElement("button");
    close_button.textContent = "Close";
    dialog.appendChild(close_button);
    close_button.addEventListener("click", function() {
      dialog.close();
    })

    var image = document.createElement("img");
    image.src = message.img_url;
    image.style.width = "500px";
    image.style.height = "300px";
    dialog.appendChild(image);

    dialog.showModal();
  }
)

