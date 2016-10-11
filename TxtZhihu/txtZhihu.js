$(document).ready(function () {
    $(".zu-top").hide();

    $(".HomeEntry").hide();

    $(".zu-main-sidebar").hide();

    $(window).scroll(function () {
        //隐藏用户头像
        $(".side-topic-avatar,.zm-item-img-avatar").hide();

        //隐藏正文选段的缩略图
        $(".zh-summary").find("img").hide();


        $("a.toggle-expand").click(function () {
            $(".zm-item-rich-text").find("img").css({ "width": "80px" });

        });

    });

});



