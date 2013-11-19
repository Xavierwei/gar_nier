/**
 * photowall js for psshangfengmian
 */
!!(function(){

    initPhotowall();
    getCurrentUserInfo();

    function initPhotowall() {
        handlePanelEvent();
        addPhotoItems(1,'photo_id');

        $(window).scroll(function() {
            // Add new photo items when window reach the end
//            if($(this).scrollTop() > $('body').height()-$(window).height()-10) {
//                var page = $('#photowall_list').data('page');
//                var type = $('#photowall_list').data('type');
//                addPhotoItems(page+1, type);
//            }
        });

        // vote event
        $('body').on('click', '.pho_votebtn', function() {
            var photoID = $(this).parents('.pho_item').data('id');
            var _this = $(this);

            $('.pop_box').hide();
            votePhoto(photoID, function() { // success
                var voteText = _this.prev().find('span');
                voteText.html(parseInt(voteText.html()) + 1);
                $('#pop_voted').show();
                $('.cover_pop').animate({bottom:0},500,'ease-in-out');
            }, function(error) { // failed
                $('.failed_text').hide();
                if(error === 'fail1') {
                    $('#pop_voted_failed .failed_text1').show();
                }
                if(error === 'fail2') {
                    $('#pop_voted_failed .failed_text2').show();
                }
                $('#pop_voted_failed').show();
                $('.cover_pop').animate({bottom:0},500,'ease-in-out');
            });
        });

        // fullscreen
        $('#photowall_list').on('click', '.img_shadow', function() {
            var item = $(this).parents('.photowall_item');
            var data = {
                path: $(this).attr('src'),
                photo_id: item.data('id'),
                vote: item.find('.user_vote span').html()
            };
            showFullscreen(data);
        });

        $('.cover_pop_close').click(function() {
            $('.cover_pop').animate({bottom:'-100%'},500,'ease-in-out');
        });

        // Fill user info
        $('.photowall_btn2').click(function(e) {
            e.preventDefault();
            $('.pop_box').hide();
            $('#pop_fillinfo').show();
            $('.cover_pop').animate({bottom:0},500,'ease-in-out');
        });
    }

    // Render photo items json data
    function addPhotoItems(page,type,uid) {
        // init photo items template
        var template = Handlebars.compile($('#photowall_item').html());
        var loading = $('#photowall_loading').css({opacity:0,display:'block'}).animate({opacity:1});
        var url = "web/index.php?r=photo/listphotoes&page=" + page + "&num=10&orderby=" + type;
        if(uid) {
            url = url + "&userid=" + uid;
        }

        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            cache: false,
            success: function(data){
                var result = template(data);
                $('#photowall_list').append(result).data('page',page);
                loading.animate({opacity:0});
            },
            error: function(){
                loading.hide();
                $('#photowall_end').show();
            }
        });
    }

    // Render fullscreen box
    function showFullscreen(data) {
        // init fullscreen template
        var template = Handlebars.compile($('#photowall_fullscreen').html());
        var result = template(data);
        $('body').append(result);
        $('.photowall_fullscreen_item').fadeIn();
        $('.photowall_fullscreen_item .user_pho').click(function() {
            $('.photowall_fullscreen_item').animate({opacity:0},500,'ease',function(){
               $(this).remove();
            });
        });

    }

    // Vote photo
    function votePhoto(photoID, success, fail) {
        $.ajax({
            type: "POST",
            //url: "dummy_data/vote.json",
            url: "web/index.php?r=photo/vote",
            data: {photo_id: photoID},
            dataType: 'json',
            cache: false,
            success: function(data){
                if(data.error === null) {
                    success();
                }
                else
                {
                    fail(data.error);
                }
            },
            error: function(xhr, errorType, error) {
                alert(xhr.status);
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
                    $('#login_logined .nickname').html(user.nickname);
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

    // Panel events
    function handlePanelEvent() {

        $('.list_listnav a').click(function(e) {
            e.preventDefault();
            var action = $(this).attr('href').replace('#','');
            switch(action) {
                case 'new':
                    $('#photowall_list').empty().data('type', action);
                    addPhotoItems(1,'photo_id');
                    break;
                case 'popular':
                    $('#photowall_list').empty().data('type', action);
                    addPhotoItems(1,'vote');
                    break;
                case 'my':
                    $('#photowall_list').empty().data('type', action);
                    //TODO: check user login status
                    addPhotoItems(1,'photo_id', 23);
                    break;
            }
        });


    }


})();