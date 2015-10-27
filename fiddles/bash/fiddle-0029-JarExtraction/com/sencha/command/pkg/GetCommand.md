This command ensures that a specified package is locally available. This does
`not` extract the package to a particular location, but rather, enables apps or
other packages to get the package from the local repository (that is, without
downloading it).

For example, to ensure that `"foo"` and `"bar"` are available locally:

    sencha package get foo bar

To get all packages required by those specified packages:

    sencha package get -recursive foo bar
