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
        $sourceFile = fopen( "helloworld.txt" , "r" );
        $myFile = "helloworld2.txt";
        if (file_exists($myFile))
        {
            unlink($myFile);
        }
        $fh = fopen($myFile, 'x') or die("can't open file");
        $stringData = "New Stuff 1\n";
        fwrite($fh, $stringData);
        $line = array();
        $i = 0;
        while ( $line[$i] = fgets ($sourceFile, 4096) )
        {
            fwrite($fh, $line[$i]);
            $i++;
        }
        fclose($fh);

        ?> <!-- /php -->
    </div> <!-- /container -->

    <!-- Le javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
    <script src="js/bootstrap.js"></script>
  </body>
</html>
