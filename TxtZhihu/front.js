
var txtZhihu = {
    $top: $(".zu-top"), //1
    $HomeEntry: $(".HomeEntry"), //2
    $rightSlide: $(".zu-main-sidebar"), //4
    $portrait: $(".side-topic-avatar"), //8
    $thumbnail: $(".zh-lightbox-thumb"), //16
    $domArr: [],
    cookieVal:"",
    init: function () {
        var that = this;
        that.$domArr = [that.$top, that.$HomeEntry, that.$rightSlide, that.$portrait, that.$thumbnail];
        var cookie = that.getCookie(); //txtZhihuCookie = 31     
        that.cookieVal = cookie.length > 0 ? parseInt(cookie.split('=')[1]) : 0;
       
        that.hideDoms();
        that.addMsgListener();
        that.scrollEvtReg();
    },
    hideDoms: function() {
        var that = this;
        for (var i = 0; i < that.$domArr.length; i++) {
            var binaryIndex = Math.pow(2, i);
            if (!!that.cookieVal && (that.cookieVal & binaryIndex) === 0) {
                that.$domArr[i].hide();
            }
        }
    },
    getCookie: function () {
        var reg = /txtZhihuCookie=\d+/;
        var arr = document.cookie.match(reg);
        return (!!arr && arr.length > 0) ? arr[0] : ""; //txtZhihuCookie = 31     
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
    toggleAll: function () {
        var that = this;
        var $all = that.$top.add(that.$HomeEntry).add(that.$rightSlide).add(that.$portrait).add(that.$portrait).add(that.$thumbnail);
        var display = $all.css("display");
        if (display === "none") {
            that.cookieVal = that.cookieVal | 32;
            $all.show();
        } else {
            that.cookieVal = that.cookieVal ^ 32;
            $all.hide();
        }
        //此处设置cookie
        //存入cookie的是要显示的元素的映射index
        document.cookie = "txtZhihuCookie=" + that.cookieVal;
    },
    toggleSingle: function (index) {
        var that = this;
        var $dom = that.$domArr[index];
        var binaryFlag = Math.pow(2, index);
        var display = $dom.css("display");
        if (display === "none") {
            that.cookieVal = that.cookieVal | binaryFlag;
            $dom.show();
        } else {
            that.cookieVal = that.cookieVal ^ binaryFlag;
            $dom.hide();
        }
        //此处设置cookie
        //存入cookie的是要显示的元素的映射index
        document.cookie = "txtZhihuCookie=" + that.cookieVal;
    },
    // index => 0 1 2 3 4 5
    toggleItem: function (index) {
        var that = this;
        if (index >= 0 && index <= 4) {
            that.toggleSingle(index);
        } else {
            that.toggleAll();
        }
    },
    scrollEvtReg: function() {
        $(window).scroll(function() {
            console.log(99)
        });
    }
};

$(document).ready(function () {
    txtZhihu.init();
});