React (build)
======

Executing the command `./fiddle.sh "build" "angular2-cli" "fiddle-0000-Template"` produces the following output 
(see below).  This command, is used to package (aka `build`) an Angular2 Cli fiddle for publication. This fiddle
command automates the npm and install build process from the fiddle's root directory. Once the process completes, 
2 additional automated steps occur. First, a directory containing the minified version of the fiddle is 
added to the root [dist](dist) directory.  The sub-directory uses the name of the fiddle. In this case, 
[dist/fiddle-0000-Template](dist/fiddle-0000-Template).  In addition, the build process, also updates
[dist/index.html](dist/index.html) file to include a navigational link to the compiled version of the fiddle.


   
    
    
