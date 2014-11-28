<?php

function startJson() {
    $json = '{';
    $json.= '"text": "", ';
    $json.= '"recordId": "root",';
    $json.= '"parentId": null,';
    $json.= '"leaf": false,';
    $json.= '"children": [';
    return $json;
}

function endJson() {
    $json = ']}';
    return $json;
}

function genRandomInt($min, $max) {
    $n = 1;
    for ($i=0;$i<1000000;$i++) {
        $n = mt_rand(0,100000);
        if ($n<=$max && $n>=$min) {
            return $n;
        }
    }
    return $n;
}

function writeFile($filename, $content) {
    if (!$handle = fopen($filename, 'w')) {
         echo "Cannot open file ($filename)";
         exit;
    }
    if (fwrite($handle, $content) === FALSE) {
        echo "Cannot write to file ($filename)";
        exit;
    }
    fclose($handle);
    debugPrint('writeFile', "Success, wrote json to file ($filename)");
}

/*
 * http://stackoverflow.com/questions/4356289/php-random-string-generator
 */
function genRandomStr($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[mt_rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}



function debugPrint($label, $obj) {
    if (defined("debug")) {
        echo $label.PHP_EOL;
        print_r($obj);
        echo "<br /><br />";
    }
}

