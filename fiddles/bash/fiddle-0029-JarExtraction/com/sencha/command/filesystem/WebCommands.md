This category provides commands to manage a simple HTTP file server based on
`Jetty` (see http://www.eclipse.org/jetty/).

The following command is the simplest form:

    sencha web start

This starts the web server on the default port and "mounts" the current
directory as the web root. This command will block the terminal so you can use
CTRL+C to end the process.

If this is started as a background process, you can use this command to stop
the server from another terminal:

    sencha web stop

The port used can be specified on the command line or using the configuration
property `cmd.web.port`. For example:

    sencha web -port 8080 start

And to stop the above:

    sencha web -port 8080 stop

For details on the web root, console help on `sencha web start`:

    sencha help web start

**NOTE:** These are low-level commands that do not relate to the current
application. For applications, consider the `web-start` target using
`sencha ant web-start` and `sencha ant web-stop`.

When using the `sencha app watch` command, a web server will be started 
automatically, so neither the `sencha web start` or `sench ant web-start` 
commands are necessary
