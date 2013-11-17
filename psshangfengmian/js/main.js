/**
 * main js for garnier
 */
$(function(){
    //--------------------------------------------
    // for photo take
    var $video = $('#video');
    var $canvas = $('canvas');
    var $camera = $('.camera');
    // for take photo
    function useCamera( ){
        $('.camera_help').fadeIn();
        $('.pho_btn').fadeOut();
        $camera.find('canvas')
            .attr({
                width: $camera.width(),
                height: $camera.height()
            })
            .css({
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1
            });
        var video = $video[0];
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true}, handleVideo, function( e ){
                // TODO..
                console.log ( e );
            });
        }
        function handleVideo(stream) {
            $('#shutter_btn').fadeIn();
            $('.camera_help').fadeOut();
            $video.data('__stream__' , stream );
            video.src = window.URL.createObjectURL(stream);
        }
    }
    function takePhoto(){
        var canvas = $canvas[0];
        var video = $video[0];
        var ctx = canvas.getContext('2d');
        ctx.drawImage( video , 0 , 0 , $canvas.width() , $canvas.height() );

        // stop use camera , hide the video element
        var stream = $video.data('__stream__' );
        stream && stream.stop();

        // hide video element, and create img element to #photo element
        $camera.hide();

        var $img = $('.home_main').find('img').eq(0);
        if( !$img.length ){
            $img = $('<img />').appendTo( $photo);
        }
        $img.attr('src' , canvas.toDataURL() );

        // 图片提交到后台, TODO: 这一步在缩放功能完成后移到缩放后的提交方法中
        var data    = {
            width   : 499,
            height  : 375,
            'image_base64'    : $img.attr('src'),
            rotate  : 0,
            x : 90,
            y : 0
        }
        $.ajax({
            type: "POST",
            url: "./web/index.php?r=photo/uploadimage",
            data: data,
            success: function(res) {
                $('.step_load').fadeOut();
                $('.step_succ').fadeIn();
                $('.step_succ_pho img').attr('src','./web'+res.data.path);
            },
            dataType: 'json'
        });
        $('.step_load').fadeIn();
    }

    $('#take_photo_btn').click( useCamera );
    $('#shutter_btn').click(takePhoto);
});