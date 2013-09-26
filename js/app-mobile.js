if(navigator.userAgent.match(/iPad/i) != null)
{
    $(window).on('orientationchange', function(){
        if(window.orientation == 90 || window.orientation == -90)
        {
            $('body').addClass('ipadturn');
            $('.wrap').hide();
        }
        else
        {
            $('body').removeClass('ipadturn');
            $('.wrap').show();
        }
    });
    $(window).trigger('orientationchange');
}

jQuery.easing.easeInOutBackLight = function (x, t, b, c, d , s) {
    if (s == undefined) s = 1.70158;
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return Math.pow( c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b , 0.2);
}

var animation_begins = {
    "resize-win":  function(){
        $(window).trigger('resize');
    }
}
 /* for header animation */
var ANIMATE_NAME = "data-animate";
$('[' + ANIMATE_NAME + ']')
    .each(function(){
        var $dom = $(this);
        var tar = $dom.data('animate');
        var time = parseInt( $dom.data('time') );
        var delay = $dom.data('delay') || 0;
        var easing = $dom.data('easing');
        var begin = $dom.data('begin');
        tar = tar.split(';');
        var tarCss = {} , tmp;
        for (var i = tar.length - 1; i >= 0; i--) {
            tmp = tar[i].split(':');
            if( tmp.length == 2 )
                tarCss[ tmp[0] ] = $.trim(tmp[1]);
        }
        $dom.delay( delay )
            .animate( tarCss , time , easing );
        if( begin ){
            setTimeout(function(){
                animation_begins[begin].call( $dom );
            } , delay);
        }
    });


// init tangle color for cream
var initTangleColorTimer = null;
function initTangleColor (){
    clearTimeout( initTangleColorTimer );
    initTangleColorTimer = setTimeout(function(){
        var $mainRight = $('.main-right');
        var bottomOffset = $mainRight.removeClass('rotate-right')
            .find('.main-right-bottom')
            .offset();
        $mainRight.find('.product i')
            .each(function(){
                var off = $(this).offset();
                $(this).toggleClass('reverse' , off.top > bottomOffset.top );
            });
        $mainRight.addClass('rotate-right');
    } , 100);
}

// for prev page and next page
var page_steps = [0 , 630 , 2040 , 3357 , 4641 , 5974 , 7248];



$('.page-nav-next').click(function(){
    var scrollTop = $(window).scrollTop();
    var next_step = page_steps[page_steps.length-1] ;
    $.each(page_steps , function( i , step){
        if( scrollTop + 50 > step ){
            next_step = page_steps[i+1] || $(document).height();
        }
    });

    skrollr.setStyle($('#skrollr-body'), 'transform', 'translate(0, ' + -(next_step) + 'px) ' + 'translateZ(0px)');
    return false;
});

// for navigater
$('.product-1 li').click(function(){
    var index = $(this).index();
    var tarScrollTop = page_steps[ index + 2 ];
    var currScrollTop = $(window).scrollTop();

    var time = 2000;
    $('#skrollr-body').stop( true , true )
        .animate({
            scrollTop: tarScrollTop
        } , time);
});


$('#footer .share').click(function(){
    $('#sns-share-wrap-overlay').fadeIn();
    $('#sns-share-wrap').fadeIn();
});

$('#sns-share-wrap .close').click(function(){
    $('#sns-share-wrap-overlay').fadeOut();
    $('#sns-share-wrap').fadeOut();
});

$('#sns-share-wrap-overlay').click(function(){
    $('#sns-share-wrap .close').click();
    $('.share_menu').removeClass('open');
    $('.share_menu').animate({'top':'-100%'});
});

$('.zoom').click(function(){
    if($(this).find('img').eq(1).css('display') == 'none')
    {
        $(this).find('img').eq(1).fadeIn();
        $(this).find('.tip').fadeIn();
        $(this).find('.tip2').fadeOut();
        $(this).find('.tip3').fadeIn();
    }
    else
    {
        $(this).find('img').eq(1).fadeOut();
        $(this).find('.tip2').fadeIn();
        $(this).find('.tip').fadeOut();
        $(this).find('.tip3').fadeOut();
    }
});

var hideHeaderTimeout;
var hideHeader = function(){
    hideHeaderTimeout = setTimeout(function(){
        if(!$('.share_menu').hasClass('open'))
        {
            $('.header').animate({'top':-80},function(){
                $('.header').addClass('close');
                $('.header .logo').css('bottom',0).find('img').height(30);
            });
        }
    },5000);
}
var quickHideHeader = function(){
    if(!$('.share_menu').hasClass('open') || !$('.header').hasClass('close'))
    {
        $('.header').addClass('close');
        $('.header').css({'top':-80});
        $('.header').addClass('close');
        $('.header .logo').css('bottom',0).find('img').height(30);
        $('.top-menu-link').css('bottom',0).find('img').height(30);
    }
}

var showHeader = function(){
    if($('.header').hasClass('close'))
    {
        $('.header').css({'top':0});
        $('.header').removeClass('close');
        $('.header .logo').css('bottom',15).find('img').height(81);
        $('.top-menu-link').css('bottom',22).find('img').height(75);
    }
}
$('.header').click(function(){
    showHeader();
    //hideHeader();
});

$('.top-menu-link').click(function(){
    if($('.share_menu').hasClass('open'))
    {
        $('.share_menu').removeClass('open');
        $('.share_menu').animate({'top':'-100%'});
        $('#sns-share-wrap-overlay').fadeOut();
    }
    else
    {
        $('.share_menu').addClass('open');
        $('.share_menu').animate({'top':120});
        $('#sns-share-wrap-overlay').fadeIn();
    }
});

var fadeVideoText = function(){
    $('.video_text').fadeIn(function(){
        $(this).delay(400).fadeOut(
            function(){
                fadeVideoText();
            }
        );
    })
};
fadeVideoText();


$('.playvideo').fancybox({
    width: 600,
    height: 338,
    type: 'iframe',
    iframe: {scrolling:'no'},
    padding: 0
});

var needChange
$(window)
    .scroll(initTangleColor)
//    .scroll(function(){
//            console.log($(this).scrollTop());
//        })
    .resize(initTangleColor);
    setTimeout(function(){
        s = skrollr.init({
            smoothScrollingDuration: 400,
            smoothScrolling:true,
            easing: 'easeOutQuart',
            forceHeight: 'false',
            render: function(e){
                if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
                    if(e.curTop + 80 > e.maxTop)
                    {
                        $('#footer').fadeIn();
                    }
                    else
                    {
                        $('#footer').fadeOut();
                    }

                    if(e.curTop > 500)
                    {
                        quickHideHeader();
                    }
                    if(e.curTop < 400)
                    {
                        showHeader();
                    }
                }
            }
        });

        skrollr.menu.init(s, {
            //skrollr will smoothly animate to the new position using `animateTo`.
            animate: true,

            //The easing function to use.
            easing: 'sqrt',

            //How long the animation should take in ms.
            duration: function(currentTop, targetTop) {
                //By default, the duration is hardcoded at 500ms.
                return 500;

                //But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
                //return Math.abs(currentTop - targetTop) * 10;
            }
        });

    } , 50 );

if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    $('#footer').css({'position': 'fixed','bottom':0,'display': 'none'});
    $('#footer').appendTo('body');
}