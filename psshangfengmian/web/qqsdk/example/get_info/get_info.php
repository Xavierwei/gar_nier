<?php
/*
 *调用接口代码
 *
 **/
require_once("../../API/qqConnectAPI.php");
$qc = new QC();
$ret = $qc->get_info();

// show result
if($ret['ret'] == 0){
    print_r($ret);
}else{
    echo "<meta charset='utf-8' />";
    echo "获取失败，请开启调试查看原因";
}
