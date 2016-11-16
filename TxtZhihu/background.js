
var showForPages = ["https://www.zhihu.com/*"];

var lvl1ContextItemId = chrome.contextMenus.create({
    "title": "txt Zhihu",
    "documentUrlPatterns": showForPages,
    "contexts": ["page"]
});

var pagePartions = ["top", "profile", "right"];
var lvl2ContextItemIdArr = [];

for (var i = 0; i < pagePartions.length; i++) {
    var itemId = chrome.contextMenus.create({
        "title": "toggle " + pagePartions[i],
        "parentId": lvl1ContextItemId,
        "documentUrlPatterns": showForPages,
        "onclick": mycallback
    });
    lvl2ContextItemIdArr.push(itemId);
}


function mycallback(info, tab) {
    var lvl2ContextItemIdJoin = lvl2ContextItemIdArr.join(',');
    var curItemId = info.menuItemId;

    var msg = curItemId + "&" + lvl2ContextItemIdJoin;

    chrome.tabs.sendRequest(tab.id, { greeting: msg }, function (response) {
        console.log(response.farewell);
    });
}
