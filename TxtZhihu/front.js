
var txtZhihu = {
    $top: $(".AppHeader-inner"), //1
    $HomeEntry: $(".AppHeader-userInfo"), //2
    $rightSlide: $(".Sticky"), //4
    $portrait: $(".Avatar"), //8
    $thumbnail: $(".RichContent-cover"), //16
    $domArr: [],
    cookieVal: "",
    init: function () {
        var that = this;
        that.$domArr = [that.$top, that.$HomeEntry, that.$rightSlide, that.$portrait, that.$thumbnail];
        var cookie = that.getCookie(); //txtZhihuCookie = 31     
        that.cookieVal = cookie.length > 0 ? parseInt(cookie.split('=')[1]) : 0;
        that.hideDoms();
        that.addMsgListener();
        that.scrollEvtReg();
    },
    hideDoms: function () {
        var that = this;
        for (var i = 0; i < that.$domArr.length; i++) {
            var binaryIndex = Math.pow(2, i);
            if (!!that.cookieVal && (that.cookieVal & binaryIndex) !== 0) {
                that.$domArr[i].hide();
            }
        }
    },
    getCookie: function () {
        var reg = /txtZhihuHidDomCookie=\d+/;
        var arr = document.cookie.match(reg);
        return (!!arr && arr.length > 0) ? arr[0] : ""; //txtZhihuHidDomCookie = 31     
    },

    addMsgListener: function () {
        var that = this;
        chrome.extension.onRequest.addListener(
            function (request, sender, sendResponse) {
                var itemIndex = request.greeting;//0 1 2 3 4 5
                that.toggleItem(itemIndex);
                //sendResponse({ farewell: index });
            });
    },
    toggleItem: function (index) {
        var that = this;
        var $dom = that.$domArr[index];
        var binaryFlag = Math.pow(2, index);
        var display = $dom.css("display");
        if (display === "none") {
            that.cookieVal = that.cookieVal & ~binaryFlag; //从中减去，位运算高级应用
            $dom.show();
        } else {
            that.cookieVal = that.cookieVal | binaryFlag;
            $dom.hide();
        }
        //此处设置cookie
        //存入cookie的是要隐藏的元素的映射index
        //document.cookie = "txtZhihuHidDomCookie=" + that.cookieVal + ";path=/;domain=zhihu.com"; 这样就不对，不知为什么。会在不同的浏览器标签中产生同名的两个cookie
        $.fn.cookie('txtZhihuHidDomCookie', that.cookieVal, { path: '/', domain: 'zhihu.com' });
    },
    scrollEvtReg: function () {
        var that = this;
        var temp = [0, 1, 2, 3, 4, 5];
        $(window).scroll(function () {
            that.$portrait = $(".Avatar");
            that.$thumbnail = $(".RichContent-cover");
            that.$domArr = [that.$top, that.$HomeEntry, that.$rightSlide, $(""), that.$portrait, that.$thumbnail];
            for (var i = 4; i < temp.length; i++) {
                var binaryFlag = Math.pow(2, i);
                if (!!that.cookieVal && (that.cookieVal & binaryFlag) !== 0) {
                    that.$domArr[i].hide();
                }
            }
        });
    }
};

$(document).ready(function () {
    txtZhihu.init();
});