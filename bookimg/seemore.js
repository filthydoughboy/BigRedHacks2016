function clickHandler(e) {
    var url = 'https://www.amazon.com/Master-Tower-Erection-Enhancer-Anal/dp/B0080ID1I2/ref=sr_1_4_a_it?ie=UTF8&qid=1474139689&sr=8-4&keywords=butt+plug';
    chrome.tabs.create({ url: url});
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('bookmark1').addEventListener('click', clickHandler);
})