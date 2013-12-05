/**
 *
 * User: zx
 * Date: 13-11
 */
(function ($) {
    var Index={
        /**
         * 初始化方法,用于功能函数的入口
         * @param {string}
         * @example
         **/
        init:function(){
            //绑定事件
            this.reSize();
        },
        /**
         * 窗体变化
         * @param {string}
         * @example
         **/
        reSize:function(){
            var winH=$(window).height();
            if(winH<620) {
                $('body').addClass('below1024');
                $('#step1_flash_player').attr('height',490);
            } else {
                $('body').removeClass('below1024');
                $('#step1_flash_player').attr('height',551);
            }
        }
    };

    $(document).ready(function ($) {
        if($('body').hasClass('home_page')) {
            Index.init();
        }
    });
    $(window).resize(function(){
        if($('body').hasClass('home_page')) {
            Index.reSize();
        }
    })
})(jQuery);
