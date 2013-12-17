/**
 * main js for psshangfengmian
 */
!!(function(){
    // loading
    var $loading = $('.loading');
    var $coverpage = $('#coverpage');
    var $mainpage = $('#mainpage');
    // photo check page
    var $checkpage = $('#checkpage');
    var loadingInterval;


    $checkpage.find('.photo_com img')
        .on('load' , function(){
            // hide home cover
            $('.cover_home').hide();

            // fix img size
            $(this).css({
                width: 'auto',
                height: 'auto'
            });
            var h = this.height;
            var w = this.width;
            var maxH = $(this).parent().height();
            var maxW = $(this).parent().width();

            if( h > maxW || w > maxW ){
                if( w / h > maxW / maxH ){
                    h = h / w * maxW;
                    w = maxW;
                } else {
                    w = w / h * maxH;
                    h = maxH;
                }
            }
            $(this).css({
                width: w,
                height: h,
                marginTop: ( maxH - h ) / 2,
                marginLeft: ( maxW - w ) / 2
            });
        });
    // for step1 file upload
    var onInputFileChange = function(){
        if (this.files && this.files[0] && FileReader ) {
            var file = this.files[0];
            var $this = $(this);
            //..create loading
            var reader = new FileReader();
            reader.onload = function (e) {
                // hide other pages
                $('.page').fadeOut();
                $checkpage.fadeIn();

                var src = e.target.result;
                if( !file.type ){
                    src = fixImageDataForFuckUglyBrowser( file , src );
                }
                // change checkpage img
                var $img = $checkpage.find('.photo_com img');
                $img.attr('src' , src );
                // remove loading

            };
            reader.readAsDataURL(this.files[0]);
        }
    }
    $('#step1_upload_file')
        .change(onInputFileChange);

    /**
     * @desc: fuck ugly browser , get image data from readAsDataURL api , then it loosed image type for image data
     * @date:
     * @author: hdg1988@gmail.com
     */
    function fixImageDataForFuckUglyBrowser( file , data ){
        var name = file.name || file.fileName;
        var ext = name.match(/^.*\.(\w+)$/)[1];
        if( ext == 'jpg' )
            ext = 'jpeg';
        data = data.replace(/^data:/ , 'data:image/' + ext + ';');

        return data;
    }

    // photo checkpage for photo ok btn tap event
    $('#checkpage-ok').click(function(){
        // hide checkpage
        $checkpage.fadeOut();
        // show mainpage
        $mainpage.fadeIn();
        // change image src attribute
        $mainpage.find('.img_shadow')
            .attr('src' , 
                $checkpage.find('.photo_com img')
                    .attr('src') );

        // change cover page
        // get cover src
        var index = $('.cover_slide').data('index');
        var src = $('.cover_slide_img').find('.cover_slide_item').eq( index )
            .find('img')
            .attr('src');
            
        $('.photo_cover') .find('img')
           .attr( 'src' , src );

    });

    // change cover , need to change the size of photo_center
    $('.photo_cover') .find('img').on('load' , function(){
        // reset cover size
        $('.photo_center').css({
            width: this.width + 20,
            height: this.height + 20,
            marginTop: ( $('.photo_adjust').height() - this.height - 20 ) / 2
        });
    })

    // init img load event , to resize suitable size
    $mainpage.find('.img_shadow').on('load' , function(){
        $(this).css({
            width: 'auto',
            height: 'auto'
        });

        var $coverImg = $('.photo_cover') .find('img');
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
            $(img).css({
                width: width,
                height : height
            });
        } , 10);
    });

    /////////////////////////// cover page ////////////////////////////////////////
    // init change cover btn
    $('#change_cover').click(function(){
        // hide home cover 
        $coverpage.show()
            .css({
                bottom: '100%',
                zIndex: 2
            })
            .animate({bottom:0},500,'easeInOutQuart');

        $coverpage.find('.cover_slide_home')
            .removeClass( 'cover_slide_home' )
            .show();
        $coverpage.find('.step1_btn')
            .hide();

        $coverpage
            .find('.step1home_tips')
            .hide();
        $coverpage
            .find('.photo_btn')
            .show();
    });

    // init cover slider
    !!(function(){
        setTimeout(function(){
            $coverpage.animate({bottom:0}, 400);
        } , 600);
        var isOnCover = !!$('.cover_slide_home').length;
        var $sliders = $('.cover_slide_img').find('.cover_slide_item');
        var index = 0;
        var imgRate = 316 / 406;
        var winWidth = $(window).width();
        var sliderHeight = $(window).height() - $('.header').height() - 88 - 18 * 2;
        var smallWidth = 220;

        var normalWidth = winWidth - 220 / 2 * 2 - 50 * 2;
        var normalHeight = sliderHeight;
        if( normalWidth / sliderHeight > imgRate ){
            normalWidth = imgRate * sliderHeight;
        } else {
            normalHeight = normalWidth / imgRate;
        }
        var centerStatues = {
            left: ( winWidth - normalWidth ) / 2 ,
            top: ( sliderHeight - normalHeight ) / 2,
            height: normalHeight,
            //marginTop: -normalHeight/2,
            width: normalWidth,
            //marginLeft: -normalWidth/2,
            opacity: 1
        }
        var leftStatues = {
            left: - smallWidth / 2,
            top: ( sliderHeight - smallWidth * normalHeight / normalWidth ) /2 ,
            height: smallWidth * normalHeight / normalWidth,
            width: smallWidth,
            opacity: 0.5
        }
        var rightStatus = {
            left: winWidth - smallWidth / 2 ,
            top: ( sliderHeight - smallWidth * normalHeight / normalWidth ) /2 ,
            height: smallWidth * normalHeight / normalWidth,
            width: smallWidth,
            opacity: 0.5
        }
        var isSlideRunning = false;
        // init origin position
        var goToIndex = function( i , direction ){

            $('#tip').append('<p>' + isSlideRunning + '</p>');
            if( i < 0 || i >= $sliders.length  || isSlideRunning) return;

            isSlideRunning = true;
            setTimeout(function(){
                isSlideRunning = false;
            } , 600);
            $('.cover_slide').data('index' , i );
            index = i;
            // hide prev btn / next btn
            $('.cover_slide_prev')[ i == 0 ? 'hide' : 'show' ]();
            $('.cover_slide_next')[ i == $sliders.length - 1 ? 'hide' : 'show' ]();

            $sliders.each(function( ind ){
                var pos = {};
                if( ind < i - 1 ){
                    pos = $.extend({} ,leftStatues , {
                        left: -smallWidth
                    });
                } else if( ind == i - 1 ){ // prev item
                    pos = leftStatues;
                } else if( ind == i ){
                    pos = centerStatues;
                } else if( ind == i + 1 ){
                    pos = rightStatus;
                } else {
                    pos = $.extend({} ,rightStatus , {
                        left: winWidth
                    });
                }
                $(this).css( pos );
            })
            .find('.cover_checkbox').hide()
            .eq( index )
            .show();
        }

        goToIndex( 0 );

        $('.cover_slide_prev').click( function(){
            goToIndex( index - 1 );
        });
        $('.cover_slide_next').click( function(){
            goToIndex( index + 1 );
        });

        $('#cover_check_btn').click(function(){
            $coverpage.animate({
                bottom: '100%'
            } , 500 , '' , function(){
                $coverpage.hide();
            } );
            // get cover src
            var src = $sliders.eq( index )
                .find('img')
                .attr('src');
            $('.photo_cover') .find('img')
                .attr( 'src' , src );
        });

        // init swip event
        $('.cover_slide_img').hammer({
            swipe_velocity: 0.3,
            prevent_event: true
        })
            .on('swipeleft' , function(){
                goToIndex( index + 1 );
            })
            .on('swiperight' , function(){
                goToIndex( index - 1 );
            });
    })();



    // init photo resize event
    !!(function(){
        var _totalScale = 1;
        var _totalRotate = 0;
        var _lastScale ;
        var _lastRotate ;
        var _lastTx = 0 ;
        var _lastTy = 0 ;
        var _isTransforming = false;
        var _$img = $('#photo_img');
        var _$parent = _$img.closest('.photo_wrap');
        $('#mask').hammer({
            transform_always_block: true,
            drag_block_vertical: true,
            drag_block_horizontal: true
        })
        .on("transformstart" , function( event ){
            _isTransforming = true;
            var gesture = event.gesture;
            var center = gesture.center;
            // var offset = $(this).offset();
            // var oWidth = parseInt( $(this).css('width') );
            // var oHeight = parseInt( $(this).css('height') );
            // var scale = _totalScale;
            // var rotation = _totalRotate;

            var $p = _$parent.children();
            
            var off = $p.offset();

            // get center percentage
            // var tmpy = ( center.pageY - offset.top - 
            //     ( center.pageX - ( oWidth * scale * Math.sin( rotation ) + offset.left ) )
            //      * Math.tan( rotation ) ) * Math.cos( rotation );
            // var tmpx = ( center.pageX - ( oWidth * scale * Math.sin( rotation ) + offset.left ) ) / Math.cos( rotation )
            //     + tmpy * Math.tan( rotation );
            // var origin = ~~( tmpx / scale ) + 'px ' + ~~( tmpy / scale ) + 'px';
            $p[0].style.webkitTransformOrigin = ( center.pageX - off.left ) + 'px' + ( center.pageY - off.top ) + 'px';
            //log( origin );
        })
        .on("transform", function(event) {
            var gesture = event.gesture;
            _lastScale = gesture.scale;
            _lastRotate = (gesture.rotation || 0);
            // var scale = _totalScale * _lastScale;
            // var rotation = _totalRotate + _lastRotate;

            // change image transform
            var transform = 'scale(' + _lastScale + ') rotate(' + _lastRotate + 'deg)';
            //_$img[0].style.webkitTransformOrigin = '0 0';
            var $wrap = _$parent.children();
            $wrap[0].style.webkitTransform = transform;
            $wrap[0].style.transform = transform;
        })
        .on('transformend' , function( event ){
            setTimeout(function(){
                _isTransforming = false;
            } , 100);
            _totalScale *= _lastScale;
            _totalRotate += _lastRotate;

            $('<div class="photo_wrap_inner"></div>')
                .append( _$parent.children() )
                .appendTo( _$parent );
            // var off = _$img.offset();
            // // add photo_wrap_inner scale and rotate to img
            // var transform = 'scale(' + _totalScale + ') rotate(' + _totalRotate + 'deg)';
            // _$img[0].style.webkitTransform = transform;
            // _$img[0].style.transform = transform;

            // log( transform );
            // // reset photo_wrap_inner scale and rotate
            // _$img.parent()[0].style.webkitTransform = 'scale(1) rotate(0deg)';
            // _$img.parent()[0].style.transform = 'scale(1) rotate(0deg)';
            // var off2 = _$img.offset();

            // var ofx = off.left - off2.left;
            // var ofy = off.top - off2.top;
            // var d   = Math.sqrt( ofx * ofx + ofy * ofy );
            // _lastTy -= ofy / Math.cos( _totalRotate ) - ( ofy * Math.tan( _totalRotate ) + ofx ) * Math.sin( _totalRotate );
            // _lastTx -= ofy / Math.sin( _totalRotate ) - ( ofy * Math.tan( _totalRotate ) - ofx ) * Math.cos( _totalRotate );

            // log( _lastTy + ' |||| ' + _lastTx );
            // _$img.css({
            //     marginLeft: _lastTx ,
            //     marginTop: _lastTy 
            // });
        })
        .on('drag' , function( event ){
            if( _isTransforming ) return;
            _$parent.children().css({
                marginLeft: event.gesture.deltaX,
                marginTop: event.gesture.deltaY
            });
        })
        .on('dragend' , function( event ){
            // _lastTx += event.gesture.deltaX,
            // _lastTy += event.gesture.deltaY
            $('<div class="photo_wrap_inner"></div>')
                .append( _$parent.children() )
                .appendTo( _$parent );
        });


        // submit photo to server
        $('#confirm_btn').click( function(){
            var oWidth  = parseInt( _$img.css('width') );
            var oHeight = parseInt( _$img.css('height') );
            var off     = _$img.offset();
            var off2    = _$parent.offset();
            var data    = {
                width   : oWidth * _totalScale,
                height  : oHeight * _totalScale,
                'image_base64'    : _$img.attr('src'),
                rotate  : _totalRotate,
                x : off2.left - off.left,
                y : off2.top - off.top,
                cid:1,
                type: 'mobile'
            }

            $('.photo_compounding').fadeIn();
            $('.photo_compounding_bg').css({marginTop:'-100%',opacity:0}).animate({marginTop:'10%',opacity:1});
            loadingInterval = setInterval(showLoadingIcons,4000);
            showLoadingIcons();

            $.ajax({
                type: "POST",
                url: "../web/index.php?r=photo/uploadimage",
                data: data,
                success: function(res) {
                    $('#successpage').fadeIn();
                    $('.photo_compounding').fadeOut();
                    clearInterval(loadingInterval);
                    // display thumbnail
                    $('#successpage .img_shadow').attr('src','../web'+res.data.path);
                    // bind download link
                    $('#successpage .suc_btn2').attr('href','../web'+res.data.path.replace('.jpg','-b.jpg'));
                },
                error: function() {
                    $('.photo_compounding').fadeOut();
                    clearInterval(loadingInterval);
                },
                dataType: 'json'
            });
        });

        function showLoadingIcons() {
            $('.photo_compounding_i1').stop(true,true).delay(400).fadeIn(1000);
            $('.photo_compounding_i2').stop(true,true).delay(800).fadeIn(1000);
            $('.photo_compounding_i3').stop(true,true).delay(1200).fadeIn(1000);
            $('.photo_compounding_i4').stop(true,true).delay(1600).fadeIn(1000);
            $('.photo_compounding_i5').stop(true,true).delay(2000).fadeIn(1000,function(){
                $('.photo_compounding_i img').stop(true,true).fadeOut(500);
            });
        }


        $('#successpage .suc_btn1').click(function(){
            $('#successpage').fadeOut();
        });
    })();


    $('.suc_share').click(function() {
        if(user == null) {
            $('.cover_pop2').animate({bottom:0},500);
            $('.pop_box').hide();
            $('#pop_login').show();
            $.cookie('last_page', 'm-index-reg', { expires: 7, path: '/' });
        }
        else {
            $('#sharepage').show();
        }
    });




    // for debug
    function log( msg ){
        $('#tip').append( msg + '<br/>' );
    }
})();