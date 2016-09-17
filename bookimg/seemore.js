function clickHandler(e) {
    chrome.runtime.sendMessage({directive: "link"});
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bookmark1').addEventListener('click', clickHandler);
})