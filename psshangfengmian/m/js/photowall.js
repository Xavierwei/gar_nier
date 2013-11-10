/**
 * photowall js for psshangfengmian
 */
!!(function(){

    initPhotowall();


    function initPhotowall() {
        addPhotoItems(1);

        $(window).scroll(function() {
            // Add new photo items when window reach the end
            if($(this).scrollTop() === $('body').height()-$(window).height()) {
                var page = $('#photowall_list').data('page');
                addPhotoItems(page+1);
            }
        });

        // vote event
        $('#photowall_list').on('click', '.user_votebtn', function() {
            var photoID = $(this).parents('.photowall_item').data('id');
            var userID = $('#user_id').val();
            var _this = $(this);

            $('.pop_box').hide();
            votePhoto(photoID, userID, function() { // success
                var voteText = _this.prev().find('span');
                voteText.html(parseInt(voteText.html()) + 1);
                $('#pop_voted').show();
                $('.cover_pop').animate({bottom:0},500,'easeInOutQuart');
            }, function(error) { // failed
                $('.failed_text').hide();
                if(error === 'fail1') {
                    $('#pop_voted_failed .failed_text1').show();
                }
                if(error === 'fail2') {
                    $('#pop_voted_failed .failed_text2').show();
                }
                $('#pop_voted_failed').show();
                $('.cover_pop').animate({bottom:0},500,'easeInOutQuart');
            });
        });

        $('.cover_pop_close').click(function() {
            $('.cover_pop').animate({bottom:'-100%'},500,'easeInOutQuart');
        });
    }

    // Render photo items json data
    function addPhotoItems(page) {
        // init photo items template
        var template = Handlebars.compile($('#photowall_item').html());
        var loading = $('#photowall_loading').css({opacity:0,display:'block'}).animate({opacity:1});

        $.ajax({
            type: "GET",
            url: "dummy_data/photos_" + page + ".json",
            dataType: 'json',
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

    // Vote photo
    function votePhoto(photoID, userID, success, fail) {
        $.ajax({
            type: "POST",
            url: "dummy_data/vote.json",
            //url: "dummy_data/vote_fail1.json",
            data: {photo_id: photoID, user_id: userID},
            dataType: 'json',
            success: function(data){
                if(data.error === null) {
                    success();
                }
                else
                {
                    fail(data.error);
                }
            }
        })
    }
})();