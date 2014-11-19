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
        include 'course.php';

        $summaryHTML = getCourseSummary();

        foreach($summaryHTML as $line) {
            echo $line.PHP_EOL;
        }

        ?> <!-- /php -->


  </body>
</html>
