!!(function(){

    iniGlobal();

    function iniGlobal() {
        getCurrentUserInfo();
        getSNSLinks();
        getFriends();
        bindGlobalEvents();

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
            $('body').addClass('animated');
        },6*1000);
    }

    function bindGlobalEvents() {
        //check if mobile
        if($('html').hasClass('touch')) {
            window.location.href="m/index.html";
        }

        // QR code
        $('.share_weixin').click(function(e){
            e.preventDefault();
            $('.main,.header').addClass('blur');
            $('.overlay').fadeIn();
            $('.pop_qr').fadeIn().css('zIndex',121);
        });

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
            if($(this).hasClass('link_register')) {
                $('.step_logup_btn').show();
                $('.step_login_btn').hide();
            } else {
                $('.step_logup_btn').hide();
                $('.step_login_btn').show();
            }
        });

        $('.step_logup_btn').click(function(e) {
            $('.overlay').fadeIn();
            $('.pop_fillinfo').fadeIn().css('zIndex',121);
            if($('.reg_nickname').val() == '') {
                $('.val_nickname').show();
            }
            else {
                $('.val_nickname').hide();
            }
        });

        $('.step_login_btn,.step_login_btn2').click(function(e) {
            $('.overlay').fadeIn();
            $('.pop_site_login').fadeIn().css('zIndex',121);
        });

        $('.sina_close').click(function(){
            $('.overlay').trigger('click');
        });

        $('.link_sina').click(function(){
            $('.pop_sinalogin').fadeIn();
            var src = $('.sinalogin').data('src');
            $('.sinalogin').attr('src',src);
            $('.overlay').fadeIn();
        });

        // Logout
        $('.link_logout').click(function(e) {
            e.preventDefault();
            logout(function(){
                window.location.reload();
            });
        });

        // Close popup
        $('.cover_pop_close,.overlay,.step_log .step_back,.photowall_page .step_sharefriends .step_back').click(function() {
            $('.overlay').fadeOut();
            $('.main,.header').removeClass('blur');
            $('.cover_pop').fadeOut();
            $('.step_log').fadeOut();
            $('.photowall_page .step_sharefriends').fadeOut();
        });

        $('.other_rule,.step_join_rule').click(function(e){
            e.preventDefault();
            $('.overlay').fadeIn();
            $('.main,.header').addClass('blur');
            $('.pop_rule').css({'zIndex':121,top:0,display:'block',opacity:0}).animate({top:'50%',opacity:1},500,'easeInOutQuart');
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

        $('html').on('click','.photowall_page #btn_sharefriend', function() {
            var photo_id = $('.pho_picCon').data('id');
            shareFriends(photo_id);
        });

        $('html').on('click','.home_page #btn_sharefriend', function() {
            var photo_id = $('#step1').data('id');
            shareFriends(photo_id);
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

        // Submit register
        $('.form_register2').ajaxForm({
            beforeSubmit:  function($form){
                return $('.form_register2').valid();
            },
            complete: function(xhr) {
                res = JSON.parse(xhr.responseText);
                if(res.error == null) {
//                    $('.pop_fillinfo').fadeOut();
//                    $('.overlay,.cover_pop').fadeIn();
//                    $('#pop_voted_failed').show();
//                    $('.failed_text').hide();
//                    $('#pop_voted_failed .failed_text4').show();
//                    setTimeout(function(){
//                        $('.overlay').trigger('click');
//                    },2000);
                    if($.cookie('last_page') == 'index-reg') {
                        window.location.hash = 'reg';
                    }
                    setTimeout(function(){
                        window.location.reload();
                    },100);
                }
                else {
                    if(res.error.code == 503) {
                        $('.form_register2 .email_error').fadeIn();
                    }
                }
            }
        });

        $('.form_register2').validate(
        {
            submitHandler: function(form){
            },
            rules: {
                nickname: { required: true },
                email: { required: true, email:true },
                tel: { required: true },
                password: { required: true, minlength: 5},
                password_confirm: {
                    required: true,
                    equalTo: ".form_register2 input[name='password']"
                }
            },
            messages: {
                nickname: {required:'请填写您的昵称'},
                email: {required:'请填写您的邮箱', email: '请填写正确的邮箱'},
                tel: {required:'请填写您的手机号码'},
                password: {required:'请填写密码', minlength: '密码不能小于5位'},
                password_confirm: {required:'请填写确认密码', equalTo: '两次输入的密码不相同'}
            }
        });

        // Submit register
        $('.form_login').ajaxForm({
            beforeSubmit:  function($form){
                return $('.form_login').valid();
            },
            complete: function(xhr) {
                res = JSON.parse(xhr.responseText);
                if(res.error == null) {
                    if($.cookie('last_page') == 'index-reg') {
                        window.location.hash = 'reg';
                    }
                    setTimeout(function(){
                        window.location.reload();
                    },100);
                }
                else {
                    $('.form_login .pw_error').fadeIn();
                }
            }
        });

        $('.form_login').validate(
            {
                submitHandler: function(form){
                },
                rules: {
                    email: { required: true, email:true },
                    password: { required: true}
                },
                messages: {
                    email: {required:'请填写您的邮箱', email: '请填写正确的邮箱'},
                    password: {required:'请填写密码'}
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
                    $('.ipt_t[name="email"]').val(user.email);
                    $('.ipt_t[name="tel"]').val(user.tel);
                    $('.already_logup').hide();
                    $('.logreg_tips').hide();
                    $('.link_my').fadeIn();
                    $('.link_fillinfo').fadeIn();
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
                $('.qq_url').attr('href',data.data.qq);
                if($('body').hasClass('sina-login')){
                    window.location.href=data.data.weibo;
                }

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
                if(data != null && data.from) {
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
                    if(data.from == 'qq') {
                        var template = Handlebars.compile($('#friend_item_qq').html());
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
    function shareFriends(photo_id) {
        $.ajax({
            type: "POST",
            url: "web/index.php?r=user/share",
            data: {'sharebody':$('#share_body').val(),photo_id: photo_id},
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

