<?php
if(drupal_is_front_page()){
    exit();
}
?>
<div class="page-left">
    <div class="logo"><img src="<?php print $base_path;?>../psshangfengmian/web/images/logo.png" /></div>
    <div class="menu-list">
        <div class="menu-title">Testimonial</div>
        <ul>
            <li class="add-comment"><a href="<?php print $base_path;?>node/add/comments">Add Comment</a></li>
            <li class="edit-comment"><a href="<?php print $base_path;?>admin/comments">Edit Comment</a></li>
        </ul>
    </div>
    <div class="menu-list">
        <div class="menu-title">Ps Girl Cover</div>
        <ul>
            <li><a href="<?php print $base_path;?>../psshangfengmian/web/index.php?r=admin/index">Photos</a></li>
            <li><a href="<?php print $base_path;?>../psshangfengmian/web/index.php?r=admin/user">Users</a></li>
        </ul>
    </div>
</div>
<a class="logout" href="<?php print $base_path;?>../psshangfengmian/web/index.php?r=admin/logout">LOGOUT</a>
<div class="page-right">
    <div class="page-right-header">
        <div class="page-title"><?php print $title; ?></div>
    </div>
    <div class="page-right-wrapper">
        <?php print render($page['content']); ?>
    </div>
</div>