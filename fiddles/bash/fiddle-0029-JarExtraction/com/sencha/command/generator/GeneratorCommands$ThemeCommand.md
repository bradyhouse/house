This command generates a new Theme. For Ext JS 4.1, themes are "owned" by an
application. In Ext JS 4.2 and beyond, themes are Packages.

In Ext JS 4.2, theme packages can extend other themes. By default, generated
themes extend "ext-theme-classic". This can be overridden using `--extend`.

To generate a stand-alone Theme in Ext JS 4.2, follow these steps. Generate a
workspace (with `"ext"` folder) using Ext JS 4.2 SDK unzipped on your system:

    sencha -sdk /path/to/ext-4.2.0 generate workspace MyWorkspace
    cd MyWorkspace

From inside the workspace, use the `"ext"` folder to generate the theme package:

    sencha -sdk ext generate theme --extend ext-theme-neptune MyTheme

The above could equivalently have used the SDK used to create the workspace.

The `-sdk` switch is used here to indicate the framework on which the theme is
based. This is not needed if the command is run from an Ext JS application
folder.

`NOTE:` Does not apply to Sencha Touch.
