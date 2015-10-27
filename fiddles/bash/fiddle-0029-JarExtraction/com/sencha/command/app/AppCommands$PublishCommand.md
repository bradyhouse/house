This command will publish the contents of the application's build directory as a new
version of a Sencha Web Application Manager application using `sencha manager version create`.

Configuration for this command should be provided by the `manager` key in `app.json`:

    "manager": {
        "id": 12345,
        "host": "https://api.space.sencha.com/json.rpc",
        "file": "${app.output.base}",

        "apiKey": "...",
        "secret": "..."
    }

It is **not recommended** to store the `apiKey` or `secret` in `app.json` but instead to
store them in a file local to this machine (such as ~/.sencha/cmd/sencha.cfg). For
example:

    app.manager.apiKey=...
    app.manager.secret=...

This will avoid placing credentials in a shared source repository.
