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
            var _this = this;
            var winH=$(window).height();
            $('.main').height(winH - 114)
        }
    };

    $(document).ready(function ($) {
        Index.init();
    });
    $(window).resize(function(){
        Index.reSize();
    })
})(jQuery);
