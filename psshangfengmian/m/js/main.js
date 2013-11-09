/**
 * main js for psshangfengmian
 */
!!(function(){
    // loading
    var $loading = $('.loading');
    var $homepage = $('#homepage');
    var $mainpage = $('#mainpage');
    // photo check page
    var $checkpage = $('#checkpage');
    var changePhoto = function( imgSrc ){
        var $img = $photo.find('img');
        if( !$img.length ){
            $img = $('<img />').appendTo( $photo );
        }
        $img.attr('src' , imgSrc );
    }
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
        // TODO .. check photo suitable rize

    });

    // init change cover btn
    $('#change_cover').click(function(){

    });

    // init photo resize event
    !!(function(){
        var _totalScale = 1;
        var _totalRotate = 0;
        var _lastScale ;
        var _lastRotate ;
        var _lastTx = 0 ;
        var _lastTy = 0 ;
        var _isTransforming = false;
        var _$img = $('.img_shadow');
        $('.photo_mask').hammer({
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
            _$img.css({
                'webkitTransform' : transform ,
                'transform' : transform
            });
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
    })();
})();