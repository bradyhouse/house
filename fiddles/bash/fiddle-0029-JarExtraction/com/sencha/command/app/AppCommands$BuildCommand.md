This command builds the current application.

    sencha app build [production|testing|native|package]

This will build your application in its current configuration and generate the
build output in the `"build/<environment>"` folder. This location and many
other properties can be configured in your application's configuration file
`".sencha/app/sencha.cfg"` or the provided build script `"build.xml"`.

For locally overriding build properties, the build script loads an optional
properties file called `"local.properties"` if present in your app folder. The
purpose of this file is to define build properties that are in some way special
to the local environment (that is, the local machine). As such, this file is
not intended to be tracked in source control.

## Using Ant

This command is equivalent to running the provided Ant script directly using
the following command:

    sencha ant [production|testing|native|package] build

To tune the process, start by looking at the generated `"build.xml"` in your
app folder. The actual build logic is located in `".sencha/app/build-impl.xml"`.

The `"build.xml"` script can be used by many Continuous Integration (CI) systems
if they understand Apache Ant (most do). If not, the Sencha Cmd command line
can be used as you would during development. If the CI system understands Ant,
however, it is often more convenient to use that integration rather than using
a command line invocation.
