<?php
    if (preg_match('/(up.browser|up.link|mmp|symbian|smartphone|midp|wap|phone|android)/i', strtolower($_SERVER['HTTP_USER_AGENT']))) {
        header("Location: m/index.html",true,303);
        die();
    }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <title>卡尼尔</title>
    <link href="css/jsPane.css" rel="stylesheet" type="text/css" />
    <link href="css/layout.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/modernizr-2.5.3.min.js"></script>
</head>
<body id="" data-page="index" class="home_page">
    <!--  -->
    <?php include('./include/header.php');?>
    <!--  -->
    <div class="main">
        <!--  -->
        <div class="bg">
            <div class="bg_green" data-browser="uglyie" data-style="left:-170%;transform:rotate(-40deg);" data-animate="transform:rotate(-28deg);left:-60%;" data-delay="500" data-time="1000" data-easing="easeInOutQuart"></div>
            <div class="bg_red" data-browser="uglyie" data-style="left:100%;transform:rotate(-40deg);" data-animate="transform:rotate(-28deg);left:50%;" data-delay="1000" data-time="1000" data-easing="easeInOutQuart"></div>
        </div>
        <!--  -->
        <div class="home_ad" data-style="opacity:0;left:-250px;" data-animate="opacity:1;left:10px;" data-delay="1500" data-time="1000" data-easing="easeInOutQuart"></div>
        <!--  -->
        <div class="login">
            <div id="login_nologin">
                <a class="link_login" href="#">登录</a>
                <a class="link_register" href="#">注册</a>
            </div>
            <div id="login_logined">
                <span class="nickname"></span> | <a class="link_logout" href="#">退出</a>
            </div>
        </div>

        <!--  -->
        <div class="other" data-style="opacity:0;" data-animate="opacity:1;" data-delay="2500" data-time="500" data-easing="easeInOutQuart">
            <span class="other_beauty"><a href="list"><img src="i/other_l1.png" /></a></span>
            <a class="other_rule" href="#"><img src="i/other_l2.png" /></a>
            <a class="other_watsons" target="_blank" href="http://detail.tmall.com/item.htm?spm=a1z10.1.w5870298-3258991027.1.G4XOSc&id=20219634310"><img src="i/other_watsons.png" /><img src="i/other_l3.png" /></a>
        </div>
        <!--  -->

        <div class="pages" id="step1">
            <div id="step1_html5" style="display: none;" data-style="opacity:0;padding-top:100px;" data-animate="opacity:1;padding-top:0px;" data-delay="2000" data-time="1000" data-easing="easeInOutQuart">
                <div class="page home">
                    <!--  -->
                    <div id="step1_select">
                        <div class="home_main">
                            <img class="img_shadow" src="i/home_demo.jpg" />
                            <div class="home_drag">把图片拖到这里</div>
                            <div class="camera_wrap" style="display:none;">
                                <video autoplay="true" id="video" width="701" height="526"></video>
                                <canvas width="701" height="526"></canvas>
                            </div>
                            <audio id="shoot_audio">
                                <source src="i/shoot.ogg" type="audio/ogg" />
                                <source src="i/shoot.mp3" type="audio/mpeg" />
                            </audio>
                        </div>
                        <div id="shutter_btn"><img src="i/step1_sure.png" /></div>
                        <!--  -->
                        <div class="pho_btn">
                            <a id="take_photo_btn" href="#" data-style="opacity:0;top:-300px" data-animate="opacity:1;top:0px;" data-delay="2200" data-time="1000" data-easing="easeInOutQuart"><img src="i/home_btn1.png" /></a>
                            <a id="upload_photo_btn" href="#" data-style="opacity:0;top:-245px" data-animate="opacity:1;top:60px;" data-delay="2000" data-time="1000" data-easing="easeInOutQuart"><input type="file" id="photo_upload" name="photo_upload" /><label for="photo_upload"><img src="i/home_btn2.png" /></label></a>
                        </div>
                        <!--  -->
                        <div class="home_explain"></div>
                    </div>
                </div>
                <div class="page photo" id="step1_photo" style="display:none;">
                    <div class="step_ps">
                        <div class="ps_pho_wrap">
                            <div class="ps_pho_white"></div>
                            <img class="ps_pho" src="i/demo1.jpg">
                        </div>
                        <div class="ps_cover"><a href="#" class="ps_btn_center"></a><img src="./image/f1.png"></div>
                        <div class="ps_btn">
                            <a href="#" class="ps_btn_up"></a>
                            <a href="#" class="ps_btn_down"></a>
                            <a href="#" class="ps_btn_right"></a>
                            <a href="#" class="ps_btn_left"></a>
                        </div>
                    </div>
                    <div class="step1_tit"></div>
                    <div class="pho_btn">
                        <a href="#" id="photo_ok_btn"><img src="i/step1_sure.png"></a>
                        <a class="pho_btn_colred" id="photo_repick" href="#"><img src="i/step1_choose.png"></a>
                    </div>
                    <ul class="pho_cover">
                        <li class="active"><div class="line" style="background:#fc1996;"></div><img data-cid="1" data-big="./image/f1.png" src="./image/f1i.png"></li>
                        <li><div class="line" style="background:#e2b11b;"></div><img data-cid="2" data-big="./image/f2.png" src="./image/f2i.png"></li>
                        <li><div class="line" style="background:#6cda27;"></div><img data-cid="3" data-big="./image/f3.png" src="./image/f3i.png"></li>
                    </ul>
                </div>
            </div>

            <div class="page home" id="step1_flash" style="display: none;" data-style="opacity:0;padding-top:100px;" data-animate="opacity:1;padding-top:0px;" data-delay="2000" data-time="1000" data-easing="easeInOutQuart">
                <object id="step1_flash_player" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="598" height="551">
                    <param name="allowScriptAccess" value="always"/>
                    <param name="movie" value="main.swf"/>
                    <param name="quality" value="high"/>
                    <param name="wmode" value="transparent"/>
                    <param name="flashVars" value="xml=xml/config.xml&User_id=xxx"/>
                    <embed name="flash" src="main.swf" wmode="transparent" quality="high" flashVars="xml=xml/config.xml&User_id=xxx" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" type="application/x-shockwave-flash" width="598" height="551" allowScriptAccess="always"></embed>
                </object>
                <div class="ps-icon"></div>
            </div>


        </div>


        <!-- loading -->
        <div class="step_load">
            <div class="step_load_uglyie_overlay"></div>
            <div class="step_load_wrap">
                <img src="i/loading_bg.png" class="loading_bg" />
                <img src="i/loading_round1.png" class="loading_round1 loading_round" />
                <img src="i/loading_round2.png" class="loading_round2 loading_round" />
                <img src="i/loading_round3.png" class="loading_round3 loading_round" />
                <img src="i/loading_round4.png" class="loading_round4 loading_round" />
                <img src="i/loading_round5.png" class="loading_round5 loading_round" />
                <img src="i/loading_text.gif" class="loading_text" />
            </div>
        </div>

        <!-- step 2  -->
        <div class="step_succ" id="step2">
            <div class="step_succ_con">
                <h2 class="step_succ_tit"><img src="i/title_step_succ.gif" alt="恭喜你PS成功封面照" /></h2>
                <div class="step_succ_pho" data-style="opacity:0;" data-animate2="opacity:1;" data-delay="1000" data-time="1000" data-easing="linear"><img src="i/demo_succ.jpg" width="335" height="428" /></div>
                <div class="step_succ_info">
                    <div class="step_succ_tip" data-style="opacity:0;margin-left:600px;" data-animate2="opacity:1;margin-left:10px;" data-delay="400" data-time="300" data-easing="easeInOutQuart">
                        <p class="step_succ_tip1">赶紧分享给小伙伴求投票！</p>
                        <p class="step_succ_tip2">只要闯进Top100,</p>
                        <p class="step_succ_tip3">即有机会真的成为时尚杂志封面女孩，</p>
                        <p class="step_succ_tip4">并与郭采洁见面！</p>
                    </div>
                    <a href="#" class="step_succ_btn step_succ_btn1" data-style="opacity:0;margin-left:600px;" data-animate2="opacity:1;margin-left:55px;" data-delay="600" data-time="300" data-easing="linear"><img src="i/succ_share.png" /></a>
                    <a href="#" class="step_succ_btn step_succ_btn2" data-style="opacity:0;margin-left:600px;" data-animate2="opacity:1;margin-left:55px;" data-delay="800" data-time="300" data-easing="linear"><img src="i/succ_again.png" /></a>
                </div>
            </div>
            <a href="#" target="_blank" class="btn_download"><img src="i/btn_download.gif" /></a>
            <a href="#" class="step_back"><img src="i/step_back.png" /></a>
        </div>

        <!-- step 3  -->
        <div class="step_log2" id="step3">
            <div class="step_log_con">
                <h2 class="step_log_tit"><img src="./i/title_step_log1.gif" alt="请选择一种社交账号登录" /></h2>
                <div class="step_log_sns cs-clear">
                    <a href="#" class="log_snsitem tencent_url"><img src="i/sns_tx.png" />腾讯微博</a>
                    <a href="#" class="log_snsitem qq_url"><img src="i/sns_qzone.png" />QQ空间</a>
                    <a href="#" class="log_snsitem weibo_url"><img src="i/sns_weibo.png" />新浪微博</a>
                    <a href="#" class="log_snsitem renren_url"><img src="i/sns_ren.png" />人人网</a>
                </div>
                <h3 class="step_logup_tit">如果没有以上平台账号</h3>
                <a href="#" class="step_logup_btn">请点击这里</a>
            </div>
            <a href="#" class="step_back"><img src="i/step_back.png" /></a>
        </div>

        <!-- step 4  -->
        <div class="step_log2" id="step4">
            <div class="step_log_con">
                <h2 class="step_log_tit"><img src="./i/title_step_log.gif" title="注册账号" /></h2>
                <div class="logreg_con">
                    <form action="web/index.php?r=user/register" method="POST" class="form_register_home">
                        <div class="logreg_fi cs-clear">
                            <label>用户名</label>
                            <span class="reg_nickname"></span>
                            <input type="hidden" class="val_nickname" name="nickname" value=""/>
                        </div>
                        <div class="logreg_fi cs-clear">
                            <label>Email</label>
                            <input type="text" name="email" class="ipt_t" />
                        </div>
                        <div class="logreg_fi cs-clear">
                            <label>手机</label>
                            <input type="text" name="tel" class="ipt_t" />
                        </div>
                        <div class="logreg_fi cs-clear">
                            <label>密码</label>
                            <input type="password" name="password" class="ipt_t" />
                        </div>
                        <div class="logreg_fi cs-clear">
                            <label>重复密码</label>
                            <input type="password" name="password_confirm" class="ipt_t" />
                        </div>
                        <input type="submit" class="logreg_btn" name="submit" value="提交" />
                    </form>
                    <p class="logreg_tips">*如果忘记密码，请联系卡尼尔官方新浪微博</p>
                </div>
            </div>
            <a href="#" class="step_back"><img src="i/step_back.png" /></a>
        </div>

        <!-- step 5  -->
        <div class="step_join" id="step5">
            <div class="step_join_con">
                <div class="step_join_tips" data-style="opacity:0;margin-left:600px;" data-animate2="opacity:1;margin-left:0;" data-delay="300" data-time="300" data-easing="linear">
                    <div class="step_join_tips1">感谢你参与由卡尼尔PS蜜乳主办的<br />“PS来真的，我要上封面！”活动。</div>
                    <div class="step_join_tips2">
                        <p>如果你的PS封面照得票数闯进了前100名，即有机会真的登上时尚杂志封面，成为最耀眼的时尚女孩！我们会在2014年1月XX日至XX日之间与你取得联系，请密切关注。</p>
                    </div>
                    <div class="step_join_tips3">同时恭喜你获得<br/>
                        全球首发卡尼尔PS蜜乳尝新优惠！<br/>
                        想要美美滴上杂志，它可是必备哦！
                    </div>
                </div>
                <a data-style="opacity:0;margin-left:600px;" data-animate2="opacity:1;margin-left:0;" data-delay="400" data-time="300" data-easing="linear" href="http://detail.tmall.com/item.htm?spm=a1z10.1.w5870298-3258991027.1.G4XOSc&id=20219634310" target="_blank" class="step_join_btn1"><img src="i/step_join_btn1.png" /></a>
                <a data-style="opacity:0;margin-left:600px;" data-animate2="opacity:1;margin-left:0;" data-delay="500" data-time="300" data-easing="linear" href="#" class="step_join_btn link_agian"><img src="i/step_join_btn2.png" /></a>
                <a data-style="opacity:0;margin-left:600px;" data-animate2="opacity:1;margin-left:0;" data-delay="600" data-time="300" data-easing="linear" href="list" class="step_join_btn"><img src="i/step_join_btn3.png" /></a>
                <a data-style="opacity:0;margin-left:600px;" data-animate2="opacity:1;margin-left:0;" data-delay="700" data-time="300" data-easing="linear" href="#" class="step_join_btn link_sharefriend"><img src="i/step_join_btn4.png" /></a>
                <a data-style="opacity:0;margin-left:600px;" data-animate2="opacity:1;margin-left:0;" data-delay="800" data-time="300" data-easing="linear" href="#" class="step_join_rule">活动规则</a>
            </div>
            <a href="#" class="step_back"><img src="i/step_back.png" /></a>
            <div class="product_ad">
                <div class="product_ad_bg" data-style="opacity:0;bottom:400px;" data-animate2="opacity:1;bottom:0px;" data-delay="1200" data-time="300" data-easing="easeInOutQuart"><img src="i/step6_ad_bg.png" /></div>
                <div class="product_ad_new" data-style="opacity:0;left:-200px;" data-animate2="opacity:1;left:0px;" data-delay="1700" data-time="300" data-easing="easeInOutQuart"><img src="i/step6_ad_new.png" /></div>
                <div class="product_ad_product" data-style="opacity:0;right:-200px;" data-animate2="opacity:1;right:-5px;" data-delay="1500" data-time="300" data-easing="easeInOutQuart"><img src="i/step6_ad_product.png" /></div>
                <div class="product_ad_tit" data-style="opacity:0;left:-200px;" data-animate2="opacity:1;left:15px;" data-delay="1600" data-time="300" data-easing="easeInOutQuart"><img src="i/step6_ad_tit.png" /></div>
            </div>
        </div>

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


    </div>

    <!-- html5 camera help -->
    <div class="camera_help">
        <img src="i/camera_help.png" />
    </div>
    <?php include('./include/footer.php');?>
    <?php include('./include/popup.php');?>
    <?php include('./include/jstpl.php');?>


    <script>var user = null;</script>
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="js/raphaeljs.min.js"></script>
    <script type="text/javascript" src="js/jquery.transform2d.js"></script>
    <script type="text/javascript" src="js/jquery.easing.1.3.js"></script>
    <script type="text/javascript" src="./js/handlebars-v1.1.2.js"></script>
    <script type="text/javascript" src="js/jquery.form.js"></script>
    <script type="text/javascript" src="js/jquery.validate.js"></script>
    <script type="text/javascript" src="js/jquery.mousewheel.js"></script>
    <script type="text/javascript" src="js/jquery.jscrollpane.js"></script>
    <script type="text/javascript" src="js/jquery.cookie.js"></script>
    <script type="text/javascript" src="js/jquery.dragupload.js"></script>
    <script type="text/javascript" src="js/global.js"></script>
    <script type="text/javascript" src="js/main.js"></script>
    <!--  -->
    <!-- IE -->
    <!--[if (IE 6)|(IE 7)|(IE 8)]>
    <link href="css/layoutIE.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="./js/json2.js"></script>
    <script src="js/IE.js"></script>
    <![endif]-->

    <!-- IE6 -->
    <!--[if IE 6]>
    <script src="js/IE6.js"></script>
    <script src="js/DD_belatedPNG.js"></script>
    <script>
        DD_belatedPNG.fix('.ps-icon,.other img,.home_ad,.other_watsons img,.header a,.share_tit1 img,.share_tit2 img,.step_succ_tip,.step_join_tips,.product_ad img,.bg_green,.bg_red,.step_load img');
        document.execCommand("BackgroundImageCache", false, true);
    </script>
    <![endif]-->
    <!--  -->
</body>
</html>