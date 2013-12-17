!!(function(){

    iniGlobal();
    iniNav();
    iniQA();

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
            skrollr.init({
                smoothScrollingDuration: 600,
                smoothScrolling:true,
                easing: 'easeInOutQuart'
            });
            $('.Intro').show();
        },4000);

//        $(window).scroll(function(){
//            console.log($(this).scrollTop());
//        });
    }

    function iniNav(){
        // for prev page and next page
        var page_steps = [0 , 1266 , 2014 , 2740 , 4345 , 5200];
        var nav_steps = [8 , 94 , 179 , 266 , 355];

        $('.nextIntor').click(function(){
            var scrollTop = $(window).scrollTop();
            var next_step = page_steps[page_steps.length-1] ;
            $.each(page_steps , function( i , step){
                if( scrollTop + 50 > step ){
                    next_step = page_steps[i+1] || $(document).height();
                }
            });
            console.log(next_step);

            $('html,body').stop( true , true ).animate({
                scrollTop: next_step
            } , 500 );
            return false;
        });
    }

    function iniQA(){
        $('.Intro6next').click(function(){
            $('.Intro6inner').animate({marginLeft:-311},500,'easeOutQuart');
            $('.Intro6prev').fadeIn();
            $('.Intro6next').fadeOut();
        });
        $('.Intro6prev').click(function(){
            $('.Intro6inner').animate({marginLeft:0},500,'easeOutQuart');
            $('.Intro6next').fadeIn();
            $('.Intro6prev').fadeOut();
        });
    }


})();

