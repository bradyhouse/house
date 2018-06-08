Electron (create)
======

Executing the command `./fiddle.sh "create" "electron" "fiddle-0000-Template"` produces the following output.

    {{ ʕ・ɭ・ʔ }}
    
    ├────SETUP
    ├────INSTALL
    ├────IINSTALLSHRINKWRAP
    + shrinkwrap@0.4.0
    updated 1 package in 4.001s
    Done. shrinkwrap installed successfully.
    
    
    ├────ELECTRONINSTALL
    ├────ELECTRONCREATE
    Cloning into 'fiddle-0000-Template'...
    remote: Counting objects: 10, done.
    remote: Compressing objects: 100% (9/9), done.
    remote: Total 10 (delta 0), reused 6 (delta 0), pack-reused 0
    Unpacking objects: 100% (10/10), done.
    Password:
    
    > electron@2.0.0 postinstall /Users/bradyhouse/github/house_230/fiddles/electron/fiddle-0000-Template/node_modules/electron
    > node install.js
    
    added 153 packages in 6.046s
    ├────NPMSHRINKWRAP
    npm notice package-lock.json has been renamed to npm-shrinkwrap.json. npm-shrinkwrap.json will be used for future installations.
    
    0
    └──".FIDDLES/ELECTRON/FIDDLE-0000-TEMPLATE" CREATED.
    
    
    FIDDLE-INDEX.SH
    06-08-18
    
 
#### Additional Info
    
[electron](../electron) fiddles are created based on the[electron-quick-start app](https://github.com/electron/electron-quick-start),
which available on github.  The create logic is baked into the [fiddle.sh](../../scripts/fiddle.sh) script is based on 
[bash fiddle #86](../bash/fiddle-0086-Electron).  
