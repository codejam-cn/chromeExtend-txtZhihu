

chrome.extension.onRequest.addListener(
  function (request, sender, sendResponse) {
      console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");

      var msg = request.greeting;
      var itemId = msg.split('&')[0];
      var itemIds = (msg.split('&')[1]).split(',');

      var index = getItemIndex(itemId, itemIds);
      switch (index) {
          case 0:
              toggleItem($(".zu-top"));
              break;
          case 1:
              toggleItem($(".HomeEntry"));
              break;
          case 2:
              toggleItem($(".zu-main-sidebar"));
              break;
          default:
              break;
      }
      sendResponse({ farewell: index });
  });


function getItemIndex(item, itemArr) {
    for (var i = 0; i < itemArr.length; i++) {
        if (item === itemArr[i]) {
            return i;
        }
    }
    return NaN;
}

function toggleItem($item) {
    var display = $item.css("display");
    if (display === "none") {
        $item.show();
    } else {
        $item.hide();
    }
}