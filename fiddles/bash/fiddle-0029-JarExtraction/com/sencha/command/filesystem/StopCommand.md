This command stops the Web server previously started by `sencha web start`.

If the server was started with this command:

    sencha web start

This command will stop that server:

    sencha web stop

If you are using a custom port, these must match. For example:

    sencha web -port 8000 start

From another terminal or console, this will stop the server:

    sencha web -port 8000 stop

*NOTE:* These are low-level commands that do not relate to the current
application. For applications, consider the `web-start` target using
`sencha ant web-start` and `sencha ant web-stop`.
