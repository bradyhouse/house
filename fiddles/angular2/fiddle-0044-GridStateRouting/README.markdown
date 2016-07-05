fiddle-0044-GridStateRouting
======

### Title

Grid State Routing


### Creation Date

06-30-16


### Location

[Odessa, Ukraine](https://www.google.com.ua/maps/@46.5926263,30.7875891,14z?hl=en)


### Issue

[Issue 44](https://github.com/bradyhouse/house/issues/44)


### Description

This POC is a Fork of [Angular 2 Fiddle #42](https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0042-DeepLinks).  
It extends the original design by introducing `deep links` based on the state of the grid. _State_ in this case means column
filtering and floating top row selection (aka header). Again, it uses a routing strategy that relies on QueryString parameter instead of path fragments making it [Jekyl](https://jekyllrb.com/)
compatible.  In other words, the version published on [bradyhouse.github.io](bradyhouse.github.io) (links below) actually work. Here
are a few _deep link_ examples:

*   [bradyhouse.github.io > Angular 2 > #44 > report-b.csv (B = [1332.90])](http://bradyhouse.github.io/angular2/fiddle-0044-GridStateRouting/?r=report-b.csv&fs=B&vs=B%2C1332.9000)
*   [bradyhouse.github.io > Angular 2 > #44 > report-b.csv (B = [1332.90,1333.00])](http://bradyhouse.github.io/angular2/fiddle-0044-GridStateRouting/?r=report-b.csv&fs=B&vs=B%2C1332.9000%2C1333.0000)
*   [bradyhouse.github.io > Angular 2 > #44 > report-a.csv (header = row 1)](http://bradyhouse.github.io/angular2/fiddle-0044-GridStateRouting/?r=report-a.csv&h=abcd)
*   [bradyhouse.github.io > Angular 2 > #44 > report-a.csv (header = row 1, D = ['12/01/14', '04/01/15', '08/01/15'])](http://bradyhouse.github.io/angular2/fiddle-0044-GridStateRouting/?r=report-a.csv&h=abcd&fs=D&vs=D%2C01-Apr-2015%2C01-Aug-2015%2C01-Dec-2014)


### Published Version Link

*   [bradyhouse.github.io > Angular 2 > #44](http://bradyhouse.github.io/angular2/fiddle-0044-GridStateRouting)
*   [github > bradyhouse > house > fiddles > Angular 2 > fiddle-0044-GridStateRouting](https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0042-GridStateRouting)
*   [plnkr.co](http://plnkr.co/edit/2lC041?p=preview)


### Tags

angular2, ag-grid, ag-grid-ng2, route, router, routesegment, activateroute


### Forked From

[fiddle-0042-DeepLinks](../fiddle-0042-DeepLinks)
