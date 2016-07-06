fiddle-0042-DeepLinks
======

### Title

Deep Links


### Creation Date

06-30-16


### Location

[Odessa, Ukraine](https://www.google.com.ua/maps/@46.5926263,30.7875891,14z?hl=en)


### Issue

[Issue 42](https://github.com/bradyhouse/house/issues/42)


### Description

This POC is a Fork of [Angular 2 Fiddle #40](https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0040-CSVReporter).  It extends the original design by introducing
`deep links` for each report view.  In addition, it provides deep linking to specific field filters. Finally,
it uses a routing strategy that relies on QueryString parameter instead of path fragments making it [Jekyl](https://jekyllrb.com/)
compatible.  In other words, the version published on [bradyhouse.github.io](bradyhouse.github.io) (link below) actually works. Here
are a few examples:

*   [bradyhouse.github.io > Angular 2 > #42 > report-a.csv](http://bradyhouse.github.io/angular2/fiddle-0042-DeepLinks/?id=report-a.csv)
*   [bradyhouse.github.io > Angular 2 > #42 > report-b.csv](http://bradyhouse.github.io/angular2/fiddle-0042-DeepLinks/?id=report-b.csv)
*   [bradyhouse.github.io > Angular 2 > #42 > report-a.csv, Col A is 2](http://bradyhouse.github.io/angular2/fiddle-0042-DeepLinks/?id=report-a.csv&field=A&values=2)
*   [bradyhouse.github.io > Angular 2 > #42 > report-b.csv, Col F is 1600](http://bradyhouse.github.io/angular2/fiddle-0042-DeepLinks/?id=report-b.csv&field=F&values=1600)


### Published Version Link

*   [plnkr.co](http://plnkr.co/edit/pfhjOP?p=info)
*   [bradyhouse.github.io > Angular 2 > #42](http://bradyhouse.github.io/angular2/fiddle-0042-DeepLinks)
*   [github > bradyhouse > house > fiddles > Angular 2 > fiddle-0042-DeepLinks](https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0042-DeepLinks)

### Tags

angular2, systemjs, es6-shim, reflect-metadata, rxjs, ag-grid, ag-grid-ng2, route, router, routesegment, activateroute


### Forked From

[fiddle-0040-CSVReporter](https://github.com/bradyhouse/house/tree/master/fiddles/angular2/fiddle-0040-CSVReporter)
