fiddle-0026-Nvd3Component
======

![Screenshot](screenshot.png)

### Title

Nvd3 Component


### Creation Date

03-03-16


### Location

Chicago, IL


### Description

An Angular2 Fiddle exploring how to--

 1. Create a d3 "discreteBarChart"
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

(2) The logic for the [src/component/Chart.ts](src/component/Chart.ts) class is adapted from [ng2-nvd3](https://github.com/krispo/ng2-nvd3)
library. I modified the logic in order de-couple the creation/setup of the chart control and the population of the
bound data.


### Published Version Link

[plnkr.co](http://plnkr.co/edit/hK2PeU?p=preview)


### Tags

angular2, typescript, component, http, http_providers, nvd3, d3


### Forked From

[fiddle-0025-TreeComponent](../fiddle-0025-TreeComponent)


### Forked From

[fiddle-0026-Nvd3Component](../fiddle-0026-Nvd3Component)
