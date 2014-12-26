<?php

/**
 * Wrapper function for the
 * stu_site_s stored procedure.
 *
 * @param string $field
 * @return string
 */
function site_select($field="*") {
    $site = array();
    $result = '';
    $i = 0;
    list($dbc,$error) = connect_to_database();
    $sql = 'CALL `stu_site_s`();';
    if ($dbc) {
        $resultSet = mysqli_query($dbc, $sql);
        while ($record = mysqli_fetch_array($resultSet,MYSQLI_ASSOC)):
            switch (strtoupper($field)) {
                case "TITLE":
                    $result=$record['Title'];
                    break;
                case "SUBTITLE":
                    $result=$record['SubTitle'];
                    break;
                case "SALT":
                    $result=$record['Salt'];
                    break;
                default:
                    $result=$record['Title'].", ".$record['SubTitle'].", ".$record['Salt'];
                    break;
            }
        endwhile;
    }
    return $result;
}

?>