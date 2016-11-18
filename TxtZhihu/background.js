/**
 * ZHAOs @2016年11月18日1643:35:
 */
var showForPages = ["https://www.zhihu.com/*", "http://www.zhihu.com/*"];


//一级菜单产生
var lvl1ContextItemId = chrome.contextMenus.create({
    "title": "txt Zhihu",
    "documentUrlPatterns": showForPages,
    "contexts": ["page"]
});



//二级菜单产生
var pagePartions = ["top", "profile", "right", "", "portrait", "thumbnail", "all"];
var lvl2ContextItemIdArr = [];
for (var i = 0; i < pagePartions.length; i++) {
    var obj = (pagePartions[i] === "") ? {
        type: "separator",
        "parentId": lvl1ContextItemId
    } : {
        "title": "toggle " + pagePartions[i],
        "parentId": lvl1ContextItemId,
        "documentUrlPatterns": showForPages,
        "onclick": mycallback
    }

    var itemId = chrome.contextMenus.create(obj);
    lvl2ContextItemIdArr.push(itemId);
}

//获得菜单项索引
function getItemIndex(item, itemArr) {
    for (var i = 0; i < itemArr.length; i++) {
        if (item == itemArr[i]) {
            return i;
        }
    }
    return NaN;
}

//执行函数
function mycallback(info, tab) {
    var clickedIndex = getItemIndex(info.menuItemId, lvl2ContextItemIdArr); //0 1 2 3 4 5
    chrome.tabs.sendRequest(tab.id, { greeting: clickedIndex }, function (response) {
        //console.log(response.farewell);
    });
}
