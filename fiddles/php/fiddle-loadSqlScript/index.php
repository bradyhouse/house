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

        if ($_GET['install']) {
            include 'model/schema.php';
            set_time_limit(0);

            $mysqli = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,'mysql');
            $mysqli->set_charset("utf8");

            header('Content-Type: text/html;charset=utf-8');

            try {
                echo 'Pinging '.PROJECT_DB.' Database ... <br />';
                echo '<hr />';
                if (!databaseExists(PROJECT_DB)) {
                    echo  PROJECT_DB.' does not exist ...<br />';
                    echo 'Creating '.PROJECT_DB.'... <br />';
                    sqlImport('install.sql');
                    echo PROJECT_DB." created successfully.<br />";
                } else {
                    echo PROJECT_DB.' already exists. <br />';
                }
            }
            catch (Exception $e) {
                echo 'Exception caught: ' . $e->getMessage() . "<br />";
            }


        } else {
            echo '<p><a href="index.php?install=1">Create '.PROJECT_DB.'</a></p>';
        }

        ?> <!-- /php -->


  </body>
</html>
