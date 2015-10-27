This command generates an empty application given a name and target folder.

The application can be extended using other `sencha generate` commands (e.g.,
`sencha generate model`).

Other application actions are provided in the `sencha app` category (e.g.,
`sencha app build`).

Sencha Cmd can also automatically download and extract a framework by
specifying the name of the framework as an argument:

    sencha generate app -ext MyAppName ./MyAppPath

This will generate an application using the newest version available
for the specified framework.

For Ext JS 6, by default, this application will be a Universal Application.
To override this and select a particular toolkit, you can use either of
these variations:

    sencha generate app -ext -classic MyAppName ./MyAppPath
    sencha generate app -ext -modern MyAppName ./MyAppPath
