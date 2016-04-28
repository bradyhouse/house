fiddle-0033-Tooltip
======

![Screenshot](screenshot.png)


### Title

Tooltip


### Creation Date

04-27-16


### Location

Chicago, IL


### Description

Angular 2 POC exploring how to create a generic, bootstrap styled tooltip.  The tooltip should meet the following 
requirements:

    1.  All parameters (options) should be passed using a interface class
        *   All properties exposed by the interface should be optional (?).  In other words, it should work with an
            an empty object ("{}")
        *   It should expose the following properties:
            1.  top (number) - absolute top position of the tooltip
            2.  left (number) - absolute left position of the tooltip
            3.  lines ([{ field, value }]) - field/value collection
            4.  visible (boolean) - visibility (hide/show) flag
    2.  It should utilize the bootstrap tooltip class
    3.  It should not emit any events
    4.  It should expose an options input parameter, which is an instance of its interface (1)
    5.  The height of the rendered tooltip should be calculated based on the number of lines
    6.  Each line of the tooltip should display the field and it value in a table format
    7.  It should not rely on table tags to achieve the required format (6)


### Published Version Link

[plnkr.co](http://embed.plnkr.co/5vW0Lw/)


### Tags

angular 2, bootstrap, Component, Input, Output, EventEmitter, OnInit
