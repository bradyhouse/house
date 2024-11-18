ExtJS 6 (delete)
======

Executing the command `fiddle "delete" "extjs6" "0000"` produces the following output.

        {{ ʕ・ɭ・ʔ }}
        
        FIDDLE-STOP.SH
        ├────STOPFIDDLE
        
        FIDDLE-DELETE.SH
        
        fiddle type:	extjs6
        fiddle name:	fiddle-0000-Template
        
        Are you sure you want to delete this fiddle? [Y/n] Y
  
  
Enter `Y` and press [Enter].  This will produce the following output:


        FIDDLE-INDEX.SH
        12-19-18
        Done. All "extjs6" fiddles have been re-indexed.
        The "fiddle-0000-Template" extjs6 fiddle has been deleted successfully.
        FIDDLE-INDEX.SH
        12-19-18
        Done. All "extjs6" fiddles have been re-indexed.

                
Note, when a `extjs6` fiddle is deleted, the `fiddle.sh index extjs6` command is automatically initiated.  This command
rebuilds the collection's root [index.html](index.html) file to remove the reference to the deleted fiddle. 
In addition, it handles removing any lines from the master [CHANGELOG.MD](../../CHANGELOG.md) file that reference the
deleted fiddle.

