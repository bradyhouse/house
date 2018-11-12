<!DOCTYPE html>
<?php
/**
* Data Section 1
*/
$daysOfTheWeekOpen = array(1=>"Mon",2=>"Tue",3=>"Wed",4=>"Thur",5=>"Fri");
$openingHours = array("Mon"=>9,"Tue"=>9,"Wed"=>9,"Thur"=>12,"Fri"=>9);
$closingHours = array("Mon"=>5,"Tue"=>5,"Wed"=>5,"Thur"=>4.5,"Fri"=>4.5);
$tab="&nbsp;&nbsp;&nbsp;&nbsp;";

function to_epoch_time($date_str){
	$hours = date('H', strtotime($date_str));
	$minutes = date('i', strtotime($date_str));
	$seconds = date('s', strtotime($date_str));
	$month = date('n', strtotime($date_str));
	$day = date('j', strtotime($date_str));
	$year = date('Y', strtotime($date_str));
	$is_dst = 0;
    return mktime($hours, $minutes, $seconds, $month, $day, $year, $is_dst);
}

?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>phpFiddle - strtotime</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="PHP Fiddle - strtotime">
    <meta name="author" content="bradyhouse">

    <!-- Le styles -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 20px;
        padding-bottom: 40px;
      }

      /* Custom container */
      .container-narrow {
        margin: 0 auto;
        max-width: 700px;
      }
      .container-narrow > hr {
        margin: 30px 0;
      }
    </style>
    <link href="css/bootstrap-responsive.css" rel="stylesheet">
    <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="js/html5shiv.js"></script>
    <![endif]-->
  </head>

  <body>

    <div class="container-narrow">
        <?php
            echo strtotime("now"), "<br />";
            echo strtotime("10 September 2000"), "<br />";
            echo strtotime("+1 day"), "<br />";
            echo strtotime("+1 week"), "<br />";
            echo strtotime("+1 week 2 days 4 hours 2 seconds"), "<br />";
            echo strtotime("next Thursday"), "<br />";
            echo strtotime("last Monday"), "<br />";

            echo "<hr />";

            foreach ($daysOfTheWeekOpen as $index => $day) {

                // ToDo: Refactor this mess
                $openTimeStr = strtr(strval(sprintf("%0.2f",$openingHours[$day])),".5",":30");
                $closeTimeStr = strtr(strval(sprintf("%0.2f",$closingHours[$day])),".5",":30");
                $openTimeArr = split('[:]',$openTimeStr);
                $closeTimeArr = split('[:]',$closeTimeStr);
                $openTimeMerStr = intval($openTimeArr[0]) >= 12 ? "pm" : "am";
                $closeTimeMerStr = "pm";
                $dateStubStr = strval(date('m/d/Y'));
                $openTimeDate = date('m/d/Y H:i',strtotime(($dateStubStr." ".$openTimeStr." ".$openTimeMerStr)));
                $closeTimeDate = date('m/d/Y H:i',strtotime(($dateStubStr." ".$closeTimeStr." ".$closeTimeMerStr)));
                $openEpochTime = to_epoch_time(strval($openTimeDate));
                $closeEpochTime = to_epoch_time(strval($closeTimeDate));
                $hoursEpochTime = $closeEpochTime - $openEpochTime;
                $operationMins = ((intval(date('H', $hoursEpochTime))) * 60) + intval(date('i', $hoursEpochTime));
                $hours = sprintf("%0.1f", ($operationMins/60));

                $open = date_create(strval($openTimeDate));
                $close = date_create(strval($closeTimeDate));
                $lastDrop = date_create(strval($closeTimeDate));

                date_sub($lastDrop, date_interval_create_from_date_string('3 hours'));



                // <debug>
                echo "open: ".date_format($open, 'h:i a').$tab;
                echo "close: ".date_format($close, 'h:i a').$tab;
                echo "hours: ".$hours.$tab;
                if ( $hours > 6) {
                    echo "last drop off: ".date_format($lastDrop, 'h:i a');
                } else {
                    echo "no drop-offs";
                }

                echo "<br />";
                // </debug>

                //sprintf("%0.2f",$openingHours[$day])

                //$unixOpenTime=strtotime();
            }
        ?> <!-- /php -->
    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script src="js/bootstrap.js"></script>
  </body>
</html>
