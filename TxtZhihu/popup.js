$(function () {
    var $a = $("#a");
    var $domA = $(".zu-top");

    var $b = $("#b");
    var $domB = $(".HomeEntry");

    var $c = $("#c");

    var $domC = $(".zu-main-sidebar");


    var $d = $("#d");
    var $domD = $(".side-topic-avatar,.zm-item-img-avatar");

    $a.click(function () {
        // $domA.show();

        // chrome.tabs.executeScript(null,
        //     { code: "document.body.style.backgroundColor='red'" });
        // window.close();

        chrome.tabs.executeScript(null, { file: "aaa.js" }, function () {

            console.log("end")
        });

    });


    $b.click(function () {
        $domB.show();
    });


    $c.click(function () {
        $domC.show();
    });


    $d.click(function () {
        $domD.show();
    });


});
