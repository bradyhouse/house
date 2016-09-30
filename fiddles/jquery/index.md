JQuery (index)
======

Executing the command `./fiddle.sh "index" "jquery"` from the `scripts` directory produces the following output.

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
    09-29-16
    Done. All "jquery" fiddles have been re-indexed.


This command rebuilds the root [index.html](index.html) page based on `fiddle-*` sub-directories (aka fiddles). Provided 
the directory is not listed in the [.gitignore](../../.gitignore) file and includes a `index.html` file, then a link fiddle's
index page is injected into the root collection index page.

