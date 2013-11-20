/**
 * main js for garnier
 */
$(function(){
    //--------------------------------------------
    // for photo take
    var $video  = $('#video');
    var $canvas = $('canvas');
    var $camera = $('.camera');

    var $cover = $('.ps_cover');
    var raphael = null;
    var imgRaphael = null;
    
    // where load photo , resize first to fixable size
    var $photo    = $('.ps_pho').load(function(){
        $(this).css({
            width: 'auto',
            height: 'auto'
        })
        .show();

        // remove last sav
        var $coverImg = $cover.find('img');
        var img = this;
        var tarHeight   = $coverImg.height();
        var tarWidth    = $coverImg.width();
        setTimeout(function(){
            var width   = img.width;
            var height  = img.height;
            if( width / height > tarWidth / tarHeight ){
                width   = width / height * tarHeight;
                height  = tarHeight;
            } else {
                height  = height / width * tarWidth;
                width   = tarWidth;
            }
            raphael = raphael || Raphael( img.parentNode , tarWidth, tarHeight);
            raphael.setSize( tarWidth , tarHeight );
            // resize paper
            imgRaphael = imgRaphael || raphael.image( img.src , 0 , 0 , width, height);
            console.log( imgRaphael );
            imgRaphael.attr({
                src     : img.src,
                width   : width,
                height  : height
            });
            // // Creates canvas 320 × 200 at 10, 50
            // var paper = Raphael( img.parentNode , width, height);
            // var el = paper.image( img.src , 0 , 0 , width, height);
            // console.log(el);
            $(img).css({
                width: width,
                height : height
            })
            .hide();
        } , 10);
    });


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
    // show 'src' photo to cover page
    // for resize and rotate
    function showPhoto( src ){
        // hide other page
        $('.page').hide()
            .filter('.photo')
            .show()
            .find('.ps_pho')
            .attr('src' , src );
        // resize ps_pho_wrap to ps_cover
        $('.ps_pho_wrap').css({
            width: $cover.width(),
            height: $cover.height()
        });
    }


    // takephoto action
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

        showPhoto( canvas.toDataURL() );
        //$img.attr('src' , canvas.toDataURL() );
        return;
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
    $('#shutter_btn').click( takePhoto );

    // for upload photo
    $('#photo_upload').change(function(){
        if (this.files && this.files[0] && FileReader ) {
            //..create loading
            var reader = new FileReader();
            reader.onload = function (e) {
                // change checkpage img
                showPhoto( e.target.result );
            };
            reader.readAsDataURL(this.files[0]);
        }
    });


    // init drag event for $cover
    var result = {
         width   : 0,
        height   : 0,
        image_base64    : '',
        rotate   : 0,
        x        : 0,
        y        : 0
    }
    !!(function(){
        var isDragging      = false;
        var isMousedown     = false;
        var startPos        = null;
        var totalMoveX      = 0;
        var totalMoveY      = 0;
        var lastMoveX       = 0;
        var lastMoveY       = 0;
        $cover.mousedown( function( ev ){
            isMousedown = true;
            startPos = {
                offsetX : ev.offsetX,
                offsetY : ev.offsetY
            }
            return false;
        })
        .mousemove( function( ev ){
            if( !isMousedown ) return;
            if( !isDragging ){
                if( Math.abs( ev.offsetX - startPos.offsetX ) + Math.abs( ev.offsetY - startPos.offsetY ) >= 10 ){
                    isDragging = true;
                } else {
                    return false;
                }
            }
            // move images
            if( !imgRaphael ) return;
            lastMoveX = ev.offsetX - startPos.offsetX;
            lastMoveY = ev.offsetY - startPos.offsetY;

            imgRaphael.transform("T" + ( totalMoveX + lastMoveX ) + ',' + ( totalMoveY + lastMoveY ) + "s" + totalScale + 'r' + totalRotate );
            // imgRaphael.attr( {
            //     x: result.x + lastMoveX,
            //     y: result.y + lastMoveY
            // } );
        });

        $(document).mouseup(function(){
            // reset states
            isDragging      = false;
            isMousedown     = false;
            startPos        = null;
            totalMoveX += lastMoveX;
            totalMoveY += lastMoveY;

        });


        // init ps_btn_up
        var perRotate   = 10;
        var perScale    = 1.1;
        var totalScale  = 1;
        var totalRotate = 0;
        $('.ps_btn_up').click(function(){
            totalScale *= perScale;
            imgRaphael.transform("T" + totalMoveX + ',' + totalMoveY + "s" + totalScale + 'r' + totalRotate );
            //imgRaphael.transform( "s" + totalScale + 'r' + totalRotate );
        });

        $('.ps_btn_down').click(function(){
            totalScale /= perScale;
            imgRaphael.transform("T" + totalMoveX + ',' + totalMoveY + "s" + totalScale + 'r' + totalRotate );
            //imgRaphael.transform( "s" + totalScale + 'r' + totalRotate );
        });
        
        $('.ps_btn_right').click(function(){
            totalRotate += perRotate
            imgRaphael.transform("T" + totalMoveX + ',' + totalMoveY + "s" + totalScale + 'r' + totalRotate );
            //imgRaphael.transform( "s" + totalScale + 'r' + totalRotate );
        });

        $('.ps_btn_left').click(function(){
            totalRotate -= perRotate;
            imgRaphael.transform("T" + totalMoveX + ',' + totalMoveY + "s" + totalScale + 'r' + totalRotate );
            //imgRaphael.transform( "s" + totalScale + 'r' + totalRotate );
        });

    })();



    // // reaphael js for resize and rotate photo
    // // Creates canvas 320 × 200 at 10, 50
    // var paper = Raphael(10, 50, 320, 200);

    // // Creates circle at x = 50, y = 40, with radius 10
    // var circle = paper.circle(50, 40, 10);
    // // Sets the fill attribute of the circle to red (#f00)
    // circle.attr("fill", "#f00");

    // // Sets the stroke attribute of the circle to white
    // circle.attr("stroke", "#fff");


    bindHomeEvents();

    function bindHomeEvents() {
        $(window).resize(function() {
            // adjust flash margin
            var falshMarginTop = ($('.main').height() - $('#step1_flash').height()) / 2;
            $('#step1_flash').css('marginTop',falshMarginTop);
        });

        $(window).trigger('resize');

        // Homepage Register
        $('#step2 .step_succ_btn1').click(function(e){
            e.preventDefault();
            if(user == null) {
                $('#step2').fadeOut();
                $('#step3').fadeIn();
                $.cookie('last_page', 'index-reg');
            }
            else {
                $('#step2').fadeOut();
                $('#step5').fadeIn();
                $('.step6_ad').fadeOut();
            }
        });

        $('#step4 .step_back').click(function(e){
            e.preventDefault();
            $('#step4').fadeOut();
            $('#step3').fadeIn();
            window.location.hash = "";
        });

        $('#step3 .step_back').click(function(e){
            e.preventDefault();
            $('#step3').fadeOut();
            $('#step2').fadeIn();
        });

        $('#step2 .step_back').click(function(e){
            e.preventDefault();
            $('#step2').fadeOut();
            $('#step1').fadeIn();
        });

        $('#step5 .link_agian').click(function(e){
            e.preventDefault();
            $('#step5').fadeOut();
            $('.step6_ad').fadeOut();
            $('#step1').fadeIn();
        });

        // Submit register
        $('.form_register_home').ajaxForm({
            beforeSubmit:  function($form){
                console.log($form);
                return $('.form_register_home').valid();
            },
            complete: function(xhr) {
                res = JSON.parse(xhr.responseText);
                if(res.error == null) {
                    window.location.hash = "";
                    $('#step4').fadeOut();
                    $('#step5').fadeIn();
                    $('.step6_ad').fadeIn();
                }
            }
        });

        $('.form_register_home').validate(
        {
            submitHandler: function(form){
            },
            rules: {
                email: { required: true, email:true },
                tel: { required: true },
                password: { required: true, minlength: 5},
                password_confirm: {
                    required: true,
                    equalTo: ".form_register_home input[name='password']"
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

    if(window.location.hash == '#reg') {
        $('#step1').hide();
        $('#step4').show();
        $.ajax({
            type: "GET",
            url: "web/index.php?r=photo/lastphoto",
            dataType: 'json',
            cache: false
        });
    }

});

function flash_upload(Photo,Width,Height,X,Y,Rotate,Lh_id,User_id){
    var data    = {
        width   : 499,
        height  : 375,
        'image_base64'    : Photo,
        rotate  : 0,
        x : 0,
        y : 0
    }
    $.ajax({
        type: "POST",
        url: "./web/index.php?r=photo/uploadimage",
        data: data,
        success: function(res) {
            //setTimeout("uploadComplete()",1000);
            $('#step1').fadeOut();
            $('.step_load').fadeOut();
            $('.step_succ').fadeIn();
            $('.step_succ_pho img').attr('src','./web'+res.data.path);
        },
        dataType: 'json'
    });
    $('.step_load').fadeIn();

}
function uploadComplete(){
    var flash=document.getElementById("flash");
    if(flash){
        if(flash.js2flashUploadComplete){
        }else{
            flash=null;
        }
    }
    if(flash){
    }else{
        flash=document.getElementsByName("flash");
        if(flash){
            flash=flash[0];
            if(flash){
                if(flash.js2flashUploadComplete){
                }else{
                    flash=null;
                }
            }
        }
    }
    if(flash){
        flash.js2flashUploadComplete("photo_id","photourl");
    }//else{
    //	alert("找不到flash");
    //}
}