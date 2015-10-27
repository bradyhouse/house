This command generates a new Sencha Cmd Package. A package is in many ways like
an application in that it contains any of the following pieces:

  * JavaScript source
  * SASS styles
  * Arbitrary resources

All of these are integrated by a build process using `sencha package build`.

For example:

    sencha generate package foo

If this command is run from an application directory, the package will be added
automatically to the requires array in the `"app.json"` file. To avoid this use
the `-require` switch:

    sencha generate package -require foo

To use this package in other applications (or packages), you just add the name
of the package to the requires array in the `"app.json"` or `"package.json"`
file:

    requires: [
        'foo'
    ]

All packages reside in the `"./packages"` folder of the workspace (which is
often the same folder as your application).
