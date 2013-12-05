/**
 * photowall js for psshangfengmian
 */
!!(function(){
    var scrolling = false;
    var keytips = true;
    initPhotowall();

    function initPhotowall() {

        handlePanelEvent();
        addPhotoItems(1,'photo_id');

        $(window).scroll(function() {
            // Add new photo items when window reach the end
            if(($(this).scrollTop() > $('.main').height()-$(window).height()-10) && !scrolling) {
                scrolling = true;
                var page = $('#photowall_list').data('page');
                var type = $('#photowall_list').data('type');
                switch(type) {
                    case 'new':
                        addPhotoItems(page+1, 'photo_id');
                        break;
                    case 'popular':
                        addPhotoItems(page+1, 'vote');
                        break;
                    case 'my':
                        addPhotoItems(page+1,'photo_id', user.user_id);
                        break;
                }
            }
        });

        // vote event on list page
        $('body').on('click', '.pho_votebtn,.pho_votenum', function() {
            var photoID = $(this).parents('.pho_item').data('id');
            var _this = $(this);

            $('.pop_box').hide();
            votePhoto(photoID, function() { // success
                var voteText = _this.parents('.pho_item').find('.pho_votenum span');
                voteText.html(parseInt(voteText.html()) + 1);
                _this.parents('.pho_item').data('voted','true');
                _this.parents('.pho_item').find('.pho_vote_hover').fadeIn(function(){
                    $(this).delay(500).fadeOut();
                });
                var vote_b = $('<div class="pho_vote_b"></div>').appendTo(_this.parents('.pho_item').find('.pho_img'));
                vote_b.animate({bottom:55},function(){
                    $(this).delay(300).fadeOut(function(){
                        $(this).remove();
                    });
                });
                //_this.parents('.pho_item').find('.pho_img').trigger('click');
            }, function(error) { // failed
                if(error.code == '501') {
                    $('.overlay').fadeIn();
                    $('.main,.header').addClass('blur');
                    $('.pop_login').fadeIn().css('zIndex',121);
                    $('.pop_login').find('.step_log_tit').html('登录后投票');
                }
                if(error.code == '505') {
                    $('.overlay,.cover_pop').fadeIn();
                    $('.main,.header').addClass('blur');
                    $('#pop_voted_failed').show();
                    $('.failed_text').hide();
                    $('#pop_voted_failed .failed_text1').show();
                }
                if(error.code == '505-2') {
                    $('.overlay,.cover_pop').fadeIn();
                    $('.main,.header').addClass('blur');
                    $('#pop_voted_failed').show();
                    $('.failed_text').hide();
                    $('#pop_voted_failed .failed_text2').show();
                }
            });
        });

        $('body').on('click', '.phoPic_vote', function() {
            var photoID = $(this).parents('.pho_picCon').data('id');
            var _this = $(this);
            $('.pop_box').hide();
            votePhoto(photoID, function() { // success
                var voteText = _this.parents('.pho_picCon').find('.pho_votenum span');
                voteText.html(parseInt(voteText.html()) + 1);
                _this.parents('.pho_item').find('.pho_vote_hover').fadeIn(function(){
                    $(this).delay(500).fadeOut();
                });
                _this.fadeOut(400);
                _this.parents('.pho_picCon').find('.phoPic_voted_text').delay(400).fadeIn(400);
                var vote_b = $('<div class="pho_vote_b"></div>').appendTo($('.pho_picCon'));
                vote_b.animate({bottom:305},function(){
                    $(this).delay(300).fadeOut(function(){
                        $(this).remove();
                    });
                });
            }, function(error) { // failed
                if(error.code == '501') {
                    $('.overlay').fadeIn();
                    $('.main,.header').addClass('blur');
                    $('.pop_login').fadeIn().css('zIndex',121);
                    $('.pop_login').find('.step_log_tit').html('登录后投票');
                }
                if(error.code == '505') {
                    $('.overlay,.cover_pop').fadeIn();
                    $('.main,.header').addClass('blur');
                    $('#pop_voted_failed').show();
                    $('.failed_text').hide();
                    $('#pop_voted_failed .failed_text1').show();
                }
                if(error.code == '505-2') {
                    $('.overlay,.cover_pop').fadeIn();
                    $('.main,.header').addClass('blur');
                    $('#pop_voted_failed').show();
                    $('.failed_text').hide();
                    $('#pop_voted_failed .failed_text2').show();
                }
            });
        });

        $('body').on('click','.phoPic_share',function() {
            $('.overlay').fadeIn();
            $('.step_sharefriends').fadeIn().css({zIndex:205});
            $('.share_img img').attr('src',$('.pho_picImg').attr('src'));
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
                voted: item.data('voted'),
                user_id: item.data('uid')
            };
            item.data('voted','');
            showFullscreen(data);
        });

        $('body').on('click','.pho_picCon .phoPic_close,.overlay_photo',function(){
            $('.overlay_photo').fadeOut();
            $('.main,.header').removeClass('blur');
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
            if($(this).hasClass('phoPic_n')) {
                nextFullscreen(data,'next');
            } else {
                nextFullscreen(data,'prev');
            }
        });

        $(window).keydown(function(e){
            if(e.keyCode == 39) {
                $('.phoPic_n').trigger('click');
            }
            if(e.keyCode == 37) {
                $('.phoPic_p').trigger('click');
            }
            if(e.keyCode == 27) {
                $('.phoPic_close').trigger('click');
            }
        });

        $(window).resize(function(){
            var imgHeight = $(window).height()-80;
            if(imgHeight > 653) {
                imgHeight = 653;
            }
            $('.pho_picImg').height(imgHeight);
            var imgWidth = imgHeight * (512/653);
            $('.pho_picImg').width(imgWidth);
            conTop = ($('window').height() - imgHeight)/2;
            conLeft = ($('window').width() - $('.pho_picCon').width())/2;
            $('.pho_picCon').css({marginTop:conTop,marginLeft:conLeft,display:'block'});
        });

    }

    // Render photo items json data
    function addPhotoItems(page,type,uid) {
        // init photo items template
        var template = Handlebars.compile($('#photowall_item').html());
        var loading = $('#photowall_loading').css({opacity:0,display:'block'}).animate({opacity:1});
        var url = "web/index.php?r=photo/listphotoes&page=" + page + "&num=8&orderby=" + type;
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
                var items = $('#photowall_list').find('.pho_item').not('.opened');
                items.each(function(index,obj){
                    $(obj).delay(index*150).animate({opacity:1},1500).addClass('opened');
                })
                loading.animate({opacity:0});
                scrolling = false;
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
        var conTop, conLeft;
        $('body').append(result);
        var imgHeight = $(window).height()-80;
        if(imgHeight > 653) {
            imgHeight = 653;
        }
        $('.pho_picImg').height(imgHeight);
        var imgWidth = imgHeight * (512/653);
        $('.pho_picCon').width(imgWidth+236);
        $('.pho_picImg').width(imgWidth);
        $('.main,.header').addClass('blur');
        conTop = ($('window').height() - imgHeight)/2;
        conLeft = ($('window').width() - $('.pho_picCon').width())/2;
        $('.overlay_photo').fadeIn();
        $('.pho_picCon').css({marginTop:'-100%',marginLeft:conLeft,opacity:0,display:'block'}).animate({marginTop:conTop,opacity:1},500,'easeInOutQuart');
        if(user && data.user_id == user.user_id) {
            $('.pho_picCon .phoPic_share').css({display:'block'});
        }
        if(keytips) {
            $('.keytips').show();
            keytips = false;
        }
    }

    function nextFullscreen(data,direction) {
        var left = '-50%';
        var newLeft = '150%';
        if(direction == 'prev') {
            left = '150%';
            newLeft = '-50%';
        }
        $('.pho_picCon').animate({left:left},300,function(){
            $(this).remove();
            // init fullscreen template
            var template = Handlebars.compile($('#photowall_fullscreen').html());
            var result = template(data);
            var conTop, conLeft;
            $('body').append(result);
            var imgHeight = $(window).height()-80;
            if(imgHeight > 653) {
                imgHeight = 653;
            }
            $('.pho_picImg').height(imgHeight);
            var imgWidth = imgHeight * (512/653);
            $('.pho_picCon').width(imgWidth+236);
            $('.pho_picImg').width(imgWidth);
            conTop = ($('window').height() - imgHeight)/2;
            conLeft = ($('window').width() - $('.pho_picCon').width())/2;
            $('.pho_picCon').css({marginTop:conTop,marginLeft:conLeft,opacity:0,display:'block',left:newLeft}).animate({left:'50%',opacity:1},500,'easeInOutQuart');
        });
        if(keytips) {
            $('.keytips').show();
            keytips = false;
        }
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
            $('.list_listnav a').removeClass('on');
            $(this).addClass('on');
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