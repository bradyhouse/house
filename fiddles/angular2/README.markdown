angular2
======

_Angular?_ No, now its: _Angular2!_  Its ubiquitous. Unfortunately, as primarily an "ExtJS" developer, I know nothing of
 _Angular_ or now _Angular2_.  This directory is dedicated to fiddles involving my exploration of version 2 of the
Angular framework. As a starting point, I will work through the examples outlined by Felipe Coury (et al) in the book
**ng-book 2 The Complete Book of AngularJS 2**. This book, in its pre-release version, is available online
@ [https://gitter.im/ng-book/ng-book](https://gitter.im/ng-book/ng-book).


### Procedures

#### Create

As of [fiddle #38](fiddles/angular2/fiddle-0035-ModalForm), angular 2 fiddles are created using
the [angular 2 CLI](https://cli.angular.io/) -- aka _ng create_.  This means the [fiddle.sh](../../scripts/fiddle.sh)
script provides some wrapper logic that integrates this cli.  To create a new angular2 fiddle, run the following command
from the [scripts](../../scripts) directory like so:

    ./fiddle.sh "create" "angular2" "fiddle-####-<Name>"

where:

    <Name> is the name of the new fiddle.


### Online Resources

#### Seeders

* [angular2 seed](https://github.com/mgechev/angular2-seed)

#### Reference

*   [Angular 2 Docs](https://angular.io/docs/ts/latest/)
    *   [Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html)
    *   [Cheat Sheet](https://angular.io/docs/ts/latest/guide/cheatsheet.html)
*   [Angular 2 CLI](https://github.com/angular/angular-cli)
*   [ng2-bootstrap](http://valor-software.com/ng2-bootstrap/)
*   [code.angularjs.org](https://code.angularjs.org/)
*   [ag-grid](https://www.ag-grid.com/)
*   [angular 2 Component Examples](https://gist.github.com/johnlindquist/b043ce1b7334f7efaf25c1b471a7cb54)
*   [John Papa's Angular Style Guide Repo](https://github.com/johnpapa/angular-styleguide)

#### Special Topics

##### Component Router

*   [Angular 2 Weekly meeting notes](https://goo.gl/JKeMe5)
*   [Rob Eisenberg: New Router Talk @ ng-europe](https://goo.gl/zGatYQ)
*   [Chris Sevilleja’s ng-vegas presentation on the new router](https://goo.gl/Ua9aJJ)
*   [Good blog entry on the new router](http://goo.gl/dd8922)
*   [Good slide deck on the router](http://goo.gl/zZcVRq)

##### Dependency Injection

*   [Vojta Jina’s talk on DI in 1.X](http://goo.gl/KLlzNO)
*   [Great article on DI in 2.0](http://goo.gl/9Ca02H)

##### Material Design

*   [https://github.com/angular/material-start](https://github.com/angular/material-start)
*   [https://material.angularjs.org/latest/](https://material.angularjs.org/latest/)
