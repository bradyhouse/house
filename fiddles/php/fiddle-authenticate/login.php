<?php

$authenticated = user_auth_s($_POST['username'], $_POST['password']);

if ($authenticated = '1') {
    $_SESSION['user'] = user_s($_POST['username'],'Name');
} else {
    echo "Please enter a valid username / password<br />";
}

?>

