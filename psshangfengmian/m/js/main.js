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
   
    // for step1 file upload
    $('#step1_upload_file')
        .change(function(){
            if (this.files && this.files[0] && FileReader ) {
                //..create loading
                $loading.show();
                var reader = new FileReader();
                reader.onload = function (e) {
                    // hide other pages
                    $('.page').hide();
                    $checkpage.show();
                    // change checkpage img
                    var $img = $checkpage.find('.photo_com img');
                    $img.attr('src' , e.target.result );
                    // TODO .. set file to right size
                    // remove loading
                    $loading.hide();
                };
                reader.readAsDataURL(this.files[0]);
            }
        });

    // photo checkpage for photo ok btn tap event
    $('#checkpage-ok').click(function(){
        // hide checkpage
        $checkpage.hide();
        // show mainpage
        $mainpage.show();
        // change image src attribute
        $mainpage.find('.img_shadow')
            .attr('src' , 
                $checkpage.find('.photo_com img')
                    .attr('src') );
    });

    // init img load event , to resize suitable size
    $mainpage.find('.img_shadow').on('load' , function(){
        $(this).css({
            width: 'auto',
            height: 'auto'
        });
        var img = this;
        var tarHeight   = 395;
        var tarWidth    = 390;
        setTimeout(function(){
            var width   = img.width;
            var height  = img.height;
            if( width > tarWidth || height > tarHeight ){
                if( width / height > tarWidth / tarHeight ){
                    height  = tarWidth * height / width;
                    width   = tarWidth;
                } else {
                    width   = tarHeight * width / height;
                    height  = tarHeight;
                }
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
        $coverpage.show()
            .css({
                bottom: '100%',
                zIndex: 2
            })
            .animate({bottom:0},500,'easeInOutQuart');

        $coverpage.find('.cover_slide_home')
            .removeClass( 'cover_slide_home' );
        $coverpage.find('.step1_btn')
            .hide();

        $coverpage
            .find('.step1home_tips')
            .hide();
        $coverpage
            .find('.photo_btn')
            .show();
    });

    var initSlider = function( $cover_slide ){

    }
    // init cover slider
    !!(function(){
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
        $('.cover_slide').hammer({
            swipe_velocity: 0.3
        })
        .on('swip' , function(){
            return false;
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
        $('#mask').hammer({
            transform_always_block: true
        }).on("transform", function(event) {
            _isTransforming = true;
            var gesture = event.gesture;
            _lastScale = gesture.scale;
            _lastRotate = (gesture.rotation || 0);
            var scale = _totalScale * _lastScale;
            var rotation = _totalRotate + _lastRotate;
            // change image transform
            var transform = 'scale(' + scale + ') rotate(' + rotation + 'deg)';
            //_$img[0].style.webkitTransformOrigin = '0 0';
            _$img[0].style.webkitTransform = transform;
            _$img[0].style.transform = transform;
        })
        .on('transformend' , function( event ){
            setTimeout(function(){
                _isTransforming = false;
            } , 100);
            _totalScale *= _lastScale;
            _totalRotate += _lastRotate;
        })
        .on('drag' , function( event ){
            if( _isTransforming ) return;
            _$img.css({
                marginLeft: _lastTx + event.gesture.deltaX,
                marginTop: _lastTy + event.gesture.deltaY
            });
        })
        .on('dragend' , function( event ){
            _lastTx += event.gesture.deltaX,
            _lastTy += event.gesture.deltaY
        });


        // submit photo to server
        $('#confirm_btn').click( function(){
            var data = {
                rotate: _totalRotate,
                scale: _totalScale,
                movex: _lastTx,
                movey: _lastTy
            }
        });
    })();


    // for debug
    function log( msg ){
        $('#tip').append( msg + '<br/>' );
    }
})();