RxJS (delete)
======

Executing the command `./fiddle.sh "delete" "rxjs" "0000"` from the `scripts` directory produces the following output.

      {{ ʕ・ɭ・ʔ }}
      FIDDLE.SH
      FIDDLE-DELETE.SH
      
      fiddle type:	rxjs
      fiddle name:	fiddle-0000-Template
      
      Are you sure you want to delete this fiddle? [Y/n]


Enter `Y` and press [Enter].  This will produce the following output:

        FIDDLE-INDEX.SH
        09-29-16
        Done. All "rxjs" fiddles have been re-indexed.
        The "fiddle-0000-Template" rxjs fiddle has been deleted successfully.
        
        
Note, when a `rxjs` fiddle is deleted, the `fiddle.sh index rxjs` command is automatically initiated.  This 
command will remove the reference to the fiddle from the root rxjs [index.html](index.html) page.
