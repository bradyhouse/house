CHANGELOG
===

Alternately, the _Daily Diary of my Programming Dreams_.

### 201503301950

* Added **fiddles/jquery/fiddle-0006-VideoPlayer** ~ [js fiddle](http://jsfiddle.net/bradyhouse/mszj46cf/)
* Added **fiddles/extjs/fiddle-20150330-BufferedDataGrid** ~ [sencha fiddle](https://fiddle.sencha.com/#fiddle/kh9)
* Added Updated LICENSE
* Added .gitattributes
* Added .editorconfig


### 201503311810

* Added **fiddles/extjs/fiddle-20150331-ExtJS4ColumnFiltering** ~ [sencha fiddle](https://fiddle.sencha.com/#fiddle/kie)
* Added **fiddles/extjs/fiddle-20150331-ColumnFiltering** ~ (under construction)
* Added **fiddles/jquery/fiddle/fiddle-0007-BootstrapVideoCarousel** ~ [js fiddle](http://jsfiddle.net/bradyhouse/86mp2t4q/)


### 201504031810

* Updated **fiddles/extjs/fiddle-20150331-ColumnFiltering** ~ [sencha fiddle](https://fiddle.sencha.com/#fiddle/km0) 
    * This fiddle illustrates how to enable column filter on a grid panel bound to a Ext.data.JsonStore--ie an "unbuffered" store. It combines the structure from fiddle-20150331-ExtJS4ColumnFiltering with the json data file (781 records) from fiddle-20150330-BufferedDataGrid.
    * Additionally, this fiddle introduces an alternate (or new) "template" style.  The fiddle is rendered using a pop-up window.  In the app.js, the actual fiddle code ends when the win.show() call.  At run time, the fiddle code runs in the modal pop-up (foreground). The boiler plate code appears behind it (background).     

* Added **scripts/bin/house-disk-space.sh**  
    * This script can be used to determine how much disk space is available on your machine.  I created it because my Mac is constantly running out of space and I am sick of having to open the "Macintosh HD Info" dialog.  This script tells me how much space I have straight from the command line.
        
* Added **fiddles/extjs/fiddle-20150401-BufferedColumnFiltering** ~ (Doesn't work)
    * This fiddle illustrates how to enable column filter on a grid panel bound to a Ext.data.BufferedStore.  It combines the structure from fiddle-20150331-ExtJS4ColumnFiltering with the json data file (781 records) from fiddle-20150330-BufferedDataGrid using a BufferedStore. Similar to the kitchen sink example [sencha 5.1.0 buffered store example](http://dev.sencha.com/ext/5.1.0/examples/grid/buffered-store.html), column filtering doesn't work. 

* Added **fiddles/extjs/fiddle-20150402-UnBufferedColumnFiltering** ~ [Sencha Fiddle](https://fiddle.sencha.com/#fiddle/ko5)
    * This fiddle is a response to fiddle-20150401-BufferedColumnFiltering. It illustrates how to enable column filter on a grid panel bound to a vanilla data store--i.e. Ext.data.Store.  It combines the structure from fiddle-20150331-ExtJS4ColumnFiltering with the json data file (781 records) from fiddle-20150330-BufferedDataGrid using a DataStore.  Additionally, its an example of using the "bufferedrender" plugin as per the forum post ~ http://www.sencha.com/forum/showthread.php?259314.

* Added **fiddles/extjs/fiddle-20150402-CustomColumnHeaderMenu** ~ (Under Construction)
    * Fiddle exploring how to override the default menu exposed by the column collection of the Ext.grid.Panel.

* Added **fiddles/three/fiddleParabola**
    * Fiddle used to rewrite the fiddles/three/template/app.js template using a global window.app variable.

* Added **fiddles/extjs/fiddle-20150403-SpreadSheetSelection** ~ [Sencha Fiddle](https://fiddle.sencha.com/#fiddle/kqj)
    * Fiddle exploring how to leverage the spreadsheet selection model and clipboard plugin introduced in 5.1.

* Enhanced **scripts/fiddle-fork.sh**
    1. Added support for all fiddle types
    2. Added call to the fiddle-index script
    3. Enhanced the ReadMe.Markdown update logic to append a "forked from" 
    4. Added validation to insure that the new fiddle includes "fiddle" or "Fiddle" in the name.  NOTE - This is necessary to insure that the new fiddle is picked-up by the fiddle-index.sh script
    
    
        