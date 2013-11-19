!!(function(){

    iniGlobal();

    function iniGlobal() {
        getCurrentUserInfo();
        getSNSLinks();
        bindGlobalEvents();
    }

    function bindGlobalEvents() {
        // Fill user info
        $('.link_fillinfo').click(function(e) {
            e.preventDefault();
            $('.pop_box').hide();
            $('#pop_fillinfo').show();
            $('.pop_fillinfo').fadeIn().css('zIndex',101);
        });

        // Register
        $('.link_register,.link_login').click(function(e) {
            e.preventDefault();
            $('.pop_login').find('.step_log_tit').html('请选择一种社交账号登录');
            $('.overlay').fadeIn();
            $('.pop_login').fadeIn().css('zIndex',101);
            $.cookie('last_page', $('body').data('page'));
        });

        // Logout
        $('.link_logout').click(function(e) {
            e.preventDefault();
            logout(function(){
                $('#login_logined').fadeOut(400);
                $('#login_nologin').delay(400).fadeIn();
                $('.link_my').fadeOut();
                $('.link_fillinfo').fadeOut();
            });
        });

        // Close popup
        $('.cover_pop_close,.overlay,.step_log .step_back').click(function() {
            $('.overlay').fadeOut();
            $('.cover_pop').fadeOut();
            $('.step_log').fadeOut();
        });


    }

    // Logout
    function logout(success) {
        $.ajax({
            type: "GET",
            url: "web/index.php?r=user/logout",
            dataType: 'json',
            cache: false,
            success: function(){
                success();
            },
            error: function(xhr, errorType, error) {
            }
        });
    }

    // getCurrentUserInfo
    function getCurrentUserInfo() {
        $.ajax({
            type: "GET",
            url: "web/index.php?r=user/userinfo",
            dataType: 'json',
            cache: false,
            success: function(data){
                if(data.error == null) {
                    user = data.data;
                    $('.login').fadeIn();
                    $('#login_logined').fadeIn();
                    $('#login_logined .nickname,.reg_nickname').html(user.nickname);
                    $('.val_nickname').val(user.nickname);
                    $('.link_my').fadeIn();
                    if(!user.email) {
                        $('.link_fillinfo').fadeIn();
                    }
                }
                else
                {
                    $('.login').fadeIn();
                    $('#login_nologin').fadeIn();
                }
            },
            error: function(xhr, errorType, error) {
            }
        });
    }

    // getLoginUrl
    function getSNSLinks() {
        $.ajax({
            type: "GET",
            url: "web/index.php?r=user/snslinks",
            dataType: 'json',
            cache: false,
            success: function(data){
                $('.tencent_url').attr('href',data.data.tencent);
                $('.weibo_url').attr('href',data.data.weibo);
                $('.renren_url').attr('href',data.data.renren);
            },
            error: function(xhr, errorType, error) {
            }
        });
    }
})();

