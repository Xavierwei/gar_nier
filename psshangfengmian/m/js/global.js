/**
 * photowall js for psshangfengmian
 */
!!(function(){

    init();
    function init() {
        $('.navtit').click(function() {
            showMenu();
            if($('.navlist').css('display') != 'block') {
                showNav();
            }
            else {
                hideNav();
            }
        });

        $(window).scroll(function() {
            var scrollTop = $(window).scrollTop();
            console.log(scrollTop);
            if(scrollTop > 500) {
                if(!$('.header').hasClass('close')) {
                    hideMenu();
                    hideNav();
                }
            }
            else {
                if($('.header').hasClass('close')) {
                    showMenu();
                }
            }
        });
    }

    function hideNav() {
        $('.navlist').animate({opacity:0},500,'ease',function(){
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


})();