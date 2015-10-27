This command loads and executes the specified JavaScript source file or files.

    sencha js file.js[,file2.js,...] [arg1 [arg2 ...] ]

## Files

The first argument to this command is the file or files to execute. If there
are multiple files, separate them with commas. In addition to the command line
technique of specifying files, this command also recognizes the following
directive:

    //@require ../path/to/source.js

This form of `require` directive uses a relative path based on the file that
contains the directive. Any given file will only be executed once, in much the
same manner as the compiler.

## Context

A primitive `console` object with the following methods is provided to the
JavaScript execution context:

 * `log`
 * `debug`
 * `info`
 * `warn`
 * `error`
 * `dir`
 * `trace`
 * `time` / `timeEnd`

Arguments beyond the first can be accessed in JavaScript with the global `$args`
array. The current directory can be accessed with `$curdir`.

The Sencha Cmd object can be accessed with `sencha`. This object has a `version`
property and a `dispatch` method.

    if (sencha.version.compareTo('3.0.0.210') < 0) {
        console.warn('Some message');
    } else {
        // dispatch any command provided by Cmd:
        sencha.dispatch([ 'app', 'build', $args[1] ]);
    }

Beyond the above, the executing JavaScript has full access to the JRE using
the `importPackage` and `importClass` methods.

For example:

    importPackage(java.io);

    var f = new File('somefile.txt');  // create a java.io.File object

For further details on the JavaScript engine provided by Java, consult the
Java Scripting guide:

http://docs.oracle.com/javase/6/docs/technotes/guides/scripting/programmer_guide/index.html
