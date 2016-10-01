SVG (combine)
======

Executing the command `./fiddle.sh "combine" "svg" "0027" "app.js" "0""` from the `scripts` directory produces
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
    └──THE APP.JS FILE FOR "FIDDLE-0027-IMAGECLOUD" HAS BEEN UPDATED.
      

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
above example, which is an actual working fiddle, the [src/sequence.conf](fiddle-0027-ImageCloud/src/sequence.conf) 
file contains the following:

    metadata.js
    namespaces.js
    ../../toolkit/Base.js
    ../../toolkit/Util.js
    ../../toolkit/Pattern.js
    ../../toolkit/Definitions.js
    ../../toolkit/Path.js
    ../../toolkit/Rectangle.js
    ../../toolkit/Surface.js
    ../../toolkit/Animate.js
    ../../toolkit/Image.js
    model/Photo.js
    model/PhotoAlbum.js
    view/Viewport.js
    init.js


After the command completes, the [app.js](fiddle-0027-ImageCloud/app.js) file in the root directory then contains 
the contents of all of these files.  


### Usage Details

To see usage details, execute the command `./fiddle.sh "combine"` from the `scripts` directory.  This will produces the 
following output.
    
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
    
    Nope ~ Incorrect number of arguments
    
    Usage:
    
    ./fiddle.sh "combine" "[t]" "[f]" "[a]" "[c]"
    
    [t] - type. Valid types include:
    
    	"angular2"	Angular2 Fiddle
    	"d3"		Data Driven Document Fiddle
    	"extjs5"	Ext JS 5 Fiddle
    	"extjs6"	Ext JS 6 Fiddle
    	"jquery"	jQuery / Bootstrap Fiddle
    	"three"		hree.js / WebGl Fiddle
    	"svg"		Scalar Vector Graphic Fiddle
    
    [f] - existing fiddle name.  For example: "fiddleParabolaSurface"
    
    [a] - (optional) target file name. Defaults to "app.js"
    
    [c] - (optional) disable closure. Defaults to "1" (false)

