<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <meta name="keywords" content="" />
    <meta name="description" content="" />
    <title>卡尼尔</title>
    <link href="css/layout.css" rel="stylesheet" type="text/css" />
</head>
<body class="photowall_page" data-page="list">
    <!--  -->
    <?php include('./include/header.php');?>
    <!--  -->
    <div class="main">
        <!--  -->
        <div class="list">
            <!--  -->
            <div class="bg">
                <div class="bg_green" data-style="left:-2000px;transform:rotate(-40deg);" data-animate="transform:rotate(-28deg);left:-1153px;" data-delay="500" data-time="1000" data-easing="easeInOutQuart"></div>
                <div class="bg_red" data-style="bottom:-1499px;transform:rotate(-28deg);" data-animate="bottom:-999px" data-delay="1000" data-time="1000" data-easing="easeInOutQuart"></div>
            </div>
            <div class="login">
                <div id="login_nologin">
                    <a class="link_login" href="#">登录</a>
                    <a class="link_register" href="#">注册</a>
                </div>
                <div id="login_logined">
                    <span class="nickname"></span> | <a class="link_logout" href="#">退出</a>
                </div>
            </div>
            <!-- list   -->
            <div class="list_con">
                <div class="list_btn cs-clear">
                    <a href="index.php" data-style="opacity:0;" data-animate="opacity:1;" data-delay="400" data-time="500" data-easing="easeInOutQuart"><img src="i/list_btn1.png" /></a>
                    <a href="#" class="list_btn2 link_fillinfo" data-style="opacity:0;" data-animate="opacity:1;" data-delay="600" data-time="500" data-easing="easeInOutQuart"><img src="i/list_btn2.png"></a>
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
                <span class="other_beauty"><a href="#">还有比我更美的么？</a></span>
                <a class="other_rule" href="#">活动规则</a>
                <a class="other_watsons" target="_blank" href="http://detail.tmall.com/item.htm?spm=a1z10.1.w5870298-3258991027.1.G4XOSc&id=20219634310">屈臣氏天猫商城<strong>&gt;</strong></a>
            </div>
        </div>
        <!--  -->  
    </div>
    <!--  -->
    <div class="footer cs-clear">
        <div class="ft_phone">卡尼尔客户关怀中心 400-821-5068</div>
        <div class="ft_copyright">隐私条款 © GARNIER 2011 <span>沪ICP备09067306号</span></div>
    </div>

    <div class="overlay"></div>
    <div class="overlay_photo"></div>

    <!-- popup box -->
    <div class="cover_pop">
        <div class="cover_pop_close"></div>
        <div id="pop_voted_failed" class="pop_box">
            <div class="pop_content">
                <div class="failed_text failed_text1"><p>亲，票数珍贵，<br/>今天您已经投票10次，<br/>请明天再来支持！<br/><small>(每个帐号每天投票10次，每个作品限投一次)</small></p></div>
                <div class="failed_text failed_text2"><p>亲，票数珍贵，<br/>今天您已经投过一票了<br/>请明天再来支持！<br/><small>(每个帐号每天投票10次，每个作品限投一次)</small></p></div>
                <div class="failed_text failed_text3"><p>您已成功退出</p></div>
                <div class="failed_text failed_text4"><p>注册成功</p></div>
            </div>
        </div>
    </div>

    <!-- login box  -->
    <div class="step_log pop_login">
        <div class="step_log_con">
            <h2 class="step_log_tit"><img src="./i/title_step_log1.gif" alt="请选择一种社交账号登录" /></h2>
            <div class="step_log_sns cs-clear">
                <a href="#" class="log_snsitem tencent_url"><img src="i/sns_tx.png" />腾讯微博</a>
                <a href="#" class="log_snsitem weibo_url"><img src="i/sns_weibo.png" />新浪微博</a>
                <a href="#" class="log_snsitem renren_url"><img src="i/sns_ren.png" />人人网</a>
            </div>
            <h3 class="step_logup_tit">如果没有以上平台账号</h3>
            <a href="#" class="step_logup_btn">请点击这里</a>
        </div>
        <a href="#" class="step_back"><img src="i/step_back.png" /></a>
    </div>

    <div class="step_log pop_fillinfo">
        <div class="step_log_con">
            <h2 class="step_log_tit">注册账号</h2>
            <div class="logreg_con">
                <form action="web/index.php?r=user/register" method="POST" class="form_register">
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

    <div class="step_log pop_rule">
        <div class="step_log_con">
            <h2 class="step_log_tit"><img src="i/title_rule.gif" /></h2>
            <div class="pop_rule_text">
                <p>你还在PS照片吗？现在卡尼尔PS来真的,PS瑕疵即刻隐形蜜乳全新上市,富含光感美白反射因子和维生素CG,即刻减少5大肌肤瑕疵:提升白皙,均匀肤色,平滑肤质,隐形毛孔,不泛油光.5秒即可轻松推开抹匀全脸，一抹间立现无瑕润白美肌.屈臣氏有售!</p>
                <p>你还在PS照片吗？现在卡尼尔PS来真的,PS瑕疵即刻隐形蜜乳全新上市,富含光感美白反射因子和维生素CG,即刻减少5大肌肤瑕疵:提升白皙,均匀肤色,平滑肤质,隐形毛孔,不泛油光.5秒即可轻松推开抹匀全脸，一抹间立现无瑕润白美肌.屈臣氏有售!</p>
                <p>你还在PS照片吗？现在卡尼尔PS来真的,PS瑕疵即刻隐形蜜乳全新上市,富含光感美白反射因子和维生素CG,即刻减少5大肌肤瑕疵:提升白皙,均匀肤色,平滑肤质,隐形毛孔,不泛油光.5秒即可轻松推开抹匀全脸，一抹间立现无瑕润白美肌.屈臣氏有售!</p>
                <p>你还在PS照片吗？现在卡尼尔PS来真的,PS瑕疵即刻隐形蜜乳全新上市,富含光感美白反射因子和维生素CG,即刻减少5大肌肤瑕疵:提升白皙,均匀肤色,平滑肤质,隐形毛孔,不泛油光.5秒即可轻松推开抹匀全脸，一抹间立现无瑕润白美肌.屈臣氏有售!</p>
            </div>
        </div>
        <a href="#" class="step_back"><img src="i/step_back.png" /></a>
    </div>

    <?php include('./include/jstpl.php');?>

    <!--  -->
<!-- IE -->
<!--[if (IE 6)|(IE 7)|(IE 8)]>
    <link href="css/layoutIE.css" rel="stylesheet" type="text/css" />
<![endif]-->

<!-- IE6 -->
<!--[if IE 6]>
    <script src="js/IE6.js"></script>
    <script src="js/DD_belatedPNG.js"></script>
    <script>
        DD_belatedPNG.fix('*');
        document.execCommand("BackgroundImageCache", false, true);
    </script>
<![endif]-->
<!--  -->

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
</body>
</html>