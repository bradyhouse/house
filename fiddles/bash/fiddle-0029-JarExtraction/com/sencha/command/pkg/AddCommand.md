Adds a new package file (`"*.pkg"`) to the local repository. These packages will
be signed automatically if their `creator` property matches the `name` associated
with the local repository.

Once a package is added to the local repository, any repository that points to
this repository as a remote repository will be able to download the package.

The `sencha package build` process generates an appropriate `".pkg"` file in the
`workspace.build.dir`.
