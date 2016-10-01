Tween.j (delete)
======

Executing the command `./fiddle.sh "delete" "tween" "0000"` from the `scripts` directory produces the following output.

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
      
      fiddle type:	tween
      fiddle name:	fiddle-0000-Template
      
      Are you sure you want to delete this fiddle? [Y/n]


Enter `Y` and press [Enter].  This will produce the following output:

        FIDDLE-INDEX.SH
        09-29-16
        Done. All "tween" fiddles have been re-indexed.
        The "fiddle-0000-Template" tween fiddle has been deleted successfully.
        
        
Note, when a `tween` fiddle is deleted, the `fiddle.sh index tween` command is automatically initiated.  This 
command will remove the reference to the fiddle from the root tween [index.html](index.html) page.
