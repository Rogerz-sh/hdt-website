$(function(){
    InitEarth();
});

var showindex=0;
var minindex=-1;
var maxindex=1;
var rot=9;
var startx=0;
var cx=0;

function InitEarth(){
    TweenMax.to($(".areawrapper"),0,{rotation:0});

    $(".earthwrapper").unbind("mousedown").bind("mousedown",onDown);
    $(".earthwrapper").unbind("mouseup").bind("mousemove",onMove);
    $(".earthwrapper").unbind("mouseup").bind("mouseup",onUp);

    $(".earthwrapper")[0].addEventListener("touchstart",onDown,false);
    $(".earthwrapper")[0].addEventListener("touchmove",onMove,false);
    $(".earthwrapper")[0].addEventListener("touchend",onUp,false);

    $(".citywrapper:first").show();
}


function onDown(e){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if(e.touches){
        startx= e.touches[0].clientX;
    }else{
        startx= e.clientX;
    }


}

function onMove(e){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();

    if(e.touches){
        cx= e.touches[0].clientX;
    }else{
        cx= e.clientX;
    }
}

function onUp(e){
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();


    if(Math.abs(cx-startx)>=50){
        if(cx<startx){
            RotateLeft();
        }else{
            RotateRight();
        }
    }

}



function RotateLeft(){
    if(showindex>minindex){
        showindex--;
        TweenMax.to($(".areawrapper"),0.3,{rotation:showindex*rot,onComplete:onRotateEnd});
    }
}



function RotateRight(){
    if(showindex<maxindex){
        showindex++;
        TweenMax.to($(".areawrapper"),0.3,{rotation:showindex*rot,onComplete:onRotateEnd});
    }
}


function onRotateEnd(){
    console.log(showindex);
    $(".citywrapper").hide();
    $(".areawrapper").find(".area").each(function(i){
       if(i-1==-1*showindex){
           $(this).addClass("on");
           var cty=$(this).attr("city");
           $(".citywrapper[city="+cty+"]").fadeIn();
       }else{
           $(this).removeClass("on");
       }

    });
}