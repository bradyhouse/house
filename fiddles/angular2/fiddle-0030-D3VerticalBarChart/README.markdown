fiddle-0030-D3VerticalBarChart
======

![Screenshot](screenshot.png)

### Title

D3 Vertical Bar Chart


### Creation Date

03-03-16


### Location

Chicago, IL


### Description

An Angular2 Fiddle exploring how to--

 1. Create a d3 "vertical Bar Chart"
 2. "Subscribe" to a get request in order to download some Hierarchical JSON (see below)
 3. In the callback (2), filter the JSON for the first 2 parent nodes and populate the chart (1)

Note - (1) Data for this fiddle was generated using [http://www.json-generator.com/](http://www.json-generator.com/). The
recipe:

       {
          "title": "root",
            "leaf": "false",
          "children": [
          '{{repeat(100)}}',
          {
             "title": '{{firstName()}}_{{surname()}}',
             "leaf": 'false',
             "children": [
               '{{repeat(1,10)}}',
                   {
                     "title": '{{company().toUpperCase()}}',
                     "leaf": 'true',
                     "id": '{{index()}}',
                     "name": '{{firstName()}} {{surname()}}',
                     "isActive":'{{bool()}}',
                      "checking": '{{floating(-1000000, 1000000, 2, "0.00")}}',
                      "savings": '{{floating(1000, 1000000, 2, "0.00")}}',
                      "age": '{{integer(20, 40)}}',
                      "eyeColor": '{{random("blue", "brown", "green")}}',
                      "gender": '{{gender()}}',
                      "company": '{{company().toUpperCase()}}',
                      "email": '{{email()}}',
                      "phone": '+1 {{phone()}}',
                      "address": '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
                      "registered": '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
                      "latitude": '{{floating(-90.000001, 90)}}',
                      "longitude": '{{floating(-180.000001, 180)}}'
                   }
          }]
        }




### Published Version Link

[http://embed.plnkr.co/gb1fJz/](http://embed.plnkr.co/gb1fJz/)


### Tags

angular2, typescript, component, http, http_providers, d3


### Forked From

[fiddle-0026-Nvd3Component](../fiddle-0026-Nvd3Component)
