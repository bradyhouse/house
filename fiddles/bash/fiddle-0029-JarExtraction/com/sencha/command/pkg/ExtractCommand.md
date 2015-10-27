This command extracts a package or packages from the repository. If necessary
the packages will be downloaded from remote repositories and cached locally for
future use.

`NOTE:` This is `not` typically executed manually but is handle automatically
as part of the build process based on the "requires" found in `"app.json"` and/or
`"package.json"`.

To extract a package named "foo" at version "1.2" to a specified location:

    sencha package extract -todir=/some/path foo@1.2

This will create `"/some/path/foo"`. To recursively extract packages required
by "foo", you would do this:

    sencha package extract -recurse -todir=/some/path foo@1.2

When complete, "foo" and all of its required packages will reside in the folder
specified.

`NOTE:` It is recommended to use `-todir` and allow the package name to be used
as the immediate subdirectory of that folder. The `-outdir` option allows you to
strip off this directory but prevents recursive extraction as a result.
