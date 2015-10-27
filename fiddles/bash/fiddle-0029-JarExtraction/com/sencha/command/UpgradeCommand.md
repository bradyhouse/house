This command downloads and installs the current version of Sencha Cmd. Or you
can specify the version you want to install as part of the command.

The following command downloads and installs the current version of Sencha Cmd:

    sencha upgrade

This command downloads a particular version:

    sencha upgrade 3.0.2.288

If the version requested is the already installed then this command will, by
default, do nothing. This can be forced using `--force`:

    sencha upgrade --force

If the version requested is the version in the `PATH`, the command will exit
with a message saying that the current version cannot be upgraded. In this case
the `--force` option is ignored.
