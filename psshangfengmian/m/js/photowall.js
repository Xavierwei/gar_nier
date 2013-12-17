/**
 * photowall js for psshangfengmian
 */
!!(function(){

    initPhotowall();

    function initPhotowall() {
        handlePanelEvent();
        addPhotoItems(1,'new');

        $(window).scroll(function() {
            // Add new photo items when window reach the end
            if($(this).scrollTop() > $('body').height()-$(window).height()-10) {
                var page = $('#photowall_list').data('page');
                var type = $('#photowall_list').data('type');
                addPhotoItems(page+1, type);
            }
        });

        // vote event
        $('body').on('click', '.user_votebtn', function() {
            var photoID = $(this).parents('.photowall_item').data('id');
            var userID = $('#user_id').val();
            var _this = $(this);

            $('.pop_box').hide();
            votePhoto(photoID, userID, function() { // success
                var voteText = _this.prev().find('span');
                voteText.html(parseInt(voteText.html()) + 1);
                $('#pop_voted').show();
                $('.cover_pop2').animate({bottom:0},500);
            }, function(error) { // failed
                if(error.code == '501') {
                    $('.overlay').fadeIn();
                    $('.failed_text').hide();
                    $('.pop_box').hide();
                    $('#pop_login').show();
                    $.cookie('last_page', $('body').data('page'), { expires: 7, path: '/' });
                }
                if(error.code == '505') {
                    $('.failed_text').hide();
                    $('#pop_voted_failed').show();
                    $('#pop_voted_failed .failed_text1').show();
                }
                if(error.code == '505-2') {
                    $('.failed_text').hide();
                    $('#pop_voted_failed').show();
                    $('#pop_voted_failed .failed_text2').show();
                }
                $('.cover_pop2').animate({bottom:0},500);
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


        // Fill user info
        $('.photowall_btn2').click(function(e) {
            e.preventDefault();
            $('.pop_box').hide();
            $('#pop_fillinfo').show();
            $('.cover_pop2').animate({bottom:0},500);
        });
    }

    // Render photo items json data
    function addPhotoItems(page,type,uid) {
        // init photo items template
        var template = Handlebars.compile($('#photowall_item').html());
        var loading = $('#photowall_loading').css({opacity:0,display:'block'}).animate({opacity:1});
        var url = "../web/index.php?r=photo/listphotoes&page=" + page + "&num=10&orderby=" + type;
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
        $('.photowall_fullscreen_item .user_pho,.photowall_fullscreen_item .user_pho_close').click(function() {
            $('.photowall_fullscreen_item').animate({opacity:0},500,function(){
               $(this).remove();
            });
        });

    }

    // Vote photo
    function votePhoto(photoID, userID, success, fail) {
        $.ajax({
            type: "POST",
            //url: "dummy_data/vote.json",
            url: "../web/index.php?r=photo/vote",
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
        var panelStatus = 0;
        var scrolling = 0;
        var dragging = 0;
        $('.page').width($(window).width());
        $(document).hammer({drag_block_horizontal: true,swipe_velocity:1})
            .on("release dragup dragdown dragleft dragright swipeleft swiperight", function(ev) {
                switch(ev.type) {
                    case 'dragup':
                    case 'dragdown':
                        if(!dragging) {
                            scrolling = 1;
                        }
                        else
                        {
                            ev.gesture.preventDefault();
                        }
                        break;

                    case 'dragright':
                    case 'dragleft':
                        if(!scrolling) {
                            var offsetX = ev.gesture.deltaX;
                            dragging = 1;
                            if(panelStatus) {
                                offsetX = ev.gesture.deltaX + $(window).width()*0.625;
                            }
                            if(offsetX > 0) {
                                $('.page').css({marginLeft:offsetX});
                            }
                        }
                        break;


                    case 'swipeleft':
                        if(!scrolling) {
                            hidePanel();
                            ev.gesture.stopDetect();
                        }
                        break;

                    case 'swiperight':
                        if(!scrolling) {
                            showPanel();
                            ev.gesture.stopDetect();
                        }
                        break;

                    case 'release':
                        if(!scrolling) {
                            if(Math.abs(ev.gesture.deltaX) > $(window).width()*0.3) {
                                if(ev.gesture.direction == 'right') {
                                    showPanel();
                                } else {
                                    hidePanel();
                                }
                            }
                            else {
                                if(panelStatus) {
                                    showPanel();
                                }
                                else {
                                    hidePanel();
                                }
                            }
                        }
                        scrolling = 0;
                        dragging = 0;
                        break;
                }
            });

        $('.photowallarrow').click(function() {
            if($(this).hasClass('close')) {
                hidePanel();
            }
            else {
                showPanel();
            }
        });

        $('.menu a').click(function() {
            var action = $(this).attr('href').replace('#','');
            hidePanel();
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
                    addPhotoItems(1,'photo_id',user.user_id);
                    break;
                case 'rule':
                    $('.pop_box').hide();
                    $('#pop_rule').show();
                    $('.cover_pop2').animate({bottom:0},500);
                    break;
            }
        });

        function showPanel() {
            panelStatus = 1;
            $('.page').animate({marginLeft:$(window).width() * 0.625},200);
            $('.photowallarrow').addClass('close');
        }

        function hidePanel() {
            panelStatus = 0;
            $('.page').animate({marginLeft:0},200);
            $('.photowallarrow').removeClass('close');
        }

        function scrollTo(element, to, duration) {
            if (duration < 0) return;
            var difference = to - element.scrollTop;
            var perTick = difference / duration * 10;

            setTimeout(function() {
                element.scrollTop = element.scrollTop + perTick;
                scrollTo(element, to, duration - 10);
            }, 10);
        }
    }




})();