Aurelia
======

The final lecture given by the keynote speaker at the [2016 NFJS Angular 2 Summit](https://angularsummit.com/conference/chicago/2016/05/home),
introduced a new framework called [Aurelia](aurelia.io). ... _Yah-dah, yah-dah, yah-dah_ ... [aurelia](http://aurelia.com/) fiddles.


### Using fiddle.sh ...

#### To Create

http://aurelia.io/docs.html#/aurelia/framework/latest/doc/article/getting-started

[Aurelia](../nativeScript) fiddles are created using the [Aurelia Typescript]() toolkit. The create logic baked into 
the [fiddle.sh](../../scripts/fiddle.sh) script is based on [bash fiddle #79](../bash/fiddle-0079-Aurelia).  To create a new Aurelia 
fiddle, run the following command from the [scripts](../../scripts) directory like so:

    ./fiddle.sh "create" "aurelia" "fiddle-####-<Name>"

where:

    <Name> is the name of the new fiddle.

If everything is working correctly, you should see a stream of output that looks like this [sample create output](create.markdown).

#### To Remove

_TBW_

#### To Refactor

_TBW_

#### To Fork

_TBW_

#### To Index

_TBW_

#### To Start

To test out a aurelia fiddle, for example [fiddle-0000-Template](fiddle-0000-Template) run the following command from the 
[scripts](../../scripts) directory:

    ./fiddle.sh "start" "aurelia" "fiddle-0000-Template"

If everything is working correctly, you should see a stream of output that looks like this [sample start output](start.markdown).



### Online Resources

*   [Main Site](http://aurelia.com)
*   [Docs](http://aurelia.io/docs.html#/aurelia/framework/latest/doc/article/getting-started)
*   [JSPM](http://jspm.io/)
