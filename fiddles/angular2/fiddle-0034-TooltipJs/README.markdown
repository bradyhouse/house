fiddle-0034-TooltipJs
======

![Screenshot](screenshot.png)


### Title

Tooltip (Straight Js)


### Creation Date

04-28-16


### Location

Chicago, IL


### Description

Angular 2 POC exploring how to create a generic, bootstrap styled tooltip in straight JS.  The component should meet 
the following requirements:

    1.  All parameters (options) should be passed using a interface class
        *   All properties exposed by the interface should be optional (?).  In other words, it should work with an
            an empty object ("{}")
        *   It should expose the following properties:
            1.  top (number) - absolute top position of the tooltip
            2.  left (number) - absolute left position of the tooltip
            3.  lines ([{ field, value }]) - field/value collection
            4.  visible (boolean) - visibility (hide/show) flag
            5.  width (number) - width of the tooltip; defaults to 150px
    2.  It should utilize the bootstrap tooltip class
    3.  It should not emit any events
    4.  It should expose an options input parameter, which is an instance of its interface (1)
    5.  The height of the rendered tooltip should be calculated based on the number of lines
    6.  Each line of the tooltip should display the field and it value in a table format
    7.  It should not rely on table tags to achieve the required format (6)
    8.  If the width or height of the toolitp exceeds the width or height of the window, it should be remain hidden
    9.  If the top plus the height exceeds the height of the window, then the top should be offset by the height
    10. If the left plus the width exceeds the width of the window, then the left should be offset by the width

### Compilation Procedure

To generate the [app.js](app.js), run the following the command from the [scripts](../../../scripts) directory.

    ./fiddle.sh "combine" "angular2" "fiddle-0032-D3VerticalBarChartJs" "app.ts" "1"

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

N/A


### Tags

angular2.dev.js, http.dev.js, Rx.js, system.js, angular2-polyfills.js
