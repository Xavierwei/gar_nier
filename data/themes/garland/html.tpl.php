<?php global $base_path;?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML+RDFa 1.0//EN"
"http://www.w3.org/MarkUp/DTD/xhtml-rdfa-1.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" version="XHTML+RDFa 1.0" dir="ltr">
<head profile="http://www.w3.org/1999/xhtml/vocab">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>Garnier</title>
    <link href='http://fonts.googleapis.com/css?family=PT+Sans+Narrow' rel='stylesheet' type='text/css'>


    <style type="text/css" media="all">@import url("<?php echo $base_path;?>modules/system/system.base.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/system/system.menus.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/system/system.messages.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/system/system.theme.css?mxhjpi");</style>
    <style type="text/css" media="all">@import url("<?php echo $base_path;?>modules/system/system.admin.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/contextual/contextual.css?mxhjpi");
        @import url("<?php echo $base_path;?>misc/vertical-tabs.css?mxhjpi");</style>
    <style type="text/css" media="all">
        @import url("<?php echo $base_path;?>modules/field/theme/field.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/node/node.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/search/search.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/user/user.css?mxhjpi");
        @import url("<?php echo $base_path;?>sites/all/modules/views/css/views.css?mxhjpi");</style>
    <style type="text/css" media="all">@import url("<?php echo $base_path;?>sites/all/modules/ctools/css/ctools.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/filter/filter.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/file/file.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/image/image.css?mxhjpi");
        @import url("<?php echo $base_path;?>modules/shortcut/shortcut.css?mxhjpi");
    <style type="text/css" media="all">@import url("<?php echo $base_path;?>themes/garland/style.css?mxhjpi");</style>
    <link rel="stylesheet" type="text/css" href="<?php print $base_path;?>../psshangfengmian/web/css/admin.css" />

    <!--[if lt IE 7]>
    <link type="text/css" rel="stylesheet" href="<?php echo $base_path;?>themes/garland/fix-ie.css?mxhjpi" media="all" />
    <![endif]-->
    <script type="text/javascript" src="<?php echo $base_path;?>../psshangfengmian/web/js/jquery.min.js"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>../psshangfengmian/web/js/jquery-ui-1.10.3.custom.js"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>../psshangfengmian/web/js/main.js"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/jquery.once.js?v=1.2"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/drupal.js?mxhjpi"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>modules/contextual/contextual.js?v=1.0"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/jquery.cookie.js?v=1.0"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/vertical-tabs.js?v=1.0"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/form.js?v=7.23"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/states.js?v=7.23"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/ajax.js?v=7.23"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/textarea.js?v=7.23"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>modules/field/modules/text/text.js?mxhjpi"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>modules/filter/filter.js?mxhjpi"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/progress.js?v=7.23"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>modules/file/file.js?mxhjpi"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/collapse.js?v=7.23"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>modules/menu/menu.js?mxhjpi"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>modules/path/path.js?mxhjpi"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>modules/comment/comment-node-form.js?mxhjpi"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>misc/autocomplete.js?v=7.23"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>modules/node/node.js?mxhjpi"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>modules/toolbar/toolbar.js?mxhjpi"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>../psshangfengmian/web/js/jquery.form.js"></script>
    <script type="text/javascript" src="<?php echo $base_path;?>../psshangfengmian/web/js/handlebars-v1.1.2.js"></script>
    <script type="text/javascript" language="javascript" src="<?php echo $base_path;?>../psshangfengmian/web/js/jquery.dataTables.js"></script>
    <script type="text/javascript">
        <!--//--><![CDATA[//><!--
        jQuery.extend(Drupal.settings, {"basePath":"\/gar_nier\/data\/","pathPrefix":"","ajaxPageState":{"theme":"garland","theme_token":"wkW0Jd1BQ9F7KG8pBvOA95KWROd2CNpsJYVSsEqzKGI","js":{"misc\/jquery.js":1,"misc\/jquery.once.js":1,"misc\/drupal.js":1,"modules\/contextual\/contextual.js":1,"misc\/jquery.cookie.js":1,"misc\/jquery.form.js":1,"misc\/vertical-tabs.js":1,"misc\/form.js":1,"misc\/states.js":1,"misc\/ajax.js":1,"misc\/textarea.js":1,"modules\/field\/modules\/text\/text.js":1,"modules\/filter\/filter.js":1,"misc\/progress.js":1,"modules\/file\/file.js":1,"misc\/collapse.js":1,"modules\/menu\/menu.js":1,"modules\/path\/path.js":1,"modules\/comment\/comment-node-form.js":1,"misc\/autocomplete.js":1,"modules\/node\/node.js":1,"modules\/toolbar\/toolbar.js":1},"css":{"modules\/system\/system.base.css":1,"modules\/system\/system.menus.css":1,"modules\/system\/system.messages.css":1,"modules\/system\/system.theme.css":1,"modules\/system\/system.admin.css":1,"modules\/contextual\/contextual.css":1,"misc\/vertical-tabs.css":1,"modules\/comment\/comment.css":1,"modules\/field\/theme\/field.css":1,"modules\/node\/node.css":1,"modules\/search\/search.css":1,"modules\/user\/user.css":1,"sites\/all\/modules\/views\/css\/views.css":1,"sites\/all\/modules\/ctools\/css\/ctools.css":1,"modules\/filter\/filter.css":1,"modules\/file\/file.css":1,"modules\/image\/image.css":1,"modules\/shortcut\/shortcut.css":1,"modules\/toolbar\/toolbar.css":1,"themes\/garland\/style.css":1,"themes\/garland\/print.css":1,"themes\/garland\/fix-ie.css":1}},"file":{"elements":{"#edit-field-image-before-und-0-upload":"png,gif,jpg,jpeg","#edit-field-image-after-und-0-upload":"png,gif,jpg,jpeg"}},"ajax":{"edit-field-image-before-und-0-upload-button":{"wrapper":"edit-field-image-before-und-0-ajax-wrapper","effect":"fade","progress":{"type":"throbber","message":null},"event":"mousedown","keypress":true,"prevent":"click","url":"\/gar_nier\/data\/file\/ajax\/field_image_before\/und\/0\/form-yUo9CkVKfrqtcqBgLvBMe_Rbu2mGN4q5rOdK73AcqvQ","submit":{"_triggering_element_name":"field_image_before_und_0_upload_button","_triggering_element_value":"Upload"}},"edit-field-image-after-und-0-upload-button":{"wrapper":"edit-field-image-after-und-0-ajax-wrapper","effect":"fade","progress":{"type":"throbber","message":null},"event":"mousedown","keypress":true,"prevent":"click","url":"\/gar_nier\/data\/file\/ajax\/field_image_after\/und\/0\/form-yUo9CkVKfrqtcqBgLvBMe_Rbu2mGN4q5rOdK73AcqvQ","submit":{"_triggering_element_name":"field_image_after_und_0_upload_button","_triggering_element_value":"Upload"}}},"states":{"#edit-menu--2":{"invisible":{"input[name=\u0022menu[enabled]\u0022]":{"checked":false}}},"#edit-revision":{"checked":{"textarea[name=\u0022log\u0022]":{"empty":false}}}},"anonymous":"Anonymous","tableHeaderOffset":"Drupal.toolbar.height"});
        //--><!]]>
    </script>
</head>
<body class="<?php print $classes; ?>">
<div class="wrapper">
    <?php print $page; ?>
</div>
</body>
</html>
