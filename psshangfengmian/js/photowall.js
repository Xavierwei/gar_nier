/**
 * photowall js for psshangfengmian
 */
!!(function(){

    initPhotowall();

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
        $('body').on('click', '.pho_votebtn,.phoPic_vote', function() {
            var photoID = $(this).parents('.pho_item').data('id');
            if(!photoID) {
                photoID = $(this).parents('.pho_picCon').data('id');
            }
            var _this = $(this);

            $('.pop_box').hide();
            votePhoto(photoID, function() { // success
                var voteText = _this.prev().find('span');
                voteText.html(parseInt(voteText.html()) + 1);
                _this.parents('.pho_item').data('voted','true');
                _this.parents('.pho_item').find('.pho_img').trigger('click');
            }, function(error) { // failed
                if(error.code == '501') {
                    $('.overlay').fadeIn();
                    $('.pop_login').fadeIn().css('zIndex',121);
                    $('.pop_login').find('.step_log_tit').html('登录后投票');
                }
                if(error.code == '505') {
                    $('.overlay,.cover_pop').fadeIn();
                    $('#pop_voted_failed').show();
                    $('.failed_text').hide();
                    $('#pop_voted_failed .failed_text1').show();
                }
                if(error.code == '505-2') {
                    $('.overlay,.cover_pop').fadeIn();
                    $('#pop_voted_failed').show();
                    $('.failed_text').hide();
                    $('#pop_voted_failed .failed_text2').show();
                }
            });
        });

        // fullscreen
        $('#photowall_list').on('click', '.pho_img', function() {
            var item = $(this).parents('.pho_item');
            var data = {
                nickname: item.find('.pho_name').html(),
                datetime: item.find('.pho_time').html(),
                path: $(this).find('img').attr('src').replace('web',''),
                photo_id: item.data('id'),
                vote: item.find('.pho_votenum span').html(),
                voted: item.data('voted')
            };
            item.data('voted','');
            showFullscreen(data);
        });

        $('body').on('click','.pho_picCon .phoPic_close,.overlay_photo',function(){
            $('.overlay_photo').fadeOut();
            $('.pho_picCon').fadeOut(function(){
                $(this).remove();
            });
        });

        $('body').on('click','.phoPic_n,.phoPic_p',function(){
            var thisId = $(this).parents('.pho_picCon').data('id');
            if($(this).hasClass('phoPic_n')) {
                var item = $('.pho_item[data-id='+thisId+']').next();
                if(item.length == 0) {
                    item = $('.pho_item').first();
                }
            }
            else {
                var item = $('.pho_item[data-id='+thisId+']').prev();
                if(item.length == 0) {
                    item = $('.pho_item').last();
                }
            }
            var data = {
                nickname: item.find('.pho_name').html(),
                datetime: item.find('.pho_time').html(),
                path: item.find('.pho_img img').attr('src').replace('web',''),
                photo_id: item.data('id'),
                vote: item.find('.pho_votenum span').html()
            };
            nextFullscreen(data);
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
        $('.overlay_photo').fadeIn();
        $('.pho_picCon').fadeIn();
    }

    function nextFullscreen(data) {
        $('.pho_picCon').animate({left:'-50%'},300,function(){
            $(this).remove();
            // init fullscreen template
            var template = Handlebars.compile($('#photowall_fullscreen').html());
            var result = template(data);
            $('body').append(result);
            $('.pho_picCon').css({left:'100%'}).animate({left:'50%'},300).show();
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
                    addPhotoItems(1,'photo_id', user.user_id);
                    break;
            }
        });
    }
})();