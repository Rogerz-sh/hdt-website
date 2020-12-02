$(function(){
   $(".navigation").bind("click",function(){
      $(this).toggleClass("on");
   });

   $("#btnfocuswx").bind("click",function(){
   		$(".wxfloat").fadeIn(500,function(){
   			$(this).unbind("click").bind("click",function(){
   				$(this).fadeOut();
   				return false;
   			});
   		});
   });
});