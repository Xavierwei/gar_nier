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
                    smoothScrollingDuration: 200,
                    smoothScrolling:true,
                    easing: {
                        curvas: function(p) {
                            return p*p;
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

if( !isMostUglyIe ){
    $(window)
        .scroll(initTangleColor)
        .resize(initTangleColor)
        .scroll(function(){
            location.hash="#" + $(this).scrollTop();
        })
        // resize for models element width
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
var page_steps = [0 , 1027 , 3482 , 5513 , 7505 , 9113];
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
$('.product-bg-wrap li').click(function(){
    var index = $(this).index();
    var tarScrollTop = page_steps[ index + 1 ];
    var tarNavTop = nav_steps[index];
    var currentNavTop = $('.product-circle-active').css('top');

    var time = 2000;
    $('html,body').stop(true,true)
        .animate({
            scrollTop: tarScrollTop
        } , time,function(){
            $('.product-circle-active2').hide();
            $('.product-circle-active').show();
            $('.product-bg-wrap li span').removeClass('moving');
            $('.product-bg-wrap li span').removeClass('active');
            $('.product-bg-wrap i').show();
        });
    $('.product-circle-active').hide();
    $('.product-circle-active2').show().css({top:currentNavTop});
    $('.product-circle-active2').stop(true,true).animate({top:tarNavTop});
    $('.product-bg-wrap li span').addClass('moving');
    $('.product-bg-wrap li').eq(index).find('span').addClass('active');
    $('.product-bg-wrap i').hide();
});


// init tmll
$('.tmall').hover(function(){
    $(this).animate({
        top: 93,
        right: 0
    } , 300 );
} , function(){
    var sTop = $(window).scrollTop();
    if( sTop > 1000 ){
        $(this).animate({
            top: 78,
            right: -76
        } , 300 );
    }
});

if($('.touch').length>0)
{
    window.location.href = "m/";
}


