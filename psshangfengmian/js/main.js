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
    var imgSet  =null ;
    // where load photo , resize first to fixable size
    var $photo    = $('.ps_pho').load(function(){
        $(this).css({
            width: 'auto',
            height: 'auto'
        })
        .show();

        // hide drag element
        $drag.hide();

        // remove last sav
        var $coverImg = $cover.find('img');
        var img = this;
        var tarHeight   = $coverImg.height();
        var tarWidth    = $coverImg.width();
        setTimeout(function(){
            var forExpr = 100;
            var width   = img.width;
            var height  = img.height;
            if( width / height > tarWidth / tarHeight ){
                width   = width / height * ( tarHeight + forExpr );
                height  = tarHeight + forExpr;
            } else {
                height  = height / width * ( tarWidth + forExpr );
                width   = tarWidth + forExpr;
            }
            if( !raphael ){
                raphael = Raphael( img.parentNode , tarWidth, tarHeight);
                
                imgRaphael = raphael.image( img.src , 0 , 0 , width, height);
            }
            raphael.setSize( tarWidth , tarHeight );

            // reset transform
            imgRaphael.attr({
                src     : img.src,
                width   : width,
                height  : height
            })
            .transform('');
            transformMgr.reset();
            transformMgr.transform('T' + parseInt( (tarWidth - width ) / 2) + ',' + parseInt( ( tarHeight - height ) / 2 ) );
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
        $('.home .pho_btn').fadeOut();
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
            // shwo camera_wrap
            $('.camera_wrap').fadeIn();
            video.src = window.URL.createObjectURL(stream);
        }
    }
    // show 'src' photo to cover page
    // for resize and rotate
    function showPhoto( src ){
        // hide other page
        $('.page').fadeOut();
        $('.ps_pho_white').show();
        $('#step1_photo').fadeIn()
            .find('.ps_pho')
            .attr('src' , src );
        $('.ps_pho_white').delay(500).fadeOut(1000);
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

    }

    $('#take_photo_btn').click( useCamera );
    $('#shutter_btn').click( takePhoto );
    $('#photo_ok_btn').click( function(){
        // get all data
        var data = transformMgr.result();
        var cid = $('.pho_cover img.active').data('cid') || 1;
        data.cid = cid;
        data.type = 'desktop';
        // send data to server
        postImage(data);
        // TODO .. go to another page

    } );

    $('#photo_repick').click( function(){
        // hide all pages
        $('.page').hide()
            // show home page
            .filter('#step1_html5')
            .show();
    });
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
    
    var transformMgr = (function(){
        var isDragging      = false;
        var isMousedown     = false;
        var startPos        = null;
        var totalMoveX      = 0;
        var totalMoveY      = 0;
        var lastMoveX       = 0;
        var lastMoveY       = 0;

        var $centerBtn = $('.ps_btn_center');
        var oMtop   = parseInt( $centerBtn.css('marginTop') );
        var oMleft  = parseInt( $centerBtn.css('marginLeft') );
        var maxDistance = 200;

        $cover.mousedown( function( ev ){

            isMousedown = true;
            startPos = {
                pageX     : ev.pageX
                , pageY   : ev.pageY
            }
            return false;
        })
        .mousemove( function( ev ){
            if( !isMousedown ) return;
            if( !isDragging ){
                if( Math.abs( ev.pageX - startPos.pageX ) + Math.abs( ev.pageY - startPos.pageY ) >= 10 ){
                    isDragging = true;
                } else {
                    return false;
                }
            }
            // move images
            if( !imgRaphael ) return;

            transform( ev.pageX - startPos.pageX - lastMoveX , ev.pageY - startPos.pageY - lastMoveY );
            lastMoveX = ev.pageX - startPos.pageX;
            lastMoveY = ev.pageY - startPos.pageY;

            // move center icon
            $centerBtn.css({
                marginLeft  : oMleft + lastMoveX / 2
                , marginTop : oMtop + lastMoveY / 2
                , opacity: 1 - Math.min( 0.5 , ( Math.abs( lastMoveX ) + Math.abs( lastMoveY ) ) / maxDistance )
            });
        })
        .bind('mousewheel' , function( ev ){
            var deltay = ev.originalEvent.wheelDeltaY || ev.originalEvent.deltaY;
            if( deltay < 0 ){
                totalScale /= perScale;
                transform( undefined , undefined , 1/perScale );
            } else {
                totalScale *= perScale;
                transform( undefined , undefined , perScale );
            }
        });

        $(document).mouseup(function(){
            // reset states
            if( !isMousedown ) return;
            isDragging      = false;
            isMousedown     = false;
            startPos        = null;
            totalMoveX += lastMoveX;
            totalMoveY += lastMoveY;

            lastMoveX = 0;
            lastMoveY = 0;


            // reset center button
            $centerBtn.animate({
                marginLeft  : oMleft,
                marginTop   : oMtop,
                opacity     : 1
            } , 300 );
        });


        // init ps_btn_up
        var perRotate   = 10;
        var perScale    = 1.1;

        var totalScale  = 1;
        var totalRotate = 0;
        var transforms = [];

        var trsReg = /T(-?[0-9.]+),(-?[0-9.]+)/;
        var scaReg = /S(-?[0-9.]+),(-?[0-9.]+),(-?[0-9.]+),(-?[0-9.]+)/;
        var rotReg = /R(-?[0-9.]+),(-?[0-9.]+),(-?[0-9.]+)/;

        var transform = function( x , y , s , r ){
            var left = x === undefined ? totalMoveX : x;
            var top = y === undefined ? totalMoveY : y;
            var scale = s === undefined ? totalScale : s;
            var rotate = r === undefined ? totalRotate : r;
            var $coverImg   = $cover.find('img');
            var coverHeight = $coverImg.height();
            var coverWidth  = $coverImg.width();
            var transformValue = imgRaphael.transform();

            
            //console.log( imgRaphael );
            var match = null;
            // move 
            if( x !== undefined ){
                if( transforms.length && ( match = transforms[transforms.length-1].match( trsReg ) ) ){
                    transforms[transforms.length-1] = "T" + ( x + parseFloat( match[1] ) ) + ',' + ( y + parseFloat( match[2] ) );
                } else {
                    transforms.push( "T" + x + ',' + y );
                }

                 imgRaphael.transform( transforms.join('') );
            }
            if( s !== undefined ){
                if( transforms.length && ( match = transforms[transforms.length-1].match( scaReg ) ) ){
                    transforms[transforms.length-1] = "S" + ( s * parseFloat( match[1] ) ) + ','
                         + ( s * parseFloat( match[2] ) )
                         + "," + match[3]
                         + "," + match[4];
                } else {
                    transforms.push( "S" + s + ',' + s + ',' + (coverWidth/2) + "," + (coverHeight/2) );
                }

                imgRaphael.animate({
                    transform: transforms.join('')
                } , 200);
            }
            if( r !== undefined ) {
                if( transforms.length && ( match = transforms[transforms.length-1].match( rotReg ) ) ){
                    transforms[transforms.length-1] = "R" + ( r + parseFloat( match[1] ) ) 
                        + "," + match[2]
                        + "," + match[3];
                } else {
                    transforms.push( "R" + r + ',' + (coverWidth/2) + "," + (coverHeight/2) );
                }

                imgRaphael.animate({
                    transform: transforms.join('')
                } , 200);
            }
        }

         // TODO.. for long click
        var animateScale = function(  ){
            
        }
        var longTimeout = null;
        var longInterval = null;

        $('.ps_btn_up').mousedown(function(){
            totalScale *= perScale;
            transform( undefined , undefined , perScale );

            longTimeout = setTimeout(function(){
                longInterval = setInterval(function(){
                    transform( undefined , undefined , perScale );
                } , 500 );
            } , 500);

        });

        $('.ps_btn_down').mousedown(function(){
            totalScale /= perScale;
            transform( undefined , undefined , 1/perScale );

            longTimeout = setTimeout(function(){
                longInterval = setInterval(function(){
                    transform( undefined , undefined , 1/perScale );
                } , 500 );
            } , 500);
        });
        
        $('.ps_btn_right').mousedown(function(){
            totalRotate += perRotate
            transform( undefined , undefined , undefined , perRotate);
            longTimeout = setTimeout(function(){
                longInterval = setInterval(function(){
                    transform( undefined , undefined , undefined , perRotate);
                } , 500 );
            } , 500);
        });

        $('.ps_btn_left').mousedown(function(){
            totalRotate -= perRotate;
            transform( undefined , undefined , undefined , -perRotate );
            longTimeout = setTimeout(function(){
                longInterval = setInterval(function(){
                    transform( undefined , undefined , undefined , -perRotate);
                } , 500 );
            } , 500);
        });

        $(document)
            .mouseup(function(){
                clearTimeout( longTimeout );
                clearInterval( longInterval );
            });


        function reset(){
            isDragging      = false;
            isMousedown     = false;
            startPos        = null;
            totalMoveX      = 0;
            totalMoveY      = 0;
            lastMoveX       = 0;
            lastMoveY       = 0;

            totalScale  = 1;
            totalRotate = 0;
            transforms  = [];
        }

        return {
            reset       : reset
            , result    : function(){
                var off  = imgRaphael.getBBox();
                var width = parseInt($photo.css('width'));
                var height = parseInt($photo.css('height'));
                return {
                    width       : width * totalScale,
                    height      : height * totalScale,
                    image_base64: $photo.attr('src'),
                    rotate      : totalRotate,
                    x           : off.x,
                    y           : off.y,
                    cid         : 1
                }
            }
            , transform  : transform
        }
    })();

    // for drag upload 
    if( $.fn.dragUpload ){
        var $drag = $('.home_drag').dragUpload( {
            autoUpload: false
            , onDragStart   : function( ev ){
                $drag.show();
            }
            , onDragEnd   : function( ev ){
                $drag.hide()
                    .removeClass('dragover');
            }
            // event
            , onDragOver    : function(){
                $drag.addClass('dragover');
            } 
            , onDrop        : function( ev , files ){
                var reader = new FileReader();
                
                reader.onload = function (e) {
                    // render image
                    showPhoto( e.target.result);
                };
                reader.readAsDataURL( files[0] );
            }  
            , onDragLeave   : function(){
                $drag.removeClass('dragover');
            }
            , onFileTypeError: function(){
                alert('只可上传图片文件');
            }  
            , onFileSizeError: function(){
                alert('上传的图片超过5M大小');
            }
        } );
    }

    // for change covers
    $('.pho_cover li img').click(function(){
        $('.pho_cover img').removeClass('active');
        var imgSrc = $(this).addClass('active').data('big');
        $cover.find('img').fadeOut(500,function(){
            $(this).attr('src' , imgSrc);
            $(this).fadeIn();
        })

    });


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
                switchSection('#step2','#step3');
                $.cookie('last_page', 'index-reg', { expires: 7, path: '/' });
            }
            else {
                switchSection('#step2','#step5');
            }
        });

        $('#step2 .step_succ_btn2').click(function(e){
            e.preventDefault();
            backSection('#step2','#step1');
        });

        $('#step4 .step_back').click(function(e){
            e.preventDefault();
            window.location.hash = "";
            backSection('#step4','#step3');
        });

        $('#step3 .step_back').click(function(e){
            e.preventDefault();
            backSection('#step3','#step2');
        });

        $('#step2 .step_back').click(function(e){
            e.preventDefault();
            backSection('#step2','#step1');
        });

        $('#step5 .link_agian').click(function(e){
            e.preventDefault();
            backSection('#step5','#step1');
        });

        $('#step5 .step_back').click(function(e){
            e.preventDefault();
            if(user) {
                backSection('#step5','#step2');
            }
            else {
                backSection('#step5','#step4');
            }
        });


        $('#step5 .link_sharefriend').click(function(e){
            e.preventDefault();
            switchSection('#step5','#step6');
        });

        $('#step6 .step_back').click(function(e){
            e.preventDefault();
            backSection('#step6','#step5');
        });



        // Submit register
        $('.form_register_home').ajaxForm({
            beforeSubmit:  function($form){
                return $('.form_register_home').valid();
            },
            complete: function(xhr) {
                res = JSON.parse(xhr.responseText);
                if(res.error == null) {
                    window.location.hash = "";
                    switchSection('#step4','#step5');
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
        $.ajax({
            type: "GET",
            url: "web/index.php?r=user/userinfo",
            dataType: 'json',
            cache: false,
            success: function(data){
                if(data.error == null) {
                    if(!user.email) {
                        switchSection('#step1','#step4');

                    }
                    else
                    {
                        switchSection('#step1','#step5');
                    }
                    $.ajax({
                        type: "GET",
                        url: "web/index.php?r=photo/lastphoto",
                        dataType: 'json',
                        cache: false
                    });
                }
            }
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
        y : 0,
        cid: Lh_id,
        type: 'flash'
    }
    postImage(data);
}

function postImage(data) {
    var loadingInterval;
    $.ajax({
        type: "POST",
        url: "./web/index.php?r=photo/uploadimage",
        data: data,
        success: function(res) {
            //setTimeout("uploadComplete()",1000);
            $('.step_load').fadeOut();
            clearInterval(loadingInterval);
            $('.step_succ_pho img').attr('src','./web'+res.data.path);
            $('#step1').data('id',res.data.photo_id);
            switchSection('#step1','#step2');
        },
        dataType: 'json'
    });
    // show loading
    $('.step_load').fadeIn();
    $('.loading_bg').css({top:-1000,opacity:0}).animate({top:0,opacity:1},500,function(){
        loadingInterval = setInterval(function(){
            showLoadingIcons();
        },7000);
        showLoadingIcons();
    });
}

function showLoadingIcons() {
    $('.loading_round1').delay(400).fadeIn(1000);
    $('.loading_round2').delay(800).fadeIn(1000);
    $('.loading_round3').delay(1200).fadeIn(1000);
    $('.loading_round4').delay(1600).fadeIn(1000);
    $('.loading_round5').delay(2000).fadeIn(1000);
    $('.loading_round').delay(2000).fadeOut(1000);
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

function switchSection(before, after) {
    $(before).animate({left:'-50%',opacity:0},500,'easeInOutQuart');
    $(after).show().css({left:'150%',opacity:0}).animate({left:'50%',opacity:1},500,'easeInOutQuart');

    var isUglyIe = $.browser.msie && $.browser.version <= 8;
    if(isUglyIe)
        return;
    var ANIMATE_NAME = "data-animate2";
    $(after+' *[' + ANIMATE_NAME + ']')
        .each(function(){
            var $dom = $(this);
            var tar = $dom.data('animate2');
            var style = $dom.data('style');
            var time = parseInt( $dom.data('time') );
            var delay = $dom.data('delay') || 0;
            var easing = $dom.data('easing');
            var begin = $dom.data('begin');
            tar = tar.split(';');
            var tarCss = {} , tmp;
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
}

function backSection(before, after) {
    $(before).animate({left:'150%',opacity:0},500,'easeInOutQuart');
    $(after).show().css({left:'-50%',opacity:0}).animate({left:'50%',opacity:1},500,'easeInOutQuart');
}