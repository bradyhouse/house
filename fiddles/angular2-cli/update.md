Angular2 CLI (build)
======

Executing the command `./fiddle.sh "update" "angular2-cli" "fiddle-0000-Template"` produces the following output 
(see below).  This command, is used to update the dependencies defined in the package.json of the target fiddle. 

    FIDDLE-BUILD.SH
    Bash version 3.2.57(1)-release...
    ├────NVMINSTALL
    v6.9.0 is already installed.
    Now using node v6.9.0 (npm v3.10.8)
    ├────SEEDERBUILD
    ├────NPMBUILDPROD
    /Users/bradyhouse/github/house/fiddles/angular2-cli/fiddle-0000-Template
    
    > fiddle@0.0.0 build /Users/bradyhouse/github/house/fiddles/angular2-cli/fiddle-0000-Template
    > ng build
    
    Hash: f85fc09197d146ae984c
    Time: 8811ms
    chunk    {0} polyfills.bundle.js, polyfills.bundle.js.map (polyfills) 165 kB {4} [initial] [rendered]
    chunk    {1} main.bundle.js, main.bundle.js.map (main) 3.61 kB {3} [initial] [rendered]
    chunk    {2} styles.bundle.js, styles.bundle.js.map (styles) 9.77 kB {4} [initial] [rendered]
    chunk    {3} vendor.bundle.js, vendor.bundle.js.map (vendor) 2.09 MB [initial] [rendered]
    chunk    {4} inline.bundle.js, inline.bundle.js.map (inline) 0 bytes [entry] [rendered]
    
    └──BUILD COMPLETE.
    
    0000
    FIDDLE-INDEX.SH
    04-25-17
    Password:
    Done. All "angular2-cli" fiddles have been re-indexed.
    
    
