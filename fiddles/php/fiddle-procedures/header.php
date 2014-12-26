<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>PHP Fiddle - Procedures</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="PHP Fiddle - Procedures">
    <meta name="author" content="bradyhouse">
</head>
<body>

<?php

include 'configuration.php';
include 'common.php';
include 'site.php';

echo "<H3>".site_select('title')."</H3>";
echo "<H4>".site_select('subtitle')."</H4>";
echo "<HR/>";
echo "Salt = ".site_select('salt');

?>
</body>
</html>