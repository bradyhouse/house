Initializes the local repository. The local repository is used to cache local
copies of packages (potentially for multiple versions).

`NOTE:` This step is not typically necessary because the local repository is
automatically initialized in "anonymous" mode. This command is needed only if
you want to publish packages for others to use in their application. To publish
packages you must initial the local repository and provide a name:

    sencha repository init -name "My Company, Inc." -email me@foo.com

Beyond initializing the repository file structures, this command also generates
a public/private key pair and stores these in the local repository. The private
key is used to sign packages added to this local repository.

For details on adding packages:

    sencha help package add

## Private Key

Packages added to the local repository with a `creator` property equal to the
name given to `sencha repository init` will be signed using the private key
stored in the local repository.

In this release of Sencha Cmd, these signatures are only used to test package
integrity. You can backup this key if desired, but a new key can be regenerated
by running `sencha repo init` at any time. In future versions it may be more
important to backup your private key.

## Remote Access

Making the local package repository available as a remote repository for others
to access requires some knowledge of the disk structure of the repository. By
default, Sencha Cmd creates the local repository adjacent to its installation
folder. For example, given the following location of Sencha Cmd:

    /Users/myself/bin/Sencha/Cmd/3.1.0.200/

The local respository is located at:

    /Users/myself/bin/Sencha/Cmd/repo

This is to allow your local repository to be used by newer versions of Sencha
Cmd. The folder to publish to others as an HTTP URL is:

    /Users/myself/bin/Sencha/Cmd/repo/pkgs

`IMPORTANT:` Do `NOT` expose the parent folder of `"pkgs"` - that folder holds
private information (such as your private key). Further, Sencha Cmd will not
recognize the structure as a valid remote repository.

If you want to host the repository on a public server, simply copy the `"pkgs"`
folder to a web server and share the HTTP address.
