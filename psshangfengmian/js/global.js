!!(function(){

    iniGlobal();

    function iniGlobal() {
        getCurrentUserInfo();
        getSNSLinks();
        getFriends();
        bindGlobalEvents();
    }

    function bindGlobalEvents() {
        //check if mobile
        if($('html').hasClass('touch')) {
            window.location.href="m/index.html";
        }
        // Fill user info
        $('.link_fillinfo').click(function(e) {
            e.preventDefault();
            $('.pop_box').hide();
            $('#pop_fillinfo').show();
            $('.overlay').fadeIn();
            $('.pop_fillinfo').fadeIn().css('zIndex',121);
        });

        // Register
        $('.link_register,.link_login').click(function(e) {
            e.preventDefault();
            //TODO:$('.pop_login').find('.step_log_tit').html('请选择一种社交账号登录');
            $('.overlay').fadeIn();
            $('.pop_login').fadeIn().css('zIndex',121);
            $.cookie('last_page', $('body').data('page'), { expires: 7, path: '/' });
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
            $('.pop_rule').css({'zIndex':121,top:0,display:'block',opacity:0}).animate({top:'50%',opacity:1},500);
            //$('.pop_rule').css({top:0}).animate({top:'50%'},1000);
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

        $('body').on('click','#btn_sharefriend', function() {
            shareFriends();
        });

        // Submit register
        $('.form_register').ajaxForm({
            beforeSubmit:  function($form){
                return $('.form_register').valid();
            },
            complete: function(xhr) {
                res = JSON.parse(xhr.responseText);
                if(res.error == null) {
                    $('.pop_fillinfo').fadeOut();
                    $('.overlay,.cover_pop').fadeIn();
                    $('#pop_voted_failed').show();
                    $('.failed_text').hide();
                    $('#pop_voted_failed .failed_text4').show();
                    setTimeout(function(){
                        $('.overlay').trigger('click');
                    },2000);
                }
            }
        });

        $('.form_register').validate(
            {
                submitHandler: function(form){
                },
                rules: {
                    email: { required: true, email:true },
                    tel: { required: true },
                    password: { required: true, minlength: 5},
                    password_confirm: {
                        required: true,
                        equalTo: ".form_register input[name='password']"
                    }
                },
                messages: {
                    email: {required:'请填写您的邮箱', email: '请填写正确的邮箱'},
                    tel: {required:'请填写您的手机号码'},
                    password: {required:'请填写密码', minlength: '密码不能小于5位'},
                    password_confirm: {required:'请填写确认密码', equalTo: '两次输入的密码不相同'}
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

    // get friend list
    function getFriends() {
        $.ajax({
            type: "GET",
            url: "web/index.php?r=user/friends",
            dataType: 'json',
            cache: false,
            success: function(data){
                if(data.from) {
                    $('#friend_list').empty();
                    if(data.from == 'weibo') {
                        var template = Handlebars.compile($('#friend_item_weibo').html());
                        var result = template(data.data);
                        $('#friend_list').append(result);
                    }
                    if(data.from == 'renren') {
                        var template = Handlebars.compile($('#friend_item_renren').html());
                        var result = template(data);
                        $('#friend_list').append(result);
                    }
                    if(data.from == 'tencent') {
                        var template = Handlebars.compile($('#friend_item_tencent').html());
                        var result = template(data.data.data);
                        $('#friend_list').append(result);
                    }

                    $('.friend_list_wrap').jScrollPane({autoReinitialise:true});
                }
            },
            error: function(xhr, errorType, error) {
            }
        });
    }

    // share to friends
    function shareFriends() {
        $.ajax({
            type: "POST",
            url: "web/index.php?r=user/share",
            data: {'sharebody':$('#share_body').val()},
            dataType: 'json',
            cache: false,
            success: function(data){
                $('.step_sharefriends1').fadeOut(400);
                $('.step_sharefriends2').delay(400).fadeIn(400);
            },
            error: function(xhr, errorType, error) {
            }
        });
    }
})();

