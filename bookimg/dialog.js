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
  }
)

