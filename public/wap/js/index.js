$(function(){

    InitBanners();

});
var myScroll;

function InitBanners(){
	var fi=$("#scroller ul").find("li").first();
	var li=$("#scroller ul").find("li").last();
	console.log(fi.html());
	$("#scroller ul").append("<li>"+fi.html()+"</li>");
	$("#scroller ul").prepend("<li>"+li.html()+"</li>");

	$("#scroller ul").css("width",624*$("#scroller ul").find("li").length+"px")
	$(".dotslist").empty();
	for(var i=0;i<$("#scroller ul").find("li").length;i++){
		$(".dotslist").append('<div class="dot"></div>');
	}
	$(".dotslist").find(".dot").first().hide();
	$(".dotslist").find(".dot").last().hide();

    myScroll = new IScroll('#scroller', { scrollX: true, scrollY: false,eventPassthrough:true,snap:"li",momentum:false});
	myScroll.goToPage(1,0,0);
	SetDot();
    myScroll.on("scrollEnd",function(){
		var ii=myScroll.currentPage.pageX;
		var totalpage=$("#scroller ul").find("li").length;
		if(ii==0){
			myScroll.goToPage(totalpage-2,0,0);
		}else if(ii==totalpage-1){
			myScroll.goToPage(1,0,0);
		}

		SetDot();


    });
}

function SetDot(){
        $(".dotslist .dot").removeClass("on");
        $(".dotslist").find(".dot").each(function(i){
            var ii=myScroll.currentPage.pageX;
            if(ii==i){
                $(this).addClass("on");

            }
        });
}