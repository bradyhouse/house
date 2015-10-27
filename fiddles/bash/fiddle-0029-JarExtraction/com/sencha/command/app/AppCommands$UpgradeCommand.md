This command upgrades the current application (based on current directory) to a
specified new framework.

    sencha app upgrade /path/to/sdk
    
To download and extract an appropriate framework from the Sencha package
repository, the framework may also be specified by name:

    sencha app upgrade -ext

or by name and version, separated by an '@' character:

    sencha app upgrade -ext@5.0.0.647

NOTE: This will upgrade the framework used by the current application in the
current workspace. This will effect any other applications in this workspace
using the same framework (i.e., "ext" or "touch").

To upgrade just the generate scaffolding of your application to a new version
of Sencha Cmd and not the framework in use, either omit the path to the 
framework:

    sencha app upgrade
    
or use the --noframework option:

    sencha app upgrade --noframework
