$(document).ready(function(){

    iniGlobal();


    function iniGlobal() {
        /* for animation */
        var isUglyIe = $.browser.msie && $.browser.version <= 8;
        if(isUglyIe && $('#scheme').length > 0)
            return;
        var ANIMATE_NAME = "data-animate";
        $('[' + ANIMATE_NAME + ']')
            .each(function(){
                var $dom = $(this);
                var tar = $dom.data('animate');
                var browser = $dom.data('browser');
                var style = $dom.data('style');
                var time = parseInt( $dom.data('time') );
                var delay = $dom.data('delay') || 0;
                var easing = $dom.data('easing');
                var begin = $dom.data('begin');
                tar = tar.split(';');
                var tarCss = {} , tmp;
                if(browser == 'uglyie' && isUglyIe) {
                    return;
                }
                for (var i = tar.length - 1; i >= 0; i--) {
                    tmp = tar[i].split(':');
                    if( tmp.length == 2 )
                        tarCss[ tmp[0] ] = $.trim(tmp[1]);
                }
                if( isUglyIe && tarCss.opacity !== undefined ){
                    delete tarCss.opacity;
                }


                style = style.split(';');
                var styleCss = {} , tmp;
                for (var i = style.length - 1; i >= 0; i--) {
                    tmp = style[i].split(':');
                    if( tmp.length == 2 )
                        styleCss[ tmp[0] ] = $.trim(tmp[1]);
                }
                if( isUglyIe && styleCss.opacity !== undefined ){
                    delete styleCss.opacity;
                }
                $dom.css(styleCss).delay( delay )
                    .animate( tarCss , time , easing );
                if( begin ){
                    setTimeout(function(){
                        animation_begins[begin].call( $dom );
                    } , delay);
                }
            });

        setTimeout(function(){
            s = skrollr.init({
                smoothScrollingDuration: 400,
                smoothScrolling:true,
                easing: 'easeOutQuart',
                forceHeight: 'false',
                render: function(e){
                    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {

                        if(e.curTop > 500)
                        {
                            hideMenu();
                            hideNav();
                        }
                        if(e.curTop < 400)
                        {
                            showMenu();
                        }
                    }
                }
            });
        },50);
    }

    $('.navtit').click(function() {
        showMenu();
        if($('.navlist').css('display') != 'block') {
            showNav();
        }
        else {
            hideNav();
        }
    });

    function hideNav() {
        $('.navlist').animate({opacity:0},500,function(){
            $(this).hide();
        })
    }

    function showNav() {
        $('.navlist').css({display:'block',opacity:0}).animate({opacity:1});
    }

    function hideMenu() {
        $('.header').addClass('close');
        $('.header .logo').height(37).css('top',5);
        $('.header .tmall').height(49);
        $('.header .navtit').height(40).css('top',3);
        $('.header').height(49);
    }

    function showMenu() {
        $('.header').removeClass('close');
        $('.header .logo').height(84).css('top',20);
        $('.header .tmall').height(118);
        $('.header .navtit').height(70).css('top',20);
        $('.header').height(118);
    }



    $(window).scroll(function(){
            console.log($(this).scrollTop());
        });

    $('.Intro6QAWrap').bxSlider({'pager':false});
});