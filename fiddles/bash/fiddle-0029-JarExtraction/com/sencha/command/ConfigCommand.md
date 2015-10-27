This command can be used to either set configuration options singly or load a
configuration file to set multiple options.

Because these configuration options are only held for the current execution of
Sencha Cmd, you will almost always use `then` to chain commands that will now
be executed with the modified configuration.

For example, to change the theme of an Ext JS application for a build:

    sencha config -prop app.theme=ext-theme-neptune then app build

Multiple properties can be loaded from a properties file:

    sencha config -file neptune.properties then app build

The content of `"neptune.properties"` might be something like this:

    app.theme=ext-theme-neptune
    app.build.dir=${app.dir}/build/neptune

In this case, an alternative would be to set `app.dir` in the applications's
`"sencha.cfg"` file like so:

    app.build.dir=${app.dir}/build/${app.theme}
