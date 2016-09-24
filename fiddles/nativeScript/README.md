NativeScript
======

NativeScript is a framework for developing cross-platform mobile apps using JavaScript.  This directory is dedicated
to my exploration of this framework.  Each directory corresponds to separate mobile app.


### Using fiddle.sh ...

#### To Create

[NativeScript](../nativeScript) fiddles are created using the [Angular2 Advanced-Seeder](https://github.com/NathanWalker/angular2-seed-advanced). The create logic baked into
the [fiddle.sh](../../scripts/fiddle.sh) script is based on [bash fiddle #84](../bash/fiddle-0084-NativeScript).  To create a new NativeScript
fiddle, run the following command from the [scripts](../../scripts) directory:

    ./fiddle.sh "create" "nativescript" "fiddle-####-<Name>"

where:

    <Name> is the name of the new fiddle.

If everything is working correctly, you should see a stream of output that looks like this [sample create output](create.markdown).

#### To Remove

To completely delete a fiddle and remove any reference from the [CHANGELOG.markdown](../../CHANGELOG.markdown) file, execute
the following command from the root [scripts](../../scripts) directory:

    ./fiddle.sh "delete" "nativescript" "<< NAME CRITERIA >>"

where `NAME CRITERIA` is the number or name of the fiddle to be deleted.  If everything is working correctly, you should
see a stream of output that looks like this [sample delete output](delete.markdown).

#### To Refactor

To rename a NativeScript fiddle and update any reference in the [CHANGELOG.markdown](../../CHANGELOG.markdown) file, execute
the following command from the root [scripts](../../scripts) directory:

    ./fiddle.sh "refactor" "nativescript" "<< CURRENT NAME >>" "<< NEW NAME >>"

If everything is working correctly, you should see a stream of output that looks like this [sample refactor output](refactor.markdown).

#### To Fork

To fork an existing NativeScript fiddle and use it as the basis of a new fiddle, execute the following command from the
root [scripts](../../scripts) directory:

    ./fiddle.sh "fork" "nativescript" "<< SOURCE FIDDLE NAME >>" "<< NEW FIDDLE NAME >>"

where `<< SOURCE FIDDLE NAME >>` is the name of the existing fiddle and `<< NEW FIDDLE NAME >>` is name of the fiddle you want
to create.  If everything is working correctly, you should see a stream of output that looks like this [sample fork output](fork.markdown).

#### To Start

To test out a NativeScript fiddle, for example [fiddle-0000-Template](fiddle-0000-Template) run the following command from the
[scripts](../../scripts) directory:

    ./fiddle.sh "start" "nativescript" "fiddle-0000-Template"

If everything is working correctly, you should see a stream of output that looks like this [sample start output](start.markdown).


### Machine Specific Configuration

Use the [.nativescriptrc](../../scripts/bin/nativescript/.nativescriptrc) file to configure machine specific variables.

#### Enabling Angular2 Templating

`fiddle.sh` includes logic to initialize new nativeScript fiddles using _just JavaScript_ or Angular2 (aka _transpiled typeScript_)
By default, JavaScript is enabled. This means, fiddles are initialized using the `nativescript create ...` command.
In my experience, this approach is faster and cleaner. That said, if you want get your feet wet with Angular2 and typeScript,
then you will need to complete the following steps:

1. Open the [scripts/bin/nativescript/.nativescriptrc](../../scripts/bin/nativescript/.nativescriptrc) file
2. Change the `__TEMPLATE_TYPE__` variable from `js` to `ng2`

Once this change is made, `fiddle.sh` will initialize new nativeScript fiddles using the [Angular2 Advanced Seeder](https://github.com/NathanWalker/angular2-seed-advanced.git) repo.


### Online Resources

* [Getting Started with NativeScript Repo](https://github.com/GettingStartedWithNativeScript?tab=overview&from=2016-08-01&to=2016-08-31&utf8=%E2%9C%93)
  * [Chapter 1 Repo](https://github.com/GettingStartedWithNativeScript/Chapter_1)
  * [Chapter 2 Repo](https://github.com/GettingStartedWithNativeScript/Chapter_2)
  * [Chapter 3 Repo](https://github.com/GettingStartedWithNativeScript/Chapter_3)
  * [Chapter 4 Repo](https://github.com/GettingStartedWithNativeScript/Chapter_4)
  * [Chapter 5 Repo](https://github.com/GettingStartedWithNativeScript/Chapter_5)
  * [Chapter 6 Repo](https://github.com/GettingStartedWithNativeScript/Chapter_6)
* [Raymond Camden's NativeScript Demos](https://github.com/cfjedimaster/NativeScriptDemos)


#### Apple iOS

* [Submitting Your App to the Store](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html)
