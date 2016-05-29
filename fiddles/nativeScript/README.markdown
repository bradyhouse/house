nativeScript
======

I discovered (or heard about) nativeScript on a recent javaScript jabber podcast.  NativeScript is a
framework for developing cross-platform mobile apps using JavaScript.  This directory is dedicated
to my exploration of this framework.  Each directory corresponds to separate mobile app.


### Using fiddle.sh ...

#### To Create

[NativeScript](../nativeScript) fiddles are created using the [Angular2 Advanced-Seeder](https://github.com/NathanWalker/angular2-seed-advanced). The create logic baked into 
the [fiddle.sh](../../scripts/fiddle.sh) script is based on [bash fiddle #84](../bash/fiddle-0084-NativeScript).  To create a new NativeScript 
fiddle, run the following command from the [scripts](../../scripts) directory like so:

    ./fiddle.sh "create" "nativescript" "fiddle-####-<Name>"

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

To test out a NativeScript fiddle, for example [fiddle-0000-Template](fiddle-0000-Template) run the following command from the 
[scripts](../../scripts) directory:

    ./fiddle.sh "start" "nativescript" "fiddle-0000-Template"

If everything is working correctly, you should see a stream of output that looks like this [sample start output](start.markdown).


