$(function(){

    InitBanners();

});
var myScroll;

function InitBanners(){
    var imglen=$("#scroller li").length;
    $(".dotslist").empty();
    for(var i=0;i<imglen;i++){
        if(i==0){
            $(".dotslist").append('<div class="dot on"></div>');
        }else{
            $(".dotslist").append('<div class="dot"></div>');
        }
    }
	$("#scroller ul").css("width",640*imglen+"px");

    myScroll = new IScroll('#scroller', { scrollX: true, scrollY: false,eventPassthrough:true,snap:"li",momentum:false});
    myScroll.on("scrollEnd",function(){
        $(".dotslist .dot").removeClass("on");
        $(".dotslist").find(".dot").each(function(i){
            var ii=myScroll.currentPage.pageX;
            if(ii==i){
                $(this).addClass("on");

            }
        });



    });
}