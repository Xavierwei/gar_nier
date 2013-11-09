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
                    $homepage.hide();
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
        //TODO.. change image src attribute
        $mainpage.find('.img_shadow')
            .attr('src' , 
                $checkpage.find('.photo_com img')
                    .attr('src') );
        
    });


    // init 
})();