This command will capture an image and slice manifest for a specified page.

It is rarely necessary to call this command directly as it is part of the theme
build process. In Ext JS 4.2 applications or theme packages, this command is
called by the build script's `slice` step. In Ext JS 4.1 applications this is
called for each application theme or directly by the 'sencha theme build`
command.

For example, this is roughly the command performed by the `slice` step for a
theme package:

    sencha theme capture -page sass/example/theme.html \
                         -image build/theme-capture.png \
                         -manifest build/theme-capture.json

Once the image and slicer manifest are produced, the `sencha fs slice` command
extracts the background images and sprites required for Internet Explorer.
