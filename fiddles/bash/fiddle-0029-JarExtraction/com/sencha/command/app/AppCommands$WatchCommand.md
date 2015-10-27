This command watches the current application's source code for changes and
and rebuild the necessary outputs to support "dev mode".

    sencha app watch
    
This will run an initial pass over the ant targets specified by the
build.trigger.targets ant property. During this pass, the compiler will 
be instrumented to capture the files used as inputs for the build
(JavaScript, Sass and page resources).

A subset of Ant build targets will be re-triggered each time a file in one
if the directories being monitored is created, deleted, or modified. 

A web server is automatically started and hosts the application at the
default port of 1841.

The high-level logic of the watch process is implemented in Ant. For 
details, see `".sencha/app/watch-impl.xml."`.
    
For information regarding the set of available Ant properties that
control the the watch process, see `".sencha/app/defaults.properties"`.

If you want Sencha Cmd to enable integration with Sencha Inspector during
this command, use the -i, --inspector switch:

    sencha app watch --inspector
    
This will add the necessary code to your application in order to connect with
Sencha Inspector in the default address (http://localhost:1839/).

The default address is configured via the inspector.address property on your Sencha Cmd
install dir sencha.cfg file, your personal configuration file (~/.sencha/cmd/sencha.cfg) 
or using the config command:

    sencha config --prop inspector.address=http://server:port/ then app watch --inspector
    
You can read more about the integration process in Sencha Inspector documentation:
http://docs.sencha.com/tools/sencha_inspector/