Angular2 CLI (build)
======

Executing the command `./fiddle.sh "build" "angular2-cli" "fiddle-0000-Template"` produces the following output 
(see below).  This command, is used to package (aka `build`) an Angular2 Cli fiddle for publication. This fiddle
command automates the npm and install build process from the fiddle's root directory. Once the process completes, 
2 additional automated steps occur. First, a directory containing the minified version of the fiddle is 
added to the root [dist](dist) directory.  The sub-directory uses the name of the fiddle. In this case, 
[dist/fiddle-0000-Template](dist/fiddle-0000-Template).  In addition, the build process, also updates
[dist/index.html](dist/index.html) file to include a navigational link to the compiled version of the fiddle.


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
    
    
