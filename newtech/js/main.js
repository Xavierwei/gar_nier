!!(function(){

    var isUglyIe6 = $.browser.msie && $.browser.version == 6;
    if(!isUglyIe6) {
        iniGlobal();
    }
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
        var page_steps = [0 , 1166 , 1914 , 3040 , 4345 , 5200];
        var menu_steps = [0 , 1166 , 1914 , 5100];
        // for prev page and next page
        $('.nextIntor').click(function(){
            var scrollTop = $(window).scrollTop();
            var next_step = page_steps[page_steps.length-1] ;
            $.each(page_steps , function( i , step){
                if( scrollTop + 50 > step ){
                    next_step = page_steps[i+1] || $(document).height();
                }
            });

            $('html,body').stop( true , true ).animate({
                scrollTop: next_step + 100
            } , 1000 );


            return false;
        });

        $('.menu li').click(function(){
            var index = $.inArray(this,$('.menu li'));
            var next_step = menu_steps[index] ;
            if(next_step != 0) {
                next_step = next_step + 100;
            }
            $('html,body').stop( true , true ).animate({
                scrollTop: next_step
            } , 1000 );
            $('.menu li').removeClass('menu_itemon');
            $(this).addClass('menu_itemon');
            $('.menu_tit').fadeOut();
            $('.menu_tit').eq(index).fadeIn();
            return false;
        });

        $('.menu li').hover(function(){
            var index = $.inArray(this,$('.menu li'));
            $('.menu_tit').eq(index).css({right:-200,display:'block'}).animate({right:6},300);
            return false;
        },function(){
            var index = $.inArray(this,$('.menu li'));
            var menuIndex =$('.menu li').index($('.menu_itemon'));
            if(index != menuIndex) {
                $('.menu_tit').eq(index).fadeOut();
            }
            return false;
        });

        $('.ie6next').click(function() {
            var top = $(this).parents('.Intro').next().position().top;
            $('html,body').animate({scrollTop:top});
        });

        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            var currentstep = $('body').data('currentstep');
            $.each(menu_steps , function( i , step){
                if( scrollTop + 100 > step ){
                    menu_step = i;
                }
            });
            if(currentstep != menu_step) {
                $('.menu li').removeClass('menu_itemon');
                $('.menu li').eq(menu_step).addClass('menu_itemon');
                $('.menu_tit').fadeOut();
                $('.menu_tit').eq(menu_step).stop().fadeIn();
                $('body').data('currentstep',menu_step);
            }

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

        $('.Intro6AText').jScrollPane({autoReinitialise:true});
    }


})();

