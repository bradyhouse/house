Remove a remote repository from the local repository's list of remote
repositories. For example, if a remote was previously added:

    sencha repo add foo http://foo.bar/pkgs

This command will remove it:

    sencha repo remove foo

`NOTE:` This command does not remove packages that you may have downloaded from
this remote as they are now cached in the local repository.
