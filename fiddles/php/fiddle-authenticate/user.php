<?php

/**
 * Wrapper function for the stu_user_auth_s
 * store procedure.
 *
 * @param $login
 * @param $password
 * @return bool
 */
function user_auth_s($login, $password) {
    $authenticated = array();
    $result = false;
    list($dbc,$error) = connect_to_database();
    $sql = 'CALL `stu_user_auth_s`("'.$login.'","'.$password.'");';
    if ($dbc) {
        $queryResult = mysqli_query($dbc, $sql);
        while ($record = mysqli_fetch_array($queryResult,MYSQLI_ASSOC)):
            if ($record['AUTHENTICATED'] == 1) {
                $result = true;
            }
        endwhile;
    }
    return $result;
}

/**
 * @param $login
 * @param string $field
 * @return bool|mysqli_result|string
 */
function user_s($login, $field="*") {
    $result = '';
    list($dbc,$error) = connect_to_database();
    $sql = 'CALL `stu_user_s`("'.$login.'");';
    if ($dbc) {
        $queryResult = mysqli_query($dbc, $sql);
        while ($record = mysqli_fetch_array($queryResult,MYSQLI_ASSOC)):
            switch(strtoupper($field)) {
                case "USERID":
                    $result = $record['UserId'];
                    break;
                case "NAME":
                    $result = $record['Name'];
                    break;
                case "LOGIN":
                    $result = $record['Login'];
                    break;
                case "EMAIL":
                    $result = $record['Email'];
                    break;
                case "LOCKED":
                    $result = $record['Locked'];
                    break;
                default:
                    $result = $record['UserId'].", ".$record['Name'].", ".$record['Login'].", ".$record['Email'].", ".$record['Locked'];
            }
        endwhile;
    }
    return $result;
}

function user_loggedIn() {
    return (isset($_SESSION['user']));
}

function user_logout() {
    session_destroy();
    if (isset($_SESSION['user'])) {
        session_unset($_SESSION['user']);
        echo "You've successfully logged out<br>";
    }
}

function user_renderLoginForm() {
    if (user_loggedIn()) {
        echo 'Hello, '.$_SESSION['user'].' :)'.PHP_EOL;
        echo '<p><a href="index.php?option=logout">LogOut</a></p>';
    } else {
        echo '<form action="index.php?option=login" method="post">                          '.PHP_EOL;
        echo '	<input type="text" placeholder="username" name="username"/>'.PHP_EOL;
        echo '	<input type="password" placeholder="password" name="password"/>'.PHP_EOL;
        echo '	<input type="submit" value="Login"/>                       '.PHP_EOL;
        echo '</form>                                                      '.PHP_EOL;
    }
}
?>