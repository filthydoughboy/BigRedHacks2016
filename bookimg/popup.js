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
  document.getElementById('screenshot').addEventListener('click', screenshotHandler);
  document.getElementById('seemore').addEventListener('click', seeMoreHandler);
})