<!DOCTYPE html>
<?php
/**
* Data Section 1
*/
$daysOfTheWeekOpen = array(1=>"Mon",2=>"Tue",3=>"Wed",4=>"Thur",5=>"Fri");
$openingHours = array("Mon"=>9,"Tue"=>9,"Wed"=>9,"Thur"=>12,"Fri"=>9);
$closingHours = array("Mon"=>5,"Tue"=>5,"Wed"=>5,"Thur"=>4.5,"Fri"=>4.5);
$tab="&nbsp;&nbsp;&nbsp;&nbsp;";

?>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>PHP Fiddle - Form</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="PHP Fiddle - Form">
    <meta name="author" content="bradyhouse">

    <!-- Le styles -->
    <link href="css/bootstrap.css" rel="stylesheet">
    <style type="text/css">
      body {
        padding-top: 20px;
        padding-bottom: 40px;
      }
      #calcQuoteForm .container
      {
         margin-top:8px;
         margin-bottom: 10px;
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

            $quoteDays = array();

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

                if ( $hours > 6) {
                    array_push($quoteDays, $day);
                }

            }
        ?> <!-- /php -->
        <table border="1" cellpadding="10" width="100%">
            <tr>
                <td>
                    <form id='calcQuoteForm' action='#' method='post' accept-charset='UTF-8' enctype="multipart/form-data">
                        <H3>Calculate your quote:</H3>
                        <div class='short_explanation'>* required fields</div>
                        <div class='container'>
                            <label for="selectday" >Select a day*: </label>
                            <select name="selectday">
                                <option name="0" value="Blank"></option>
                                <?php
                                    $index = 0;
                                    foreach ($quoteDays as $day) {
                                        echo '<option name="'.strval($index).'" value="'.$day.'">'.$day.'</option>\n';
                                        $index++;
                                    }
                                ?>
                            </select>
                            <span id='calcQuoteFormDayErrorLoc' class='error'></span>
                        </div>
                        <div class='container'>
                            <label for="selectApplianceType" >Select an Appliance Type*:</label>
                            <select name="selectApplianceType">
                                <option name="0" value="Blank"></option>
                                <option name="1" value="Large">Large</option>
                                <option name="2" value="Small">Small</option>
                                <option name="3" value="Mobile Phone">Mobile Phone</option>
                            </select>
                            <span id='calcQuoteFormAppTypeErrorLoc' class='error'></span>
                        </div>
                        <div class='container'>
                            <label for='selectDropOffDay'>Dropoff Day:*</label>
                             <select name="selectDropOffDay">
                                <option name="0" value="Blank"></option>
                                <?php
                                    $index = 0;
                                    foreach ($quoteDays as $day) {
                                        echo '<option name="'.strval($index).'" value="'.$day.'">'.$day.'</option>\n';
                                        $index++;
                                    }
                                ?>
                            </select>
                            <span id='calcQuoteFormDropOffDayErrorLoc' class='error'></span>
                        </div>
                        <div class='container'>
                            <label for='selectPickupDay' >Pickup Day:*</label>
                            <select name="selectDropOffDay">
                                <option name="0" value="Blank"></option>
                                <?php
                                    foreach ($daysOfTheWeekOpen as $index => $day) {
                                        echo '<option name="'.strval($index).'" value="'.$day.'">'.$day.'</option>\n';
                                    }
                                ?>
                            </select>
                            <span id='calcQuoteFormDropOffDayErrorLoc' class='error'></span>
                        </div>
                        <div class='container'>
                            <input type='submit' class='button' name='submitQuote' value='Submit' />
                        </div>
                    </form>
                </td>
            </tr>
        </table>
    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script src="js/bootstrap.js"></script>
  </body>
</html>
