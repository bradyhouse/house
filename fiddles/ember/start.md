Ember (start)
======

Executing the command `./fiddle.sh "start" "ember" "0000"` produces the following output for the specified target
fiddle, which in this case is [fiddle-0000-Template](fiddle-0000-Template).


    {{ ʕ・ɭ・ʔ }}
    
    FIDDLE-START.SH
    ├────STARTSERVER
    ├──EMBERINSTALL
    npm WARN deprecated exists-sync@0.0.4: Please replace with usage of fs.existsSync
    npm WARN deprecated exists-sync@0.0.3: Please replace with usage of fs.existsSync
    /Users/bradyhouse/.nvm/versions/node/v8.9.4/bin/ember -> /Users/bradyhouse/.nvm/versions/node/v8.9.4/lib/node_modules/ember-cli/bin/ember
    
    > fsevents@1.2.4 install /Users/bradyhouse/.nvm/versions/node/v8.9.4/lib/node_modules/ember-cli/node_modules/fsevents
    > node install
    
    [fsevents] Success: "/Users/bradyhouse/.nvm/versions/node/v8.9.4/lib/node_modules/ember-cli/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
    Pass --update-binary to reinstall or --build-from-source to recompile
    
    > spawn-sync@1.0.15 postinstall /Users/bradyhouse/.nvm/versions/node/v8.9.4/lib/node_modules/ember-cli/node_modules/spawn-sync
    > node postinstall
    
    + ember-cli@3.1.4
    added 782 packages in 31.921s
    ├────EMBERSTART
    ├────NVMINSTALL
    v8.9.4 is already installed.
    Now using node v8.9.4 (npm v5.6.0)
    ├────NPMINSTALL
    up to date in 5.878s
    ├──EMBERINSTALL
    Could not start watchman
    Visit https://ember-cli.com/user-guide/#watchman for more info.
    
    Build successful (7085ms) – Serving on http://localhost:1841/
    
    
    
    Slowest Nodes (totalTime => 5% )              | Total (avg)
    ----------------------------------------------+---------------------
    Babel: ember-data (2)                         | 2490ms (1245 ms)
    Babel: ember-test-helpers (2)                 | 1451ms (725 ms)
    Vendor JS (1)                                 | 552ms
    Rollup (1)                                    | 491ms
    Babel: ember-ajax (1)                         | 401ms
    

You can then access the app via web browser @ [http://localhost:1841/](http://localhost:1841/).  To stop the app, 
simply press `Ctrl-C`.
