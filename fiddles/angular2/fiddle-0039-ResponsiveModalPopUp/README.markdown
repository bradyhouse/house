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

POC exploring how to repeatedly inject and remove a bootstrapped styled pop-up form containing an ag-grid.


#### Requirements

Initially, the screen should:

    1.  Contain a grid that allows the user to select 1 to n number of rows
    2.  Contain a button
        a.  If no rows are selected in the grid, clicking the button should do nothing
        b.  If rows are selected a pop-up window containing a second grid populated with the selected rows should open
    3.  The modal pop-up should
        a.  be center screen
        b.  be responsive -- resize and reposition when the browser window resizes  


#### Dev Dependencies

Prior to building this _in-browser_ POC, the following npm libraries were installed:

    *   mdi
    *   

### Published Version

*   [plnkr.co](http://embed.plnkr.co/YTGESs/)

### Tags

angular2, ViewChild, ViewContainerRef, ComponentResolver, ElementRef, angular2-in-memory-web-api, rxjs, ag-grid-ng2, ag-grid


### Forked From

[fiddle-0037-ModalPopUp](../fiddle-0037-ModalPopUp)
