/**
 * @desc: application for garnier
 * @date: 
 * @author: hdg1988@gmail.com
 */
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

var needChange
$(window)
    .scroll(initTangleColor)
    .scroll(function(){
        location.hash="#" + $(this).scrollTop();
    })
    .resize(initTangleColor);
setTimeout(function(){
    skrollr.init({
        smoothScrollingDuration: 400,
        smoothScrolling:true,
        easing: 'easeOutQuart',
        forceHeight: true
    });

} , 50 );

