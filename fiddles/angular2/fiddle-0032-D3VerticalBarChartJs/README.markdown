fiddle-0032-D3VerticalBarChartJs
======

![Screenshot](screenshot.png)

### Title

D3 Vertical Bar Chart (JS)


### Creation Date

04-25-2016


### Location

Chicago, IL


### Description

A _plnkr_ exploring how to create a bar chart using straight D3.  In addition, this fiddle explores a 
bigger question/issue:  _How to write (or transpile) Angular 2 typescript so that it can run using only 
CDN references_?


### Compilation Procedure

To generate the [app.js](app.js), run the following the command from the [scripts](../../../scripts) directory.

    ./fiddle.sh "combine" "angular2" "fiddle-0032-D3VerticalBarChartJs" "app.js" "1"

This will:

1. Assemble the typescript files in the [src](src) directory into a single (bundle) file -- [app.ts](app.ts).
2. Kickoff the typescript compiler with the following parameters:

        tsc -t ES5 --experimentalDecorators --sourceMap --allowJs --allowUnreachableCode --allowSyntheticDefaultImports --suppressImplicitAnyIndexErrors app.ts

        app.ts(4,6): error TS2307: Cannot find module 'angular2/core'.
        app.ts(8,6): error TS2307: Cannot find module 'angular2/platform/browser'.
        app.ts(12,6): error TS2307: Cannot find module 'angular2/http'.
        app.ts(14,22): error TS2339: Property 'd3' does not exist on type 'Window'.

NOTE - Just ignore the tsc warnings / errors.


### Published Version Link

[plnkr.co](http://plnkr.co/edit/84QiJV?p=preview)


### Tags

angular2.dev.js, http.dev.js, Rx.js, system.js, angular2-polyfills.js, d3.js

### Forked From

N/A