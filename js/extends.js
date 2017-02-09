    /**
 * Created by wdd on 2017/2/7.
 */
$(function() {
    var hideSuper = true;
    var hideSubC = true;
    var subId=null;
    var itemArr = [];
    $(".arrow").bind("click", function () {
        if ($("#guideList").is(":animated")) return;
        var mt = parseInt($("#guideList").css("marginTop")), tomt;
        if ($(this).hasClass("uparrow")) {
            tomt = mt + 101 >= 0 ? 0 : mt + 101;
            $("#guideList").animate({"margin-top": tomt + "px"}, 300);
        } else if ($(this).hasClass("downarrow")) {
            var limitMT = $("#guideList").height() - $("#slidewrap").height();
            tomt = mt - 101 < -limitMT ? -limitMT : mt - 101;
            $("#guideList").animate({"margin-top": tomt + "px"}, 300);
        }
    });
    $("#guideList").hover(function () {
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc);
        }
        window.onmousewheel = document.onmousewheel = scrollFunc;
    }, function () {
        if (document.removeEventListener) {
            document.removeEventListener('DOMMouseScroll', scrollFunc);
        }
        window.onmousewheel = document.onmousewheel = "";
    });
    $("#guideList li").hover(function(){
        hideSubC = false;
        subId = $(this).attr("dataName");
        if(subId == 'allMenu'){
            return;
        }
        showSub($(this));
    },function(){
        hideSubC = true;
        subId = $(this).attr("dataName");
        if(subId == 'allMenu'){
            return;
        }
        setTimeout(function(){
            if(hideSubC && hideSuper) {
                hideSub();
            }
        },200);
    });

    $('.sub-layout').hover(function(){
        hideSuper = false;
    },function(){
        hideSuper = true;
        if(hideSubC && hideSuper){
            hideSub();
        }
    });

    function showSub(item){
        var superL = item.offset().left,
            superT = item.children("a").offset().top,//高度用a标签来计算，因为要与a标签对其
            superW = item.width(),
            superH = item.height(),
            ot = item.position().top,ft =29,
            t = 0;
        showSubLayer = true;
        if(itemArr.indexOf($("#"+subId)) < 0){
            itemArr.push($("#"+subId));
        }
        for(var i=0;i<itemArr.length;i++){
            itemArr[i].addClass('none');
        }


        $("#"+subId).removeClass("none");

        $('.sub-layout').removeClass("none");

        var mT = superT-200+superH;
        if(100+mT+$('.sub-layout').height() > window.innerHeight){
            mT = window.innerHeight - 100 - $('.sub-layout').height();
        }
        $('.sub-layout').css({
            left:superL + superW +"px",
            top:mT+ "px"
        });
    }

    function hideSub(){
        $('.sub-layout').addClass("none");
        $("#"+subId).addClass("none");
    }

    function scrollFunc(e){
        e = e || window.event;
        var delta = e.wheelDelta ? e.wheelDelta : e.detail;
        if(parseInt(delta)<0){
            if(e.wheelDelta){
                $(".downarrow").click();
            }else{
                $(".uparrow").click();
            }
        }else{

            if(e.wheelDelta){
                $(".uparrow").click();
            }else{
                $(".downarrow").click();
            }
        }
    }
    $("#allenuM").addClass("none");

    // var hideSub = true;

    $("#allenuMLi").hover(function() {
        // hideSub = false;
    }, function() {
        hideSub = true;
        setTimeout(function() {
            $("#allMenu").addClass("none");
        }, 200);
    });
    $("#allMenu").hover(function() {
        $("#allMenu").removeClass("none");
        $(".menuwrap").mCustomScrollbar("update");
    }, function() {
        setTimeout(function() {
            if (hideSub)
                $("#allMenu").addClass("none");
        }, 200);
    });

})