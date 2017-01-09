RxJS (create)
======

Executing the command `./fiddle.sh "create" "rxjs" "fiddle-0000-Template"` from `scripts` directory produces the following output.


    {{ ʕ・ɭ・ʔ }}
    FIDDLE.SH
    FIDDLE-DELETE.SH
    
    FIDDLE-CREATE.SH
    09-29-16
    Password:
    Done. The "../fiddles/rxjs/fiddle-0000-Template" directory has been initialized.
    FIDDLE-INDEX.SH
    09-29-16
    Done. All "rxjs" fiddles have been re-indexed.
    

Note, when an `rxjs` fiddle is created, the `fiddle.sh index rxjs` command is automatically initiated.  This 
command will add a reference to the fiddle to the root angular [index.html](index.html) page.

### Additional Info

[RxJS](../rxjs) fiddles are created to simply run in the browser.  This means, the resulting sandbox can
be hosted using [live-server](https://www.npmjs.com/package/live-server) or any type of vanilla web server
package. The contents of the sandbox is based entirely on the contents of the [template](template) directory.


