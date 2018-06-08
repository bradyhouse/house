Electron (start)
======

Executing the command `./fiddle.sh "start" "electron" "0000"` produces the following output.

    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-START.SH
    ├────STARTSERVER
    ├────ELECTRONINSTALL
    /Users/e13542/.nvm/versions/node/v8.1.0/bin/electron -> /Users/e13542/.nvm/versions/node/v8.1.0/lib/node_modules/electron/cli.js
    
    > electron@2.0.2 postinstall /Users/e13542/.nvm/versions/node/v8.1.0/lib/node_modules/electron
    > node install.js
    
    Downloading SHASUMS256.txt
    [============================================>] 100.0% of 5.33 kB (5.33 kB/s)
    + electron@2.0.2
    added 147 packages in 29.896s
    ├────ELECTRONSTART
    ├────NVMINSTALL
    v8.9.4 is already installed.
    Now using node v8.9.4 (npm v5.6.0)
    ├────NPMINSTALL
    
    > electron@2.0.0 postinstall /Users/e13542/github/house_230/fiddles/electron/fiddle-0000-Template/node_modules/electron
    > node install.js
    
    Downloading SHASUMS256.txt
    [============================================>] 100.0% of 5.33 kB (5.33 kB/s)
    added 153 packages in 22.635s
    ├────NPMSTART
    
    > fiddle-0000-Template@1.0.0 start /Users/e13542/github/house_230/fiddles/electron/fiddle-0000-Template
    > electron .
    

The app will then open using the electron browser.  To stop the app, simply press `Ctrl`-`C`.
