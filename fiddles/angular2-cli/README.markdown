angular2-cli
======

_Angular?_ No, now its: _Angular2!_  Its ubiquitous.  Unfortunately, as I have found over the last few weeks ( _months_ ) 
working with the framework (see the [Angular2 collection](../Angular2)), there is pain involved with entry.  Creating an 
Angular2 app doesn't begin with a story board (or idea).  It begins with _tooling_.  It begins with deciding how your 
code base will go from typescript to transpiled javascript.  The [Angular Cmd Line Interface](https://cli.angular.io/), which by 
the way _smells_ alot like [Sencha Cmd](http://docs.sencha.com/cmd/5.x/intro_to_cmd.html), is meant to alleviate this 
pain (or delay) of entry.  This collection is aimed at my exploration and study of this new tool.  


### Using fiddle.sh ...

#### To Create

[Angular2-cli](../angular2-cli) fiddles are created using the [angular 2 CLI](https://cli.angular.io/) -- aka _ng create_.  
The create logic baked into the [fiddle.sh](../../scripts/fiddle.sh) script is based on [bash fiddle #76](../bash/fiddle-0076-Angular2CLI).
This means the [fiddle.sh](../../scripts/fiddle.sh) script provides some wrapper logic that integrates this CLI.  
To create a new angular2 fiddle, run the following command from the [scripts](../../scripts) directory like so:

    ./fiddle.sh "create" "angular2-cli" "fiddle-####-<Name>"

where:

    <Name> is the name of the new fiddle.

If everything is working correctly, you should see a stream of output that looks like this [sample create output](CREATE.markdown).

#### To Remove

TBW

#### To Refactor

TBW

#### To Fork

TBW

#### To Index

TBW

#### To Start

TBW



### Online Resources

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
*   [Ember CLI](http://ember-cli.com/user-guide/#watchman)

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
*   [http://www.google.com/design/spec/material-design/introduction.html](http://www.google.com/design/spec/material-design/introduction.html)
*   [https://github.com/angular/bower-material](https://github.com/angular/bower-material)
*   [http://www.binpress.com/blog/2014/06/26/polymer-vs-angular/](http://www.binpress.com/blog/2014/06/26/polymer-vs-angular/)
*   [https://gabiaxel.github.io/ng-polymer-elements/](https://gabiaxel.github.io/ng-polymer-elements/)
*   [https://getmdl.io/](https://getmdl.io/)
*   [https://www.youtube.com/watch?v=rrT6v5sOwJg](https://www.youtube.com/watch?v=rrT6v5sOwJg)
*   [http://materializecss.com/](http://materializecss.com/)
