if($('.touch').length>0)
{
    if(navigator.userAgent.match(/iPad/i) == null)
    {
        window.location.href = "m/";
    }
}


jQuery.easing.easeInOutBackLight = function (x, t, b, c, d , s) {
    if (s == undefined) s = 1.70158;
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return Math.pow( c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b , 0.2);
}


!!(function($) {

    var option = {
        onLoading  : function () {

        },
        deepSearch : true,
        minimumTime: 500,
        onComplete : function () {
        }
    }

    var imageCache = {};
    var imageCounter = 0;
    var imageLoadedNum = 0;
    var startTime = 0;
    var imgLoadFinished = function(){
        imageLoadedNum++;
        // show loading status
        option.onLoading( ~~ ( imageLoadedNum / imageCounter * 100 ) );
        if( imageLoadedNum == imageCounter ){
            var dur = new Date() - startTime;
            // complete all iamges
            dur > option.minimumTime ? option.onComplete() :
                setTimeout( function(){ option.onComplete() } , option.minimumTime - dur );
        }
    }
    var addImageForPreload = function( url ) {
        var image = $("<img />")
            .load( imgLoadFinished )
            ["error"]( imgLoadFinished )
            .attr( "src", url );
    };
    var findImageInElement = function (element) {
        var $el = $(element);

        if( $el.closest('.noload').length ) return;
        var url ;
        var bg = $el.css("background-image");
        var src = $el.attr('src');
        var match = null;
        if( bg != "none" ){
            bg = $.trim( bg );
            match = bg.match(/^url\((['"])([^'"]+)\1\)/);
            url = match ? match[2] : null;
        } else if ( src && element.nodeName.toLowerCase() == "img" ) {
            url = src;
        }

        if( url && !imageCache[ url ] ){
            imageCounter++;
            imageCache[ url ] = url + ( $.browser.msie && $.browser.version < 9 ? "?" + (+ new Date()) : '' );
        }
    }



    $.fn.queryLoader2 = function( opt ) {
        $.extend( option , opt || {} );

        imageLoadedNum = 0;

        this.each(function() {
            findImageInElement(this);
            if ( option.deepSearch == true ) {
                $(this).find("*:not(script)").each(function() {
                    findImageInElement(this);
                });
            }
        });

        // set start time
        startTime = + new Date();
        // preload image
        for (var url in imageCache ) {
            addImageForPreload( imageCache[url] );
        }

        return this;
    };

    // QR code
    $('.share_weixin').click(function(e){
        e.preventDefault();
        $('.overlay').fadeIn();
        $('.pop_qr').fadeIn().css('zIndex',121);
    });

    // Close popup
    $('.overlay,.step_log .step_back').click(function() {
        $('.overlay').fadeOut();
        $('.step_log').fadeOut();
    });

})(jQuery);




var animation_begins = {
    "resize-win":  function(){
        $(window).trigger('resize');
    },
    "show-sina": function(){
        this.show();
    }
}

var isUglyIe = $.browser.msie && $.browser.version <= 8;
var isMostUglyIe = $.browser.msie && $.browser.version <= 6 ;
// query loading
var loadComplete = function(){
    $('.loading').fadeOut(function(){
        /* for animation */
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
                if( isUglyIe && tarCss.opacity !== undefined ){
                    delete tarCss.opacity;
                }
                $dom.delay( delay )
                    .animate( tarCss , time , easing );
                if( begin ){
                    setTimeout(function(){
                        animation_begins[begin].call( $dom );
                    } , delay);
                }
            });
        if( !isMostUglyIe ){
            // init skrollr
            setTimeout(function(){
                skrollr.init({
                    smoothScrollingDuration: 600,
                    smoothScrolling:true,
                    easing: 'easeInOutQuart',
                    render: function(e){
                        if(e.curTop > 10000)
                        {
                            if($.browser.msie || $('html').hasClass('no-csstransforms3d'))
                            {
                                $('.product-cube-face1').fadeOut();
                                $('.product-cube-face2').fadeIn();
                            }
                            else
                            {
                                $('.product-cube').addClass('product-cube-3d');
                            }

                        }
                        else
                        {
                            if($.browser.msie || $('html').hasClass('no-csstransforms3d'))
                            {
                                $('.product-cube-face1').fadeIn();
                                $('.product-cube-face2').fadeOut();
                            }
                            else
                            {
                                $('.product-cube').removeClass('product-cube-3d');
                            }
                        }
                    }
                });
            } , 4000 );

        }
        
        // init second load animation
        $('.noload').removeClass('.noload')
        var $p2 = $('#p2');
        $(document.body).queryLoader2({
            minimumTime: 1000,
            onLoading: function( percentage ){
                $p2.css('width' , percentage + '%');
            },
            onComplete: function(){
                $('html,body').css('overflow-y','auto');
                $p2.fadeOut();
                // show page prev and page next navigater
                $('.page-nav-next').fadeIn();
            }
        });
    });
}
var $probar = $('#process-bar');
// query loading
$(document.body).queryLoader2({
    minimumTime: 1000,
    onLoading : function( percentage ){
        $probar.css( 'width' , percentage + '%' );
    },
    onComplete: loadComplete
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

$(window).resize(function(){
    if($(window).height() < 580)
    {
        $('.main-right').addClass('small-product');
    }
    else
    {
        $('.main-right').removeClass('small-product');
    }
});
$(window).trigger('resize');
if( !isMostUglyIe ){
    $(window)
        .resize(function(){
            var $models = $('#models');
            $models.width( $models.height() );

        });

    setTimeout(function(){
        window.scrollTo(0,0);
    } , 500 );
} else {
    // fix main-right
    var $right = $('.main-right');
    var rHeight = $right.height();
    var winHei = $(window).height();
    $(window).scroll(function(){
        var sTop = $(this).scrollTop();
        $right.stop(true , true ).animate({'top': sTop + winHei - rHeight } , 500);
    })
    .resize(function(){
        winHei = $(window).height();
    });
}



// for prev page and next page
var page_steps = [0 , 1318 , 3555 , 5500 , 7909 , 9368];
var nav_steps = [8 , 94 , 179 , 266 , 355];

$('.page-nav-next').click(function(){
    var scrollTop = $(window).scrollTop();
    var next_step = page_steps[page_steps.length-1] ;
    $.each(page_steps , function( i , step){
        if( scrollTop + 50 > step ){
            next_step = page_steps[i+1] || $(document).height();
        }
    });

    $('html,body').stop( true , true ).animate({
        scrollTop: next_step
    } , 2000 );
    return false;
});

// for navigater
$('.product-nav li').click(function(){
    var index = $(this).index();
    var tarScrollTop = page_steps[ index + 1 ];
    var tarNavTop = nav_steps[index];
    var currentNavTop = $('.product-circle-active').css('top');

    var time = 2000;
    $('html,body').stop(true,true)
        .animate({
            scrollTop: tarScrollTop
        } , time,function(){
        });
});

$('.product-bg-wrap li').hover(function(){
    if(!$(this).hasClass('skrollable-between'))
    {
        $(this).find('.product-light2 img').animate({opacity:1});
    }
},function(){
    $(this).find('.product-light2 img').animate({opacity:0},200);
});

$('.zoom-box').click(function(){
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



$('.playvideo').fancybox({
    maxWidth: 768,
    maxHeight: 432,
    type: 'iframe',
    iframe: {scrolling:'no'},
    openMethod : 'dropIn',
    padding: 0
});

(function ($, F) {
    F.transitions.dropIn = function() {
        var endPos = F._getPosition(true);
        endPos.opacity = 0;
        endPos.top = (parseInt(endPos.top, 10) - 400);
        F.wrap.css(endPos).show().animate({
            top: endPos.top + 400,
            opacity: 1
        }, {
            easing: 'easeOutQuart',
            duration: 800,
            complete: F._afterZoomIn
        });
    };

    F.transitions.dropOut = function() {
        F.wrap.removeClass('fancybox-opened').animate({
            top: '-=200'
        }, {
            duration: F.current.closeSpeed,
            complete: F._afterZoomOut
        });
    };

}(jQuery, jQuery.fancybox));


//tracking
$('.sina-share').bind('click',function(){
    ga('send', 'event', 'sina', 'follow', 'follow');
});

$('.product-bg li').eq(0).bind('click',function(){
    ga('send', 'event', 'PRO', '1', '1');
});

$('.product-bg li').eq(1).bind('click',function(){
    ga('send', 'event', 'PRO', '2', '2');
});

$('.product-bg li').eq(2).bind('click',function(){
    ga('send', 'event', 'PRO', '3', '3');
});

$('.product-bg li').eq(3).bind('click',function(){
    ga('send', 'event', 'PRO', '4', '4');
});

$('.product-bg li').eq(4).bind('click',function(){
    ga('send', 'event', 'PRO', '5', '5');
});

$('.tmall').bind('click',function(){
    ga('send', 'event', 'tmall', 'tmall', 'tmall');
});

$('.tmall-link').bind('click',function(){
    ga('send', 'event', 'tmall', 'tmall', 'tmall');
});