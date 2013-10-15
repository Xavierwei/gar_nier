if($('.touch').length>0)
{
    if($('body').hasClass('show-body'))
    {
        window.location.href = "./m/comments";
    }
    else
    {
        window.location.href = "m/";
    }

    if(navigator.userAgent.match(/iPad/i) == null)
    {

    }
}
if (jQuery.browser.version == 8.0 || jQuery.browser.version == 7.0 ) {

}


jQuery.easing.easeInOutBackLight = function (x, t, b, c, d , s) {
    if (s == undefined) s = 1.70158;
    if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
    return Math.pow( c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b , 0.2);
}


!!(function($) {

    builddot();
    var option = {
        onLoading  : function (object) {
        },
        deepSearch : true,
        minimumTime: 500,
        onComplete : function () {
        }
    }

    var imageCache = {};
    var imageCounter = 0;
    var imageLoadedNum = 0;
    var startTime = 0;
    var imgLoadFinished = function(){

        imageLoadedNum++;
        // show loading status
        option.onLoading( ~~ ( imageLoadedNum / imageCounter * 100 ) );
        if( imageLoadedNum == imageCounter ){
            var dur = new Date() - startTime;
            // complete all iamges
            dur > option.minimumTime ? option.onComplete() :
                setTimeout( function(){ option.onComplete() } , option.minimumTime - dur );
        }
    }
    var addImageForPreload = function( url ) {
        var image = $("<img />")
            .load( imgLoadFinished )
            ["error"]( imgLoadFinished )
            .attr( "src", url );
    };
    var findImageInElement = function (element) {
        var $el = $(element);

        if( $el.closest('.noload').length ) return;
        var url ;
        var bg = $el.css("background-image");
        var src = $el.attr('src');
        var match = null;
        if( bg != "none" ){
            bg = $.trim( bg );
            match = bg.match(/^url\((['"])([^'"]+)\1\)/);
            url = match ? match[2] : null;
        } else if ( src && element.nodeName.toLowerCase() == "img" ) {
            url = src;
        }

        if( url && !imageCache[ url ] ){
            imageCounter++;
            imageCache[ url ] = url + ( $.browser.msie && $.browser.version < 9 ? "?" + (+ new Date()) : '' );
        }
    }



    $.fn.queryLoader2 = function( opt ) {
        $.extend( option , opt || {} );

        imageLoadedNum = 0;

        this.each(function() {
            findImageInElement(this);
            if ( option.deepSearch == true ) {
                $(this).find("*:not(script)").each(function() {
                    findImageInElement(this);
                });
            }
        });

        // set start time
        startTime = + new Date();
        // preload image
        for (var url in imageCache ) {
            addImageForPreload( imageCache[url] );
        }

        return this;
    };

})(jQuery);




var animation_begins = {
    "resize-win":  function(){
        $(window).trigger('resize');
    },
    "show-sina": function(){
        this.show();
    }
}

function builddot(){
    for(var i=11;i<33;i++)
    {
        var ao = 360/22 * i;
        x1 = 100 + 100 * Math.cos(-ao * 3.14 /180 );
        y1 = 100 + 100 * Math.sin(-ao * 3.14 /180 );
        $('<div class="dot"></div>').css({top:x1,left:y1,opacity:1-((i-11)*3)*0.01}).attr('deg',ao).appendTo($('.pie'));
    }
}

var isUglyIe = $.browser.msie && $.browser.version <= 8;
var isMostUglyIe = $.browser.msie && $.browser.version <= 6 ;
// query loading
function loadComplete(){
    var fixShowPageLi = function(){

        // init show-text-box scroll
//        $('.girl-desc').bind('mousewheel', function(event, delta, deltaX, deltaY) {
//            var $wrap = $(this);
//            $wrap.scrollTop( $wrap .scrollTop() - 20 * delta );
//            return false;
//        });
        
        if( isUglyIe ) return;
        // init right pink bar ,and left green bar
        var $rightPink = $('.right-pink');
        var $leftPink = $('.left-pink-inner');
        var $leftGreen = $('.left-green-inner');
        var $bottonProduct = $('.product-bottom div');
        var detectTops = [{
            animate: function( top ){
                $rightPink.each(function(){
                    var $t = $(this);
                    if( $t.attr('init') )
                        return;
                    if( top > $t.offset().top ){
                        $t.animate({
                            marginLeft: -5
                        } , 1000 )
                        .attr('init' , 1);
                    }
                });
            }
        } , {
            animate: function( top ){
                $leftPink.each(function(){
                    var $t = $(this);
                    if( $t.attr('init') )
                        return;
                    if( top > $t.offset().top ){
                        $t.animate({
                            width: "100%"
                        } , 1000 )
                        .attr('init' , 1);
                    }
                });
            }
        } , {
            animate: function( top ){
                if( $bottonProduct.attr('init') )
                    return;
                if( top > $bottonProduct.parent().offset().top ){
                    setTimeout(function(){
                        $bottonProduct
                            .fadeIn(1000)
                    } , 500);
                    $bottonProduct
                    .attr('init' , 1);
                }
            }
        }];

        if($('.show-main').length>0)
        {
            $(window).scroll(function(){
                var top = $(this).scrollTop();
                var height = $(this).height();
                $.each(detectTops , function(i , obj){
                    obj.animate( top + height );
                });
            });
        }

        // for animate
        $('.show-box,.center-green').each(function( i ){
            var $t = $(this);
            var width = $t.hasClass('center-green') ? 170 : 310;
            var height = $t.hasClass('center-green') ? 115 : 245;
            setTimeout(function(){
                $t.show();
            } , i * 400 );
            $(this).delay( i * 400 ).animate({
                width: width
            } , 500 , function(){
                $(this).animate({
                    height: height,
                    left: 0
                } , 500 , function(){
                    // show content 
                    $(this).find('.girl-photo')
                        .add($(this).siblings('.show-text-box'))
                        .fadeIn();
                });
            })
        });
    }
    $('.loading').fadeOut(function(){
        fixShowPageLi();
        /* for animation */
        var ANIMATE_NAME = "data-animate";
        $('[' + ANIMATE_NAME + ']')
            .each(function(){
                var $dom = $(this);
                var tar = $dom.data('animate');
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
                $dom.delay( delay )
                    .animate( tarCss , time , easing );
                if( begin ){
                    setTimeout(function(){
                        animation_begins[begin].call( $dom );
                    } , delay);
                }
            });
        if( !isMostUglyIe ){

            if($('body').hasClass('home'))
            {
                // init skrollr
                setTimeout(function(){
                    skrollr.init({
                        smoothScrollingDuration: 600,
                        smoothScrolling:true,
                        easing: 'easeInOutQuart',
                        render: function(e){
                            if(e.curTop > 11700)
                            {
                                if($.browser.msie || $('html').hasClass('no-csstransforms3d'))
                                {
                                    $('.product-cube-face1').fadeOut();
                                    $('.product-cube-face2').fadeIn();
                                }
                                else
                                {
                                    $('.product-cube').addClass('product-cube-3d');
                                }

                            }
                            else
                            {
                                if($.browser.msie || $('html').hasClass('no-csstransforms3d'))
                                {
                                    $('.product-cube-face1').fadeIn();
                                    $('.product-cube-face2').fadeOut();
                                }
                                else
                                {
                                    $('.product-cube').removeClass('product-cube-3d');
                                }
                            }
                        }
                    });
                } , 4000 );
            }


        }
        
        // init second load animation
        $('.noload').removeClass('.noload')
        var $p2 = $('#p2');
        $(document.body).queryLoader2({
            minimumTime: 1000,
            onLoading: function( percentage ){
                $p2.css('width' , percentage + '%');
            },
            onComplete: function(){
                $('html,body').css('overflow-y','auto');
                $p2.fadeOut();
                // show page prev and page next navigater
                $('.page-nav-next').fadeIn();
            }
        });
    });
}

var loadedAnimation = function(){

    setTimeout(function(){
        $('.title').fadeOut(1000);
        $('.pie .dot').each(function(index){
            $(this).delay(index*25).fadeOut();
        });
        $('.pie .number').fadeOut();
        $('.pie .sepline').fadeIn();
        $('.pie .load-product').animate({'height':300});
        $('.pie .text').delay(100).animate({'height':74},function(){
//            $('.pie .product').delay(300).animate({bottom:1000,opacity:0});
//            $('.pie .text').delay(300).animate({top:1000,opacity:0});
//            $('.pie .sepline').delay(300).fadeOut(function(){
//                loadComplete();
//            });
        });


    },1000);
}

// query loading
$(document.body).queryLoader2({
    minimumTime: 1000,
    onLoading : function( percentage ){
        //$probar.css( 'width' , percentage + '%' );
        var count = parseInt(percentage/100 * 22);
        $('.pie .number').html(percentage);
        $('.pie .dot:lt('+count+')').fadeIn(1000);
        if(percentage > 20){
            $('.title1').fadeIn();
        }
        if(percentage > 30){
            $('.title2').fadeIn();
        }
        if(percentage > 40){
            $('.title3').fadeIn();
        }
        if(percentage > 70){
            $('.title4').fadeIn();
        }
        if(percentage > 83){
            $('.title5').fadeIn();
        }
    },
    onComplete: loadedAnimation
});
 

// init tangle color for cream
var initTangleColorTimer = null;
function initTangleColor (){
    clearTimeout( initTangleColorTimer );
    initTangleColorTimer = setTimeout(function(){
        var $mainRight = $('.main-right');
        var bottomOffset = $mainRight.removeClass('rotate-right')
            .find('.main-right-bottom')
            .offset();
        $mainRight.find('.product i')
            .each(function(){
                var off = $(this).offset();
                $(this).toggleClass('reverse' , off.top > bottomOffset.top );
            });
        $mainRight.addClass('rotate-right');
    } , 100);
}

if( !isMostUglyIe ){
    $(window)
        .scroll(initTangleColor)
        .resize(initTangleColor)
//        .scroll(function(){
//            location.hash="#" + $(this).scrollTop();
//        })
        // resize for models element width
        .resize(function(){
            var $models = $('#models');
            $models.width( $models.height() );
        });

    setTimeout(function(){
        window.scrollTo(0,0);
    } , 500 );
} else {
    // fix main-right
    var $right = $('.main-right');
    var rHeight = $right.height();
    var winHei = $(window).height();
    $(window).scroll(function(){
        var sTop = $(this).scrollTop();
        $right.stop(true , true ).animate({'top': sTop + winHei - rHeight } , 500);
    })
    .resize(function(){
        winHei = $(window).height();
    });
}



// for prev page and next page
var page_steps = [0 , 1037 , 3581 , 5505 , 7909 , 9923];
var nav_steps = [8 , 94 , 179 , 266 , 355];

$('.page-nav-next').click(function(){
    var scrollTop = $(window).scrollTop();
    var next_step = page_steps[page_steps.length-1] ;
    $.each(page_steps , function( i , step){
        if( scrollTop + 50 > step ){
            next_step = page_steps[i+1] || $(document).height();
        }
    });

    $('html,body').stop( true , true ).animate({
        scrollTop: next_step
    } , 2000 );
    return false;
});

// for navigater
$('.product-bg-wrap li').click(function(){
    var index = $(this).index();
    var tarScrollTop = page_steps[ index + 1 ];
    var tarNavTop = nav_steps[index];
    var currentNavTop = $('.product-circle-active').css('top');

    var time = 2000;
    $('html,body').stop(true,true)
        .animate({
            scrollTop: tarScrollTop
        } , time,function(){
//            $('.product-circle-active2').hide();
//            $('.product-circle-active').show();
//            $('.product-bg-wrap li span').removeClass('moving');
//            $('.product-bg-wrap li span').removeClass('active');
            $('.product-bg-wrap i').show();
        });
//    $('.product-circle-active').hide();
    $('.product-bg-wrap li .product-light2 img').css({'opacity':0});
//    $('.product-circle-active2').show().css({top:currentNavTop});
//    $('.product-circle-active2').stop(true,true).animate({top:tarNavTop});
//    $('.product-bg-wrap li span').addClass('moving');
//    $('.product-bg-wrap li').eq(index).find('span').addClass('active');
    $('.product-bg-wrap i').hide();
});

$('.product-bg-wrap li').hover(function(){
    if(!$(this).hasClass('skrollable-between'))
    {
        $(this).find('.product-light2 img').animate({opacity:1});
    }
},function(){
    $(this).find('.product-light2 img').animate({opacity:0},200);
});

if($('body').hasClass('show-body'))
{
    $.ajax({
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        url: 'data/gariner/comments?page=0',
        success: showComments
    });
}

function showComments(data) {
    for(var index in data)
    {

        var tmp = $('<div />').addClass('isotope-item');
        if(data[index].url.length)
        {
            var link = $('<a href="'+data[index].url+'" target="_blank"></a>').appendTo(tmp);
        }
        switch(data[index].Type)
        {
            case "0":
                tmp.addClass('isotope-item-pink');
                var photo = $('<div class="comment-photo"><div class="left"><img src="'+data[index].before+'" width="112" /></div><div class="right"><img src="'+data[index].after+'" width="112" /></div> </div>');
                if(data[index].url.length)
                {
                    photo.appendTo(link);
                }
                else
                {
                    photo.appendTo(tmp);
                }
                break;
            case "1":
                tmp.addClass('isotope-item-green');
                break;
            case "2":
                tmp.addClass('isotope-item-grey');
                break;
        }
        var header = $('<div class="comment-header">'+data[index].node_title+'</div>');
        var body = $('<div class="comment-body" />');
        var icon = $('<p class="comment-icon" />').appendTo(body);
        var tmall = data[index].Tmall;
        if(tmall != "")
            $('<img src="./img/icon_t'+tmall+'.png">').appendTo(icon);
        var diamondCount = data[index].Diamond;
        for(var i=0;i<diamondCount;i++)
        {
            $('<img src="./img/icon_diamond.png">').appendTo(icon);
        }
        var starCount = data[index].Star;
        for(var i=0;i<starCount;i++)
        {
            $('<img src="./img/icon_heart.png">').appendTo(icon);
        }
        body.append('<p class="comment-content">'+data[index].Body+'</p>');

        if(data[index].url.length)
        {
            header.appendTo(link);
            body.appendTo(link);
        }
        else
        {
            header.appendTo(tmp);
            body.appendTo(tmp);
        }
        tmp.appendTo( "#comment-list" );
    }
    $('#comment-list').isotope();
    changeCommentNav();
}

$('#comment-nav a').click(function(e){
    $('#comment-nav a').removeClass('active');
    $(this).addClass('active');
    e.preventDefault();
    var category = $(this).attr('rel');
    $('#comment-list').isotope({filter:category});
});

function changeCommentNav(){
    setTimeout(function(){
        $('#comment-nav').width($('#comment-list').width());
    },1000);

}
$(window).on('resize',changeCommentNav);


//$('#comment-list').infinitescroll({
//        navSelector  : '#page_nav',    // selector for the paged navigation
//        nextSelector : '#page_nav a',  // selector for the NEXT link (to page 2)
//        itemSelector : '.isotope-item',     // selector for all items you'll retrieve
//        state: {
//            currPage: 0
//        },
//        debug: false,
//        dataType: 'json',
//        loading: {
//            finishedMsg: 'No more pages to load.',
//            img: 'http://i.imgur.com/qkKy8.gif'
//        },
//        appendCallback: false
//        //path: [siteurl+'data/third_content/all_resources?perpage=' + perpage + '&page=', '']
//        //path: ['data/garnier/comments?&page=', '']
//    },
//    // call Isotope as a callback
//    function( data ) {
//        showComments(JSON.parse(data),'append');
//    }
//);


$.Isotope.prototype._getCenteredMasonryColumns = function() {
    this.width = this.element.width();

    var parentWidth = this.element.parent().width();
    if($.browser.msie)
    {
        parentWidth = $(document).width()-120;
    }

    // i.e. options.masonry && options.masonry.columnWidth
    var colW = this.options.masonry && this.options.masonry.columnWidth ||
        // or use the size of the first item
        this.$filteredAtoms.outerWidth(true) ||
        // if there's no items, use size of container
        parentWidth;


    var cols = Math.floor( parentWidth / colW );
    cols = Math.max( cols, 1 );

    // i.e. this.masonry.cols = ....
    this.masonry.cols = cols;
    // i.e. this.masonry.columnWidth = ...
    this.masonry.columnWidth = colW;
};

$.Isotope.prototype._masonryReset = function() {
    // layout-specific props
    this.masonry = {};
    // FIXME shouldn't have to call this again
    this._getCenteredMasonryColumns();
    var i = this.masonry.cols;
    this.masonry.colYs = [];
    while (i--) {
        this.masonry.colYs.push( 0 );
    }
};

$.Isotope.prototype._masonryResizeChanged = function() {
    var prevColCount = this.masonry.cols;
    // get updated colCount
    this._getCenteredMasonryColumns();
    return ( this.masonry.cols !== prevColCount );
};

$.Isotope.prototype._masonryGetContainerSize = function() {
    var unusedCols = 0,
        i = this.masonry.cols;
    // count unused columns
    while ( --i ) {
        if ( this.masonry.colYs[i] !== 0 ) {
            break;
        }
        unusedCols++;
    }
    return {
        height : Math.max.apply( Math, this.masonry.colYs ),
        // fit container to columns that have been used;
        width : (this.masonry.cols - unusedCols) * this.masonry.columnWidth
    };
};


// init tmll
$('.tmall').hover(function(){
    $(this).animate({
        top: 93,
        right: 0
    } , 300 );
} , function(){
    var sTop = $(window).scrollTop();
    if( sTop > 1000 ){
        $(this).animate({
            top: 78,
            right: -76
        } , 300 );
    }
});

$('.playvideo').fancybox({
    maxWidth: 768,
    maxHeight: 432,
    type: 'iframe',
    iframe: {scrolling:'no'},
    openMethod : 'dropIn',
    padding: 0
});

(function ($, F) {
    F.transitions.dropIn = function() {
        var endPos = F._getPosition(true);
        endPos.opacity = 0;
        endPos.top = (parseInt(endPos.top, 10) - 400);
        F.wrap.css(endPos).show().animate({
            top: endPos.top + 400,
            opacity: 1
        }, {
            easing: 'easeOutQuart',
            duration: 800,
            complete: F._afterZoomIn
        });
    };

    F.transitions.dropOut = function() {
        F.wrap.removeClass('fancybox-opened').animate({
            top: '-=200'
        }, {
            duration: F.current.closeSpeed,
            complete: F._afterZoomOut
        });
    };

}(jQuery, jQuery.fancybox));


//tracking
$('.sina-share').bind('click',function(){
    ga('send', 'event', 'sina', 'follow', 'follow');
});

$('.product-bg li').eq(0).bind('click',function(){
    ga('send', 'event', 'PRO', '1', '1');
});

$('.product-bg li').eq(1).bind('click',function(){
    ga('send', 'event', 'PRO', '2', '2');
});

$('.product-bg li').eq(2).bind('click',function(){
    ga('send', 'event', 'PRO', '3', '3');
});

$('.product-bg li').eq(3).bind('click',function(){
    ga('send', 'event', 'PRO', '4', '4');
});

$('.product-bg li').eq(4).bind('click',function(){
    ga('send', 'event', 'PRO', '5', '5');
});

$('.tmall').bind('click',function(){
    ga('send', 'event', 'tmall', 'tmall', 'tmall');
});

$('.tmall-link').bind('click',function(){
    ga('send', 'event', 'tmall', 'tmall', 'tmall');
});