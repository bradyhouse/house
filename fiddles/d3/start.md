D3 (start)
======

Executing the command `./fiddle.sh "start" "angular2-cli" "0000"` produces the following output.

    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-START.SH
    ├────STARTSERVER
    ├────NGINSTALL
    ├────NGSTART
    ├────NVMINSTALL
    v8.9.4 is already installed.
    Now using node v8.9.4 (npm v5.6.0)
    ├────NPMINSTALL
    
    > fsevents@1.2.4 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/fsevents
    > node install
    
    [fsevents] Success: "/Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/fsevents/lib/binding/Release/node-v57-darwin-x64/fse.node" already installed
    Pass --update-binary to reinstall or --build-from-source to recompile
    
    > uws@9.14.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/uws
    > node-gyp rebuild > build_log.txt 2>&1 || exit 0
    
    
    > node-sass@4.9.0 install /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/node-sass
    > node scripts/install.js
    
    Cached binary found at /Users/bradyhouse/.npm/node-sass/4.9.0/darwin-x64-57_binding.node
    
    > node-sass@4.9.0 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/node-sass
    > node scripts/build.js
    
    Binary found at /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/node-sass/vendor/darwin-x64-57/binding.node
    Testing binary
    Binary is fine
    
    > @angular/cli@6.0.7 postinstall /Users/bradyhouse/github/house_230/fiddles/angular2-cli/fiddle-0000-Template/node_modules/@angular/cli
    > node ./bin/ng-update-message.js
    
    added 1226 packages in 45.489s
    ** Angular Live Development Server is listening on localhost:1841, open your browser on http://localhost:1841/ **
    
    Date: 2018-06-05T11:09:59.234Z
    Hash: f9b8c2e16d0426625f2e
    Time: 13031ms
    chunk {main} main.js, main.js.map (main) 10.8 kB [initial] [rendered]
    chunk {polyfills} polyfills.js, polyfills.js.map (polyfills) 227 kB [initial] [rendered]
    chunk {runtime} runtime.js, runtime.js.map (runtime) 5.4 kB [entry] [rendered]
    chunk {styles} styles.js, styles.js.map (styles) 15.7 kB [initial] [rendered]
    chunk {vendor} vendor.js, vendor.js.map (vendor) 3.39 MB [initial] [rendered]
    ℹ ｢wdm｣: Compiled successfully.
    

You can then access the running fiddle, by navigating to [localhost:1841](http://localhost:1841).  To stop the web 
server, simply press `Ctrl`-`C`.
