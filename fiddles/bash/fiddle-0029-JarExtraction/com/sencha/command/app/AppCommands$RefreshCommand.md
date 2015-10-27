This command regenerates the metadata file containing "bootstrap" data for the
dynamic loader and class system.

This must be done any time a class is added, renamed or removed.

This command can also update any required packages if you have added package
requirements to your application. To refresh required packages (which may
download those packages from remote repositories), do this:

    sencha app refresh --packages

The additional parameters are seldom used.
