ExtJS 6 (create)
======

Executing the command `fiddle "create" "extjs6" "fiddle-0000-Template"` produces the following output.


    {{ ʕ・ɭ・ʔ }}
    
    FIDDLE-DELETE.SH
    
    FIDDLE-CREATE.SH
    12-19-18
    Done. The "../fiddles/extjs6/fiddle-0000-Template" directory has been initialized.
    0
    FIDDLE-COMBINE.SH
    ├────CREATEAPPFILE
    ├────INITAPPFILE
    ├────ADDAPPFILEBODY
    ├────COMPLETEAPPFILE
    └──THE APP.JS FILE FOR "FIDDLE-0000-TEMPLATE" HAS BEEN UPDATED.
    
    
    FIDDLE-INDEX.SH
    12-19-18
    Done. All "extjs6" fiddles have been re-indexed.
    
    
Per the above output, fiddle.sh automates the following workflow when creating a new ExtJS 6 fiddle:

  1.  _Invoke fiddle-delete.sh_. Deletion begins by checking if an existing fiddle matching the requested name already 
      exists in the target collection (target directory). If it does, then the user is prompted whether they want to
      delete it.  If the user enters "Y", then the process will remove the root directory and any reference to the 
      fiddle in the master CHANGELOG.MD. Otherwise, the use case ends at this point.
  
  2.  _Invoke fiddle-create.sh_. The creation process for ExtJS 6 fiddles is template driven. The contents of the
      [template](template) directory are used to configure the initial contents of the new fiddle directory. Initially,
      a new ExtJS 6 fiddle directory includes the following files:
      
          .
          ├── README.md
          ├── data.json
          ├── index.html
          ├── src
          │   ├── init.js
          │   ├── meta.js
          │   ├── sequence.conf
          │   ├── store.js
          │   └── view.js
          └── styles.css
          
     
  3.  _Invoke fiddle-combine.sh_. ExtJS 6 fiddles are unique in that before they can be run in the browser, the source
      files, stored in the src directory (above) must be combined (concatenated together) into a single app.js file in
      the root fiddle directory. The combine script automates this process.  For additional details, refer to 
      the [combine details page](combine.md).

  4.  _Invoke fiddle-index.sh_. The index command is finally invoked to rebuild the collection's root [index.html](index.html)
      file so that includes a reference to the newly added fiddle. In addition, it handles appending a new line for
      the fiddle to the master [CHANGELOG.MD](../../CHANGELOG.md) file.
      

### Additional Info

[ExtJS 6](../extjs6) fiddles are created to simply run in the browser.  This means, the resulting sandbox can
be hosted using [live-server](https://www.npmjs.com/package/live-server) or any type of vanilla web server
package. The contents of the sandbox is based entirely on the contents of the [template](template) directory.


