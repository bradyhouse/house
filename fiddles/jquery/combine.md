JQuery (combine)
======

Executing the command `./fiddle.sh "combine" "jquery" "0041"` from the `scripts` directory produces
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
    FIDDLE-COMBINE.SH
    ├────CREATEAPPFILE
    ├────INITAPPFILE
    ├────ADDAPPFILEBODY
    ├────COMPLETEAPPFILE
    └──THE APP.JS FILE FOR "FIDDLE-0041-FABRICIMAGECLOUD" HAS BEEN UPDATED.
      

### Purpose

The purpose of the `combine` command is to prep a given a fiddle for publication to jsfiddle.net or codepen.  In order 
to publish a fiddle or POC on these sites, all javascript must be defined in a single block (or file).  Although there 
are many tools that can be downloaded from NPM for combining and formatting js files, few are designed with this goal in
mind. I have yet to find a component or tool that will assemble specific js files in a specific order using an easy to read 
(aka _non-uglified_) format. The `combine` command bridges this gap.  In addition, by combining all files into
one, the fiddle's index.html page does not need to be touched as new src files are added. It simply includes
a script tag link to the combined file.


### Use Case

Files from the src sub-directory are assembled based on the contents of the `src/sequence.conf` file. In the case of the
above example, which is an actual working fiddle, the []src/sequence.conf](fiddle-0041-FabricImageCloud/src/sequence.conf) 
file contains the following:

    meta.js
    namespace.js
    toolkit/base.js
    toolkit/util.js
    toolkit/canvas.js
    toolkit/image.js
    model/Photo.js
    model/PhotoAlbum.js
    init.js

After the command completes, the [app.js](fiddle-0041-FabricImageCloud/app.js) file in the root directory then contains 
the contents of all of these files.  


