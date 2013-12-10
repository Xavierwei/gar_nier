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
    <link href="css/layout-sina.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="js/modernizr-2.5.3.min.js"></script>
</head>
<body id="" data-page="index" class="sina_home home_page">
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
    <script>
        parent.location.reload();
    </script>
</body>
</html>