/**
 * photowall js for psshangfengmian
 */
!!(function(){

    init();
    function init() {
        getCurrentUserInfo();
        getSNSLinks();

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

        // Register
        $('.link_register,.link_login').click(function(e) {
            e.preventDefault();
            $('.cover_pop2').animate({bottom:0},500);
            $('.pop_box').hide();
            $('#pop_login').show();
            $.cookie('last_page', $('body').data('page'), { expires: 7, path: '/' });
        });

        $('.link_rule').click(function(e) {
            e.preventDefault();
            $('.cover_pop2').animate({bottom:0},500);
            $('.pop_box').hide();
            $('#pop_rule').show();
        });


        $('.cover_pop2_close').click(function() {
            $('.cover_pop2').animate({bottom:'-100%'},500);
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
            url: "../web/index.php?r=user/userinfo",
            dataType: 'json',
            cache: false,
            success: function(data){
                if(data.error == null) {
                    user = data.data;
                    $('.login').show();
                    $('#login_logined').show();
                    $('#login_logined .nickname,.reg_nickname').html(user.nickname);
                    $('.val_nickname').val(user.nickname);
                    $('.link_my').show();
                    if(!user.email) {
                        $('.link_fillinfo').show();
                    }


                    if(window.location.hash == '#reg') {
                        $('#sharepage').show();
                        $.ajax({
                            type: "GET",
                            url: "../web/index.php?r=photo/lastphoto",
                            dataType: 'json',
                            cache: false
                        });
                    }
                }
                else
                {
                    $('.login').show();
                    $('#login_nologin').show();
                    if(window.location.hash == '#reg') {
                        if(user == null) {
                            $('.cover_pop2').animate({bottom:0},500);
                            $('.pop_box').hide();
                            $('#pop_fillinfo').show();
                        }
                        $.ajax({
                            type: "GET",
                            url: "../web/index.php?r=photo/lastphoto",
                            dataType: 'json',
                            cache: false
                        });
                    }
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
            url: "../web/index.php?r=user/snslinks",
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
            url: "../web/index.php?r=user/friends",
            dataType: 'json',
            cache: false,
            success: function(data){
                if(data.data.users) {
                    var template = Handlebars.compile($('#friend_item').html());
                    var result = template(data.data);
                    $('#friend_list').empty();
                    $('#friend_list').append(result);
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
            url: "../web/index.php?r=user/share",
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