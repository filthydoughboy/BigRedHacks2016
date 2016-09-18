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
    dialog.style.width = '500px';
    dialog.style.height = '700px';
    document.body.appendChild(dialog);

    var dialog_div = document.createElement("div");
    dialog_div.style.display = 'flex';
    dialog_div.style['flex-direction'] = 'column';
    dialog.appendChild(dialog_div);
    
    var image = document.createElement("img");
    image.src = message.img_url;
    image.style.width = "400px";
    image.style.height = "300px";
    dialog_div.appendChild(image);

    var title_input = document.createElement("input");
    title_input.type = "text";
    title_input.name = "Title";
    title_input.value = "Please insert a title";    
    dialog_div.appendChild(title_input);

    var description_input = document.createElement("input");
    description_input.type = "text";
    description_input.name = "Title";
    description_input.value = "Please insert a description"; 
    dialog_div.appendChild(description_input);

    var save_button = document.createElement("button");
    save_button.textContent = "Save";
    save_button.addEventListener("click", function() {
      onSave();
      dialog.close();
    })
    
    var close_button = document.createElement("button");
    close_button.textContent = "Close";
    close_button.addEventListener("click", function() {
      dialog.close();
    })

    var button_panel = document.createElement("div");
    button_panel.appendChild(save_button);
    button_panel.appendChild(close_button);
    button_panel.style.display = 'flex';
    button_panel.style['flex-direction'] = 'row';

    dialog_div.appendChild(button_panel);
    dialog.showModal();
  }
);

$(window).resize(function() {
  $("#dialog").dialog("option", "position", "center");
});

