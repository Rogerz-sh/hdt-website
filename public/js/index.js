var winsize = 0;
var totalbanner = 0;
var showindex = 0;
var enableroll = false;
var nbannerwidth = 0;
var autorolltimer = 0;


$(function () {

    SetBanner();
    $(window).bind("resize", function () {
        SetBanner();
    });


    InitBanner();
    InitNewsBanner();
    autorolltimer = setTimeout(AutoRoll, 5000);

    setTimeout(SetBanner, 1000);
});



function SetBanner() {

    winsize = $(window).width() > 1200 ? $(window).width() : 1200;
    nbannerwidth = $(".newsbanner").width();

    $(".indexbanner .allimgs .banner").css("width", winsize);
    $(".indexbanner .allimgs").css("width", winsize * ($(".indexbanner .allimgs .banner").length + 2));
    //$(".indexbanner .allimgs").css("margin-left",-1*(showindex+1)*winsize);
    $(".indexbannercontrol").css("margin-top", $(".indexbanner").height() - 50);
}

function InitBanner() {
    totalbanner = $(".indexbanner .allimgs .banner").length;
    $(".indexbanner .allimgs .banner").hide();


    showindex = 1;
    enableroll = true;

    $(".indexbanner .allimgs .banner:nth-child(1)").show();

    $('.indexbannercontrol').delegate('.dot', 'click', function () {
        var index = $(this).data('index');
        if (enableroll) {
            enableroll = false;
            $(".indexbanner .allimgs .banner:nth-child(" + showindex + ")").fadeOut("slow", function () {
                showindex = index;
                $(".indexbanner .indexbannercontrol .dot:nth-child(" + showindex + ")").addClass('on').siblings().removeClass('on')
                $(".indexbanner .allimgs .banner:nth-child(" + showindex + ")").fadeIn("slow", function () {
                    enableroll = true;
                    autorolltimer = setTimeout(AutoRoll, 5000);
                });
            });
            clearTimeout(autorolltimer);
        }
    })

    $("#bannerleft").bind("click", function () {
        if (enableroll) {
            enableroll = false;
            $(".indexbanner .allimgs .banner:nth-child(" + showindex + ")").fadeOut("slow", function () {
                showindex--;
                if (showindex < 1) {
                    showindex = totalbanner;
                }
                $(".indexbanner .allimgs .banner:nth-child(" + showindex + ")").fadeIn("slow", function () {
                    enableroll = true;
                    autorolltimer = setTimeout(AutoRoll, 5000);
                });
            });

            clearTimeout(autorolltimer);
        }

        return false;
    });

    $("#bannerright").bind("click", function () {
        if (enableroll) {
            enableroll = false;
            $(".indexbanner .allimgs .banner:nth-child(" + showindex + ")").fadeOut("slow", function () {
                showindex++;
                if (showindex > totalbanner) {
                    showindex = 1;
                }
                $(".indexbanner .allimgs .banner:nth-child(" + showindex + ")").fadeIn("slow", function () {
                    enableroll = true;
                    autorolltimer = setTimeout(AutoRoll, 5000);
                });
            });

            clearTimeout(autorolltimer);
        }

        return false;
    });
}


function AutoRoll() {
    // $("#bannerright").click();
    if (enableroll) {
        enableroll = false;
        $(".indexbanner .allimgs .banner:nth-child(" + showindex + ")").fadeOut("slow", function () {
            showindex++;
            if (showindex > totalbanner) {
                showindex = 1;
            }
            $(".indexbanner .indexbannercontrol .dot:nth-child(" + showindex + ")").addClass('on').siblings().removeClass('on')
            $(".indexbanner .allimgs .banner:nth-child(" + showindex + ")").fadeIn("slow", function () {
                enableroll = true;
                autorolltimer = setTimeout(AutoRoll, 5000);
            });
        });
        clearTimeout(autorolltimer);
    }

}


//=========================================

var totalnewsbanner = 0;


function InitNewsBanner() {
    totalnewsbanner = $("#allnewsbanner .nbanner").length;
    $("#dots").empty();
    for (var i = 1; i <= totalnewsbanner; i++) {
        var color = i == 1 ? "blue" : "gray";
        $("#dots").append('<a href="#" class="dot ' + color + '" nid=' + i + '></a>');
    }
    $(".nbanner").css("width", nbannerwidth);
    $("#allnewsbanner").css("width", totalnewsbanner * nbannerwidth);
    ShowLabel(0);

    $("#dots .dot").bind("click", function () {
        var ii = $(this).attr("nid") - 1;
        $("#allnewsbanner").animate({ "marginLeft": -1 * ii * nbannerwidth }, 300, function () {
            ShowLabel(ii);
        });
        $("#dots .dot").removeClass("blue");
        $(this).addClass("blue");

        $("#allnewsbanner .newlabel").hide();

        return false;
    });
}

function ShowLabel(n) {
    $("#allnewsbanner").find(".nbanner").each(function (i) {

        if (i == n) {
            $(this).find(".newlabel").show();
        } else {

            $(this).find(".newlabel").hide();
        }
    });
}