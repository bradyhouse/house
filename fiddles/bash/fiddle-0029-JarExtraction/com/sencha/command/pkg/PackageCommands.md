These commands manage packages in the local repository.

These commands are not typically used directly because application requirements
are automatically used by `sencha app build` and `sencha app refresh --packages`
to handle these details.

## Using Packages

The most common commands needed to use packages are those that connect your
local package repository to remote repositories. By default, the local repo has
one remote repository defined that points at Sencha's package repository.

To add, remove or display these connections see:

    sencha help package repo

## Authoring Packages

When authoring packages for others to use in their applications, however, these
commands are involved. In particular, you must first initialize your local
package repository. This is because the local repository is automatically
initialized "anonymously". In this state, the local repository can only be used
to retrieve and cache other packages. To create and publish packages, the local
repository must be initialized with a name and an optional email address.

This name is not required to be globally unique, but it is a good idea to use a
name that is unique and meaningful as a package author.

    sencha repository init -name "My Company, Inc."

    sencha repository init -name mySenchaForumId

For details see:

    sencha help repository init
