Angular2 Seeder (index)
======

Executing the command `./fiddle.sh "index" "angular2-seeder"` from the `scripts` directory produces the following output.

    H o u s e
    oooooooooooo  o8o        .o8        .o8  oooo
     888       8  `"'        888        888   888
     888         oooo   .oooo888   .oooo888   888   .ooooo.
     888oooo8     888  d88   888  d88   888   888  d88   88b
     888          888  888   888  888   888   888  888ooo888
     888          888  888   888  888   888   888  888    .o
    o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
    
    FIDDLE.SH
    FIDDLE-INDEX.SH
    09-27-16
    Done. All "angular-seeder" fiddles have been re-indexed.


This command rebuilds the [dist/index.html](dist/index.html) page based on the angular2 cli fiddles that
have been built and added to the root [dist](dist) directory.  Provided the fiddle is not listed in the [.gitignore](../../.gitignore) 
file and includes a root `index.html` file, then a link to dist version of the fiddle is added to the page. For additional 
information regarding the build process, see the [build info and details page](build.md).  
