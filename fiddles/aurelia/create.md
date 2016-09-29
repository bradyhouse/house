Aurelia (sample create)
======

Executing the command `./fiddle.sh "create" "aurelia" "fiddle-0000-Template"` produces the following output.

    H o u s e
    oooooooooooo  o8o        .o8        .o8  oooo
     888       8  `"'        888        888   888
     888         oooo   .oooo888   .oooo888   888   .ooooo.
     888oooo8     888  d88   888  d88   888   888  d88   88b
     888          888  888   888  888   888   888  888ooo888
     888          888  888   888  888   888   888  888    .o
    o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
    
    FIDDLE.SH
    FIDDLE-DELETE.SH
    
    FIDDLE-CREATE.SH
    FIDDLE-AURELIA.SH
    Bash version 3.2.57(1)-release...
    └──FIDDLE-0000-TEMPLATE CREATED.
    
    FIDDLE-INDEX.SH
    09-28-16
    Done. All "aurelia" fiddles have been re-indexed.


Note, when an `aurelia` fiddle is created, the `fiddle.sh index aurelia` command is automatically initiated.  This 
command will add a reference to the fiddle to the root aurelia [index.html](index.html) page.


### Additional Info

[Aurelia](../aurelia) fiddles are created to run in the browser.  This means, the resulting sandbox can
be hosted using [live-server](https://www.npmjs.com/package/live-server) or any type of vanilla web server
package. The contents of the sandbox is based entirely on the contents of the [template](template) directory, which
are based on (for now ...) the _hello world_ example published on [plnkr.co](http://plnkr.co/edit/5vMoxM?p=preview).
