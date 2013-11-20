!!(function(){

    iniGlobal();

    function iniGlobal() {
        getCurrentUserInfo();
        getSNSLinks();
        getFriends();
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
            //TODO:$('.pop_login').find('.step_log_tit').html('请选择一种社交账号登录');
            $('.overlay').fadeIn();
            $('.pop_login').fadeIn().css('zIndex',121);
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
                $('.overlay,.cover_pop').fadeIn();
                $('#pop_voted_failed').show();
                $('.failed_text').hide();
                $('#pop_voted_failed .failed_text3').show();
                setTimeout(function(){
                    $('.overlay').trigger('click');
                },2000);
            });
        });

        // Close popup
        $('.cover_pop_close,.overlay,.step_log .step_back').click(function() {
            $('.overlay').fadeOut();
            $('.cover_pop').fadeOut();
            $('.step_log').fadeOut();
        });

        $('.other_rule,.step_join_rule').click(function(e){
            e.preventDefault();
            $('.overlay').fadeIn();
            $('.pop_rule').fadeIn().css('zIndex',121);
        });

        // select frineds
        $('body').on('click','#friend_list li', function() {
            if(!$(this).hasClass('selected')) {
                $(this).addClass('selected');
                var name = $(this).find('.name').html();
                var body = $('#share_body').val();
                $('#share_body').val(body + ' @' + name);
            }
            else {
                $(this).removeClass('selected');
                var name = $(this).find('.name').html();
                var body = $('#share_body').val();
                body = body.replace(' @'+name,'');
                $('#share_body').val(body);
            }
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

    // getLoginUrl
    function getFriends() {
        $.ajax({
            type: "GET",
            url: "web/index.php?r=user/friends",
            dataType: 'json',
            cache: false,
            success: function(data){
                if(data.data.users) {
                    var template = Handlebars.compile($('#friend_item').html());
                    var result = template(data.data);
                    $('#friend_list').append(result);
                    $('.friend_list_wrap').jScrollPane();
                }
            },
            error: function(xhr, errorType, error) {
            }
        });
    }
})();

