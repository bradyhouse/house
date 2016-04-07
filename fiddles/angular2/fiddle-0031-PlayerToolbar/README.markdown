fiddle-0026-Nvd3Component
======

![Screenshot](screenshot.png)

### Title

Player Toolbar


### Creation Date

03-30-16


### Location

Chicago, IL


### Description

Angular2 fiddle exploring how to create a player like toolbar with the following requirements:

* The view (html) should:
    1. use bootstrap styling.  Specifically, "footer" and "navbar *"
    2. expose the following input controls:
        * Previous button
            1. icon [fa fa-backward](http://fontawesome.io/icon/backward/)
            2. flush left with a margin of 20px
            3. title "previous"
            4. behaivor
                * when the first frame is displayed, this button should:
                    1. disabled
                    2. have no title
        * Play / Pause button
               1. icon [fa fa-play](http://fontawesome.io/icon/play/)
               2. to right of the
               3. title "play"
               4. behaivor
                   * while playing:
                       1. icon should change to [fa fa-pause](http://fontawesome.io/icon/pause/)
                       2. title should change to "pause"
        * Next Button
            1. icon [fa fa-forward](http://fontawesome.io/icon/forward/)
            2. left justified
            3. title "next"
            4. behavior
                * when the last frame is displayed, this button should:
                    1. be disabled
                    2. have no title

    3. right-justified "range" input control
        * width of 130px
        * title "Increment speed (seconds)"
    4. right-justified "increment label" control
        * should display the value selected in the range control (2) with the suffix "secs"
    5. if the frame count is 0 or 1, then the toolbar should be completely hidden

* The component (aka controller) should:
    1. Expose a state property with a default value of "playing"
    2. Expose an "increment" numeric input parameter
    3. Expose a "minIncrement" numeric input parameter
    4. Expose a "maxIncrement" numeric input parameter
    5. Expose a  states enum
        1. playing
        2. stopped
    6. Emit the following events:
        * changeframe
        * nextframe
        * firstframe
        * lastframe

### Published Version Link

[plnkr.co](http://plnkr.co/edit/YV3nmi?p=preview)

### Tags

angular2, typescript, component, interface, enum, video, range, event emitter


### Forked From

[fiddle-0025-TreeComponent](../fiddle-0025-TreeComponent)


### Forked From

[fiddle-0026-Nvd3Component](../fiddle-0026-Nvd3Component)
