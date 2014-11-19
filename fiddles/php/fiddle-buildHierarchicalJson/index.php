<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>House PHP Fiddle - fiddleCreateBigJson</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="PHP Fiddle - Procedures">
    <meta name="author" content="bradyhouse">
  </head>
  <body>

        <?php
        //define("debug", false);
        include 'fiddle.php';

        try {
            $childNodeTemplate = file_get_contents('childnode.txt');
            $parentNodeTemplate = file_get_contents('parentnode.txt');
            $parentNodeJson = '';
            $childNodeJson = '';
            $childrenJson = '';
            $parentNodeText = '';
            $childNodeText = '';
            $parentNodeCount = 10;
            $childNodeMinCount = 1;
            $childNodeMaxCount = 10;
            $childNodeCount = 1;

            $output = startJson();

            debugPrint('childNodeTemplate', $childNodeTemplate);
            debugPrint('parentNodeTemplate', $parentNodeTemplate);

            /***
             *
             * USE CASE -
             * create a parent node from template
             *
                {
                    "text": "|||text|||",
                    "recordId": "|||recordId|||",
                    "parentId": "root",
                    "leaf": false,
                    "children": [|||children|||],
                    "expanded": false
                }
             *
             * update |||text\\\ with random value
             * update |||recordId\\\ with sequential id
             * Get a random child count, n
             * Create a temp string, childrenJson
             * for 1 to n children
             *      create a child node from template
                {
                    "text": "|||text|||",
                    "recordId": "|||recordId|||",
                    "parentId": "|||parentRecordId|||",
                    "leaf": true
                }
             *
             *      update |||text||| with random string value
             *      update |||recordId||| with n
             *      update |||parentRecordId||| with parent recordId
             *      add child to childrenJson
             * update the parent \\\children\\\ variable with childrenJson
             * close the parent node
             * append to the output json
             *
             * */

            for ( $parentNodeIndex = 1; $parentNodeIndex <= $parentNodeCount; $parentNodeIndex += 1) {
                $parentNodeText = genRandomStr(genRandomInt(15,25));
                debugPrint('parentNodeText', $parentNodeText);
                $parentNodeJson = str_replace("|||text|||", $parentNodeText, $parentNodeTemplate);
                $parentNodeJson = str_replace("|||recordId|||", strval($parentNodeIndex), $parentNodeJson);
                debugPrint('parentNodeJson', $parentNodeJson);
                $childNodeCount = genRandomInt($childNodeMinCount, $childNodeMaxCount);
                debugPrint('childNodeCount', $childNodeCount);
                for ($childNodeIndex = 1; $childNodeIndex <= $childNodeCount; $childNodeIndex += 1) {
                    $childNodeText = genRandomStr(5).' '.genRandomStr(3);
                    $childNodeJson = str_replace("|||text|||", $childNodeText, $childNodeTemplate);
                    $childNodeJson = str_replace("|||recordId|||", $childNodeIndex, $childNodeJson);
                    $childNodeJson = str_replace("|||parentRecordId|||", $parentNodeIndex, $childNodeJson);
                    $childrenJson .= $childNodeJson.($childNodeIndex < $childNodeCount ? ',' : '');
                }
                debugPrint('childrenJson', $childrenJson);
                $parentNodeJson = str_replace("|||children|||", $childrenJson, $parentNodeJson);
                $output .= $parentNodeJson.($parentNodeIndex < $parentNodeCount ? ',' : '');
            }
            $output .= endJson();

            print_r($output);

        } catch (Exception $e) {
            print_r($e);
        }

        ?>
        <br />


  </body>
</html>
