<?php

/**
 * Wrapper function for the
 * stu_course_summary_s stored
 * procedure
 *
 * @return array
 */
function getCourseSummary() {
    $result = array();
    list($dbc, $error) = connect_to_database();
    $sql = 'CALL `stu_course_summary_s`();';
    if ($dbc) {
        array_push($result, '<table border="1">');
        array_push($result, '<tr><th>CourseNumber</th><th>Title</th><th></th></tr>');
        $resultSet = mysqli_query($dbc, $sql);
        while ($record = mysqli_fetch_array($resultSet,MYSQLI_ASSOC)):
            array_push($result,'<tr><td>'.$record['CourseNumber'].'</td>');
            array_push($result,'<td>'.$record['Title'].'</td>');
            array_push($result,'<td><a href="courseDetail.php?courseId='.$record['CourseId'].'">Details</a></td></tr>');
        endwhile;
        array_push($result,'</table>');
    }
    return $result;
}

function getCourseDetails($courseId) {
    $result = array();
    list($dbc, $error) = connect_to_database();
    $sql = 'CALL `stu_course_detail_s`("'.$courseId.'");';
    if ($dbc) {
        array_push($result, '<table border="1">');
        array_push($result, '<tr><th>CourseNumber</th><th>Description</th><th>Credits</th><th>Cost</th><th>Specialization</th><th></th></tr>');
        $resultSet = mysqli_query($dbc, $sql);
        while ($record = mysqli_fetch_array($resultSet,MYSQLI_ASSOC)):
            array_push($result,'<tr><td>'.$record['CourseNumber'].'</td>');
            array_push($result,'<td>'.$record['CourseDescription'].'</td>');
            array_push($result,'<td>'.$record['Credits'].'</td>');
            array_push($result,'<td>'.$record['Cost'].'</td>');
            array_push($result,'<td>'.$record['Specialization'].'</td>');
            array_push($result,'<td><a href="index.php?enroll='.$record['CourseId'].'">Enroll</a></td></tr>');
        endwhile;
        array_push($result,'</table>');
    }
    return $result;
}

?>