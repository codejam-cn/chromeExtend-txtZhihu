$(function () {
  

    var $top = $("#pageletTopBanner");
    var html = '<div id="downloadBtn" style="width:100%;height:60px;background-color:blue;">点击下载</div>';
    $top.after(html);


    $(document).on("click", "#downloadBtn", function () {
        var $player = $(".player-container");
        var src = $player.attr("data-src");
        if (src == "") {
            alert("页面加载错误，请刷新重试！");
        } else {

            //$('<a href="' + src + '"></a>').trigger("click");

            window.open(src);
        }
    })

    

    
});
