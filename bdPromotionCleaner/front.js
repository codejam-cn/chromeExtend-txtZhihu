window.onload = function (){
    var $content = $("#content_left");
    //广告
    var $maybeAds = $content.children("div");
    for(var i = 0;i<$maybeAds.length;i ++){
        var $curDiv =  $maybeAds.eq(i);
        var styleStr = $curDiv.attr("style");
        styleStr = !!styleStr?styleStr:"";
        //1.
        var existStr = "display:block !important;visibility:visible !important";
        if(styleStr.indexOf(existStr) != -1){
           $curDiv.remove(); //hide无效啊
        }

        //2.
        var normalSearchResultClass = "c-container";
        if($curDiv.hasClass(normalSearchResultClass) === false){
            $curDiv.hide();
        }

    }

}