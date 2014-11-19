<?php

function startJson() {
    $json = '{'.PHP_EOL;
    $json.= '    "text": "",'.PHP_EOL;
    $json.= '    "recordId": "root",'.PHP_EOL;
    $json.= '    "parentId": null,'.PHP_EOL;
    $json.= '    "leaf": false,'.PHP_EOL;
    $json.= '    "children": ['.PHP_EOL;
    return $json;
}

function endJson() {
    $json = ']'.PHP_EOL;
    $json.= '    ]'.PHP_EOL;
    $json.= '}';
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

