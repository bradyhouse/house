Three.js (create)
======

Executing the command `./fiddle.sh "create" "three" "fiddle-0000-Template"` from `scripts` directory produces the following output.


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
      FIDDLE-THREE.SH
      10-01-16
      Done. The "../fiddles/three/fiddle-0000-Template" directory has been initialized.
      FIDDLE-COMBINE.SH
      ├────CREATEAPPFILE
      ├────INITAPPFILE
      ├────ADDAPPFILEBODY
      ├────COMPLETEAPPFILE
      └──THE APP.JS FILE FOR "FIDDLE-0000-TEMPLATE" HAS BEEN UPDATED.
      
      FIDDLE-INDEX.SH
      10-01-16
      Done. All "three" fiddles have been re-indexed.
    

Note, when an `three` fiddle is created, the `fiddle.sh index three` command is automatically initiated.  This 
command will add a reference to the fiddle to the root angular [index.html](index.html) page.


### Additional Info

[Three.js](../three) fiddles are created to simply run in the browser.  This means, the resulting sandbox can
be hosted using [live-server](https://www.npmjs.com/package/live-server) or any type of vanilla web server
package. The contents of the sandbox is based entirely on the contents of the [template](template) directory.


