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
        include 'user.php';

        switch($_GET["option"]) {
            case "login":
                include 'login.php';
                break;
            case "logout":
                user_logout();
                break;
        }

        user_renderLoginForm();

        ?> <!-- /php -->

        <br />


  </body>
</html>
