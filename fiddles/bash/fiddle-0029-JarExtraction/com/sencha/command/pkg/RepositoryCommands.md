These commands manage the local repository and its connections to remote
repositories.

## Remote Repositories

The primary role of the local repository is as a cache of packages that it
downloads from one or more specified remote repositories. By default, Sencha
Cmd adds the Sencha package repository as a remote repository. Using these
commands you can manage these connections.

This command adds a remote repository connection named `"foo"`:

    sencha repo add foo http://coolstuff.foo/packages

Following this command, any packages contained in this repository will be
available. Typically these packages are used by adding their name (and possibly
version) to your application's `"app.json"` in its `requires` array.

    {
        requires: [
            'cool-package@2.1'
        ]
    }

Then:

    sencha app build

The above addition will require version 2.1 of `"cool-package"`. The remote
repository added above will be checked for this package, and if found, it is
downloaded to the local repository and cached there as well as extracted to
your app's`"packages/cool-package"` folder and automatically integrated in to
your build.

## Authoring Packages

To author packages for others to use in their applications, you will need to
initialize your local repository with your name:

    sencha repo init -name "My Company, Inc."

See these for more details:

    sencha help package
    sencha help repo init
