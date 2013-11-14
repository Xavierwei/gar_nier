/**
 * main js for garnier
 * @author hdg1988@gmail.com
 */
$(function(){
    //--------------------------------------------
    // for photo take
    var $video = $('#video');
    var $canvas = $('canvas');
    var $camera = $('.camera');
    // for take photo
    function useCamera( ){
        $camera.show();
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

        var $img = $('.home_main').find('img');
        if( !$img.length ){
            $img = $('<img />').appendTo( $photo );
        }
        $img.attr('src' , canvas.toDataURL() );
    }

    $('#take_photo_btn').click( useCamera );
    $('.camera button').click(takePhoto)
        .css({
            width: 200,
            height: 100,
            fontSize: '20px',
            position: 'absolute',
            top: 0,
            right: 0
        });
});