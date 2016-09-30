Dojo (sample refactor)
======

Executing the command `./fiddle.sh "refactor" "dojo" "0000" "fiddle-0100-Refactor"` from the `scripts` directory produces
the following output.

      H o u s e
      oooooooooooo  o8o        .o8        .o8  oooo
       888       8  `"'        888        888   888
       888         oooo   .oooo888   .oooo888   888   .ooooo.
       888oooo8     888  d88   888  d88   888   888  d88   88b
       888          888  888   888  888   888   888  888ooo888
       888          888  888   888  888   888   888  888    .o
      o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
      
      FIDDLE.SH
      FIDDLE-REFACTOR.SH
      FIDDLE-INDEX.SH
      09-29-16
      Done. All "dojo" fiddles have been re-indexed.
      Refactor process completed successfully.
      "fiddle-0000-Template" is now "fiddle-0100-Refactor".
      

Note, when an `dojo` fiddle is `refactored`, the `fiddle.sh index dojo` command is automatically initiated.  This 
command will add a reference to the fiddle to the root angular [index.html](index.html) page.




