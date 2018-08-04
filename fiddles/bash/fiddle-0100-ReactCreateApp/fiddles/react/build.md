React (build)
======

Executing the command `./fiddle.sh "build" "react" "fiddle-0000-Template"` produces the following output 
(see below).  This command, is used to package (aka `build`) a react fiddle for publication. This fiddle
command automates the npm and install build process from the fiddle's root directory. Once the process completes, 
2 additional automated steps occur. First, a directory containing the minified version of the fiddle is 
added to the root [dist](dist) directory.  The sub-directory uses the name of the fiddle. In this case, 
[dist/fiddle-0000-Template](dist/fiddle-0000-Template).  In addition, the build process, also updates
[dist/index.html](dist/index.html) file to include a navigational link to the compiled version of the fiddle.


    {{ ʕ・ɭ・ʔ }}
    
    FIDDLE-BUILD.SH
    ├────BUILD
    FIDDLE-BUILD.SH
    Bash version 3.2.57(1)-release...
    ├────REACTBUILD
    
    > fiddle@0.1.0 build /Users/bradyhouse/github/house_238/fiddles/bash/fiddle-0100-ReactCreateApp/fiddles/react/fiddle-0000-Template
    > react-scripts build
    
    Creating an optimized production build...
    Compiled successfully.
    
    File sizes after gzip:
    
      36.94 KB  build/static/js/main.a285be49.js
      299 B     build/static/css/main.c17080f1.css
    
    The project was built assuming it is hosted at the server root.
    You can control this with the homepage field in your package.json.
    For example, add this to build it for GitHub Pages:
    
      "homepage" : "http://myname.github.io/myapp",
    
    The build folder is ready to be deployed.
    You may serve it with a static server:
    
      yarn global add serve
      serve -s build
    
    Find out more about deployment here:
    
      http://bit.ly/2vY88Kr
    
    
    └──BUILD COMPLETE.
    
    0000
    FIDDLE-INDEX.SH
    08-04-18
    Done. All "react" fiddles have been re-indexed.
   
    
    
