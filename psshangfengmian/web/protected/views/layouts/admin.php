<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
    "http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" version="XHTML+RDFa 1.0" dir="ltr">
<head profile="http://www.w3.org/1999/xhtml/vocab">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <link rel="shortcut icon" href="http://localhost:8888/gar_nier/data/misc/favicon.ico" type="image/vnd.microsoft.icon" />
    <meta name="Generator" content="Drupal 7 (http://drupal.org)" />
    <title></title>
    <link href='http://fonts.googleapis.com/css?family=PT+Sans+Narrow' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->request->baseUrl; ?>/css/admin.css" />
    <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl;?>/js/jquery.min.js"></script>
    <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl;?>/js/jquery-ui-1.10.3.custom.js"></script>
    <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl;?>/js/jquery.form.js"></script>
    <script type="text/javascript" src="<?php echo Yii::app()->request->baseUrl;?>/js/handlebars-v1.1.2.js"></script>
    <script type="text/javascript" language="javascript" src="<?php echo Yii::app()->request->baseUrl;?>/js/jquery.dataTables.js"></script>
</head>
<body>
<div class="wrapper">
    <div class="page-left">
        <div class="logo"><img src="images/logo.png" /></div>
        <div class="menu-list">
            <div class="menu-title">Testimonial</div>
            <ul>
                <li><a href="">Add Comment</a></li>
                <li><a href="">Edit Comment</a></li>
            </ul>
        </div>
        <div class="menu-list">
            <div class="menu-title">Ps Girl Cover</div>
            <ul>
                <li><a href="">Photos</a></li>
                <li><a href="">Users</a></li>
            </ul>
        </div>
    </div>
    <div class="page-right">
        <div class="page-right-header">
            <div class="page-title">Photos</div>
            <a class="logout" href="">LOGOUT</a>
        </div>
        <div class="page-right-wrapper">
            <?php echo $content; ?>
        </div>
    </div>
</div>
</body>
</html>
