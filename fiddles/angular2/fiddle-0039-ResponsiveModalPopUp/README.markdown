fiddle-0037-ModalPopUp
======

### Title

Angular2 - Grid Selection Modal PopUp


### Creation Date

05-23-16


### Location

Chicago, IL

### Issue

[Issue 29](https://github.com/bradyhouse/house/issues/29)


### Description

Fork [fiddle #37 ~ Modal PopUp](https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0037-ModalPopUp)
and apply some _responsive design_.  The modal dialog needs to be resized based on the window.
All `*px` style sheet values should be replaced with `*rem` values. Each value should be calculated using the
`target / context` formula. See Ethan Marcotte's book [Responsive Web Design](https://abookapart.com/products/responsive-web-design).

On an _alternate front_, add logic to export selected accounts to CSV.


#### Requirements

Initially, the screen should:

    1. Contain a grid that allows the user to select 1 to n number of rows
    2. Contain a button
        a. If no rows are selected in the grid, clicking the button should do nothing
        b, If rows are selected a pop-up window containing a second grid populated with the selected rows should open
    3. The modal pop-up should include an CSV export ("download") button


### Published Version

*   [https://embed.plnkr.co/TRJ2x0/](https://embed.plnkr.co/TRJ2x0/)


### Tags

angular2, ViewChild, ViewContainerRef, ComponentResolver, ElementRef, angular2-in-memory-web-api, rxjs, ag-grid-ng2, ag-grid


### Forked From

[fiddle-0037-ModalPopUp](../fiddle-0037-ModalPopUp)
