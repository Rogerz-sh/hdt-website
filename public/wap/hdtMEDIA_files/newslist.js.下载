

$(function(){

    InitBanners();

});
var myScroll;

function InitBanners(){



    var imglen=$("#scroller li").length;
    $("#scroller ul").css("width",imglen*616);
    $(".dotslist").empty();
    for(var i=0;i<imglen;i++){
        if(i==0){
            $(".dotslist").append('<div class="dot on"></div>');
        }else{
            $(".dotslist").append('<div class="dot"></div>');
        }
    }

    myScroll = new IScroll('#scroller', { scrollX: true, scrollY: false,eventPassthrough:false,snap:"li",momentum:false});
    myScroll.on("scrollEnd",function(){
        $(".dotslist .dot").removeClass("on");
        $(".dotslist").find(".dot").each(function(i){
            var ii=myScroll.currentPage.pageX;
            if(ii==i){
                $(this).addClass("on");
                $(".newslist").children(".newsbrief").eq(i).show();

            }else{
                $(".newslist").children(".newsbrief").eq(i).hide();

            }
        });



    });
	var showindex=0;
	var str = location.href;
	var num = str.indexOf("#");
	var p=0;
	if(num>=0){
		var arrtmp = str.split("#");
		p=parseInt(arrtmp[arrtmp.length-1]);

	}



	if(p&&parseInt(p)>0){
		$("#scroller ul").find("li").each(function(i){
			
			var tid=parseInt($(this).attr("did"));
			if(p==tid){
				showindex=i;
			
			}
		
		});



	
	}

	console.log(showindex);
	if(showindex>0){
		myScroll.goToPage(showindex,0,0);
		$(".dotslist .dot").removeClass("on");
        $(".dotslist").find(".dot").each(function(i){
            var ii=showindex;
            if(ii==i){
                $(this).addClass("on");
                $(".newslist").children(".newsbrief").eq(i).show();

            }else{
                $(".newslist").children(".newsbrief").eq(i).hide();

            }
        });
	}

    $(".newslist").children(".newsbrief").eq(showindex).show();
}