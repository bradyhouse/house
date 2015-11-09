toolkit
======

Collection of wrapper classes intended for re-use across svg fiddles. Each class virtualizes (or models) a
specific SVG tag element. To package (include) these classes into the app.js file of a given svg fiddle,
simply add a relative path reference to the src/sequence.conf file.
For example, to include all of the classes, add the following entries:

    ../../toolkit/Util.js
    ../../toolkit/Stop.js
    ../../toolkit/Setter.js
    ../../toolkit/AnimateTransform.js
    ../../toolkit/RadialGradient.js
    ../../toolkit/LinearGradient.js
    ../../toolkit/Pattern.js
    ../../toolkit/Definitions.js
    ../../toolkit/Circle.js
    ../../toolkit/Rectangle.js
    ../../toolkit/Group.js
    ../../toolkit/Text.js
    ../../toolkit/TextPath.js
    ../../toolkit/ViewController.js
    ../../toolkit/Path.js
    ../../toolkit/Surface.js

When you run the [fiddle.sh](scripts/fiddle.sh) shell script with the "combine svg <fiddle name> app.js 0"
parameters, it will add the class definitions to the main closure of your app.js file.  For a working example
see [fiddle-0024-Clock](fiddles/svg/fiddle-0024-clock).





