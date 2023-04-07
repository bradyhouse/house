Vue (build)
======

Executing the command `./fiddle.sh "build" "vue" "fiddle-0000-TemplateJs"` produces the following output 
(see below).  This command, is used to package (aka `build`) a vue fiddle for publication. This fiddle
command automates the npm and install build process from the fiddle's root directory. Once the process completes, 
2 additional automated steps occur. First, a directory containing the minified version of the fiddle is 
added to the root [dist](dist) directory.  The sub-directory uses the name of the fiddle. In this case, 
[dist/fiddle-0000-TemplateJs](dist/fiddle-0000-TemplateJs).  In addition, the build process, also updates
[dist/index.html](dist/index.html) file to include a navigational link to the compiled version of the fiddle.

    {{ ʕ・ɭ・ʔ }}
    FIDDLE-BUILD.SH
    ├────BUILDFIDDLE
    ├────BUILD
    FIDDLE-BUILD.SH
    Bash version 3.2.57(1)-release...
    ├────NVMINSTALL
    v16.11.1 is already installed.
    Now using node v16.11.1 (npm v8.0.0)
    ├────VUEBUILD

    > templatejs@0.0.0 build
    > vite build

    vite v4.2.1 building for production...
    ✓ 23 modules transformed.
    dist/assets/logo-277e0e97.svg    0.28 kB
    dist/index.html                  1.00 kB
    dist/assets/index-1da8cd0c.css   3.68 kB │ gzip:  1.20 kB
    dist/assets/index-a911f458.js   62.95 kB │ gzip: 24.96 kB
    ✓ built in 441ms

    └──BUILD COMPLETE.

    0000
    FIDDLE-INDEX.SH
    04-05-23
    Done. All "vue" fiddles have been re-indexed.

  
    
    
