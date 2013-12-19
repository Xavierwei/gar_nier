<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <title>卡尼尔</title>
    <link href="css/jsPane.css" rel="stylesheet" type="text/css" />
    <link href="css/layout.css" rel="stylesheet" type="text/css" />
</head>
<body class="sina_photowall photowall_page" data-page="list">

    <div class="main">
        <!--  -->
        <div class="list">
            <!--  -->
            <div class="bg">
                <div class="bg_green" data-browser="uglyie" data-style="left:-2000px;transform:rotate(-40deg);" data-animate="transform:rotate(-28deg);left:-1153px;" data-delay="500" data-time="1000" data-easing="easeInOutQuart"></div>
                <div class="bg_red" data-browser="uglyie" data-style="bottom:-1499px;transform:rotate(-28deg);" data-animate="bottom:-999px" data-delay="1000" data-time="1000" data-easing="easeInOutQuart"></div>
            </div>

            <div class="login">
                <div id="login_nologin">
                    <a class="link_sina" href="#">登录</a>
                    <a class="link_sina" href="#">注册</a>
                </div>
                <div id="login_logined">
                    <span class="nickname"></span> | <a class="link_logout" href="#">退出</a>
                </div>
            </div>
            
            <!-- list   -->
            <div class="list_con">
                <div class="list_btn cs-clear">
                    <a href="index-sina" data-style="opacity:0;" data-animate="opacity:1;" data-delay="400" data-time="500" data-easing="easeInOutQuart"><img src="i/list_btn1.png" width="102" height="30" /></a>
                    <a href="#" class="list_btn2 link_fillinfo" style="display: block;"><img src="i/list_btn2.png" width="122" height="30" /></a>
                </div>
                <!--   -->
                <div class="list_listnav cs-clear">
                    <a href="#new" class="on" data-style="opacity:0;" data-animate="opacity:1;" data-delay="1200" data-time="500" data-easing="easeInOutQuart"><img src="i/text_list_listnav1.png" /></a>
                    <a href="#popular" class="" data-style="opacity:0;" data-animate="opacity:1;" data-delay="1000" data-time="500" data-easing="easeInOutQuart"><img src="i/text_list_listnav2.png" /></a>
                    <a href="#my" class="link_my" data-style="opacity:0;" data-animate="opacity:1;" data-delay="800" data-time="500" data-easing="easeInOutQuart"><img src="i/text_list_listnav3.png" /></a>
                </div>
                <!--  -->
                <div class="lsit_explain" data-style="opacity:0;" data-animate="opacity:1;" data-delay="600" data-time="500" data-easing="easeInOutQuart">
                    <p class="lsit_explain1">PS你的时尚杂志封面照，火速邀请好友投票支持。<br />得票最多的前100名即有机会真的登上时尚杂志封面，成为最耀眼的时尚女郎！</p>
                    <p class="lsit_explain2">只要参与，100%获得全球首发卡尼尔PS蜜乳尝新优惠!</p>
                </div>
                <!--   -->
                <div class="pho_list cs-clar" id="photowall_list" data-type="new" data-page="0">

                </div>

                <div class="cs-clear"></div>
            </div>
            <!--  -->
            <div class="other" data-style="opacity:0;" data-animate="opacity:1;" data-delay="2500" data-time="500" data-easing="easeInOutQuart">
                <span class="other_beauty"><a href="list-sina"><img src="i/other_l1.png" /></a></span>
                <a class="other_rule" href="#"><img src="i/other_l2.png" /></a>
                <a class="other_watsons" target="_blank" href="http://detail.tmall.com/item.htm?spm=a1z10.1.w5870298-3258991027.1.G4XOSc&id=20219634310"><img src="i/other_watsons.png" /><img src="i/other_l3.png" /></a>
            </div>
        </div>
        <!--  -->  
    </div>
    <!--  -->

    <div class="step_sharefriends" id="step6">
        <div class="step_log_con step_sharefriends1">
            <h2 class="step_log_tit"><img src="./i/title_share.gif" title="邀请好闺蜜一起来参加" /></h2>
            <div class="sharecon">
                <textarea id="share_body">快来看我PS的杂志封面！</textarea>
                <div class="share_img"><img src="" width="100" /></div>
                <div class="cs-clear"></div>
            </div>
            <div class="friend_list_wrap">
                <ul id="friend_list">

                </ul>
            </div>
            <input type="button" id="btn_sharefriend" value="分享" />
        </div>
        <div class="step_log_con step_sharefriends2">
            <h2 class="step_log_tit"><img src="./i/title_share.gif" title="邀请好闺蜜一起来参加" /></h2>
            <div class="step_sharefriends_tip1"><img src="./i/text_step_share.png" /></div>
            <a href="http://detail.tmall.com/item.htm?spm=a1z10.1.w5870298-3258991027.1.G4XOSc&id=20219634310" target="_blank" class="step_join_btn1"><img src="i/step_join_btn1.png" /></a>
            <a href="#" class="step_join_btn link_agian"><img src="i/step_join_btn2.png" /></a>
            <a href="list" class="step_join_btn"><img src="i/step_join_btn3.png" /></a>
        </div>
        <a href="#" class="step_back"><img src="i/step_back.png" /></a>
    </div>

    <div class="overlay_photo"></div>
    <?php include('./include/popup.php');?>
    <?php include('./include/jstpl.php');?>
    <div class="step_log pop_sinalogin">
        <div class="sina_close"><img src="./i/sina_close.png" /></div>
        <iframe class="sinalogin" src="" frameborder="0" scrolling="no" width="640" height="360"></iframe>
    </div>

    <script>var user = null;</script>
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="js/modernizr-2.5.3.min.js"></script>
    <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="./js/handlebars-v1.1.2.js"></script>
    <script type="text/javascript" src="js/jquery.form.js"></script>
    <script type="text/javascript" src="js/jquery.validate.js"></script>
    <script type="text/javascript" src="js/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="js/jquery.jscrollpane.js"></script>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/global.js"></script>
    <script type="text/javascript" src="js/photowall.js"></script>
    <script type="text/javascript">
        $.cookie('last_page', 'sina-index-reg', { expires: 7, path: '/' });
        $('.sinalogin').attr('src','');
    </script>
    <!--  -->
    <!-- IE -->
    <!--[if (IE 6)|(IE 7)|(IE 8)]>
    <link href="css/layoutIE.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="./js/json2.js"></script>
    <script src="js/IE.js"></script>
    <![endif]-->

    <link href="css/layout-sina.css" rel="stylesheet" type="text/css" />
    <!-- IE6 -->
    <!--[if IE 6]>
    <script src="js/IE6.js"></script>
    <script src="js/DD_belatedPNG.js"></script>
    <script>
        DD_belatedPNG.fix('.phoPic_n,.phoPic_p,.phoPic_close,.failed_text,.other img,.home_ad,.other_watsons img,.header a,.share_tit1 img,.share_tit2 img,.step_succ_tip,.step_join_tips,.product_ad img,.bg_green,.bg_red,.step_load img,.lsit_explain,.list_listnav img');
        document.execCommand("BackgroundImageCache", false, true);
    </script>
    <![endif]-->
    <!--  -->
</body>
</html>