$(document).ready(function(){
    alert(1);
    $(window).scroll(function(){
        var top = $(window).scrollTop();
        $('.ie6nav').css({'top':top});
        alert(1);
    });
});