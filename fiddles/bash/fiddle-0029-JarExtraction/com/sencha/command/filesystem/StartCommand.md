This command starts the Web server and routes requests to the specified files.
For example:

    sencha web start

This will "mount" the current directory as the web root at the default port.
The port can be specified if needed:

    sencha web -port 8000 start

To stop the server, press CTRL+C or you can use these commands (from another
terminal), respectively:

    sencha web stop

    sencha web -port 8000 stop

## The Web Root

By default, `sencha web start` mounts the current directory so that all files
and folders are available at the root of the web server's URL. Sometimes you
may need to connect various folders into a common web root. To do this, use
the `-map` switch like so:

    sencha web start -map foo=/path/to/foo,bar=/another/path

Given the above, the following URL entered in a browser will display the files
in `"/path/to/foo"`:

    http://localhost:8000/foo

And this URL will display the files in `"/another/path"`:

    http://localhost:8000/bar

For more details regarding the `Sencha Cmd` web server, run this command:

    sencha help web

*NOTE:* These are low-level commands that do not relate to the current
application. For applications, consider the `web-start` target using
`sencha ant web-start` and `sencha ant web-stop`.
