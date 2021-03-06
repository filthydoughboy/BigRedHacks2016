// Copyright (c) 2016 Yujin Koh, Sung Won An, Jonathan Park, Thomas Lee. 
// All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.runtime.onMessage.addListener(
  function listener(message, sender, sendResponse) {
    var dialog = document.createElement("dialog");
    dialog.style.width = '500px';
    dialog.style.height = '450px';
    document.body.appendChild(dialog);

    var dialog_div = document.createElement("div");
    dialog_div.style.display = 'flex';
    dialog_div.style['flex-direction'] = 'column';
    dialog_div.style['justify-content'] = 'center';
    dialog.appendChild(dialog_div);
    
    var image = document.createElement("img");
    image.src = message.img_url;
    image.style.height = "350px";
    dialog_div.appendChild(image);

    var title_input = document.createElement("input");
    title_input.type = "text";
    title_input.name = "Title";
    title_input.value = "Please insert a title";    
    dialog_div.appendChild(title_input);

    var description_input = document.createElement("input");
    description_input.type = "text";
    description_input.name = "Desc";
    description_input.value = "Please insert a description"; 
    dialog_div.appendChild(description_input);

    var save_button = document.createElement("button");
    save_button.textContent = "Save";
    save_button.addEventListener("click", function() {
      chrome.runtime.sendMessage({
        directive: "save", 
        curr_url: message.curr_url,
        img_url: message.img_url,
        tit: document.getElementsByName("Title")[0].value,
        desc: document.getElementsByName("Desc")[0].value
      });
      dialog.close();
      document.body.removeChild(dialog);
      chrome.runtime.onMessage.removeListener(listener);
    })
    
    var close_button = document.createElement("button");
    close_button.textContent = "Close";
    close_button.addEventListener("click", function() {
      dialog.close();
      document.body.removeChild(dialog);
      chrome.runtime.onMessage.removeListener(listener);
    })

    var button_panel = document.createElement("div");
    button_panel.appendChild(save_button);
    button_panel.appendChild(close_button);
    button_panel.style.display = 'flex';
    button_panel.style['flex-direction'] = 'row';
    button_panel.style['justify-content'] = 'center';

    dialog_div.appendChild(button_panel);
    dialog.showModal();
  }
);

