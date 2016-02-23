fiddle-0018-AgGrid
======

### Title

Ag Grid / Zing Chart


### Creation Date

02-17-16


### Location

Chicago, IL


### Description

An Angular2 Fiddle exploring how to--

 1. "Subscribe" to a get request in order to download some JSON
 2. Dynamically configure the columns and rows of grid
 4. Configure the grid to provide:
    * filtering
    * sorting
    * resize
    * column show/hide
 5. Dynamically configure a zingchart control using the same data

Note - Data for this plunk was generated using [http://www.json-generator.com/](http://www.json-generator.com/). The
generator script block was used:

    [
     '{{repeat(1000, 7)}}',
     {
     id: '{{index()}}',
     name: '{{firstName()}} {{surname()}}',
     isActive: '{{bool()}}',
     checking: '{{floating(-1000000, 1000000, 2, "0.00")}}',
     savings: '{{floating(1000, 1000000, 2, "0.00")}}',
     age: '{{integer(20, 40)}}',
     eyeColor: '{{random("blue", "brown", "green")}}',
     gender: '{{gender()}}',
     company: '{{company().toUpperCase()}}',
     email: '{{email()}}',
     phone: '+1 {{phone()}}',
     address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
     registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-dd")}}',
     latitude: '{{floating(-90.000001, 90)}}',
     longitude: '{{floating(-180.000001, 180)}}'
     }
     ]


### Published Version Link

N/A

### Tags

angular2.0.0-beta-6, typescript, component, bootstrap, enableProdMode, Injectable, Http, Header, HTTP_PROVIDER, rxjs, ag-grid, ag.grid.AgGridNg2, ZingChart


### Forked From

[fiddle-0019-ZingChart](../fiddle-0019-ZingChart)
