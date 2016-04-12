fiddle-0073-CsvToJson
======

### Title

CSV to Json (ver 2)


### Creation Date

04-07-16


### Location

Chicago, IL


### Description

This fiddle is second variation on my first [Csv to Json Bash Fiddle](../fiddle-0038-CsvToJson). Given
a CSV [data.csv](data.csv) file having the format:

        1,49905.62,29216.91,25-May-2015
        2,92347.34,99399.32,25-Feb-2015
        3,35782.62,14156.26,11-Nov-2014
        4,72342.38,95923.98,13-Sep-2015
        ...

Running the script will produce a JSON file [data.json](data.json) of the format:

        {
            "data": [
                ["1","49905.62","29216.91","25-May-2015"],
                ["2","92347.34","99399.32","25-Feb-2015"],
                ["3","35782.62","14156.26","11-Nov-2014"],
                ...
            ]
        }

It also produces a minified JSON file [data.min.json](data.min.json), in which all
line breaks are removed.


### Tags

bash, json, csv


### Forked From

[fiddle-0038-CsvToJson](../fiddle-0038-CsvToJson)
