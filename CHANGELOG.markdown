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
    3. Enhanced the ReadMe.Markdown update logic to append a "Forked from" section
    4. Added validation to insure that the new fiddle includes "fiddle" or "Fiddle" in the name.  NOTE - This is necessary to insure that the new fiddle is picked-up by the fiddle-index.sh script

### 201504041810

* Added [fiddles/exts/fiddle-20150405-fiddle3DPieChart](fiddles/extjs/fiddle-20150405-fiddle3DPieChart/README.markdown)
    * Fiddle adapted from Sencha's Chart Kitchen Sink's "Basic Pie Chart" example. The second pie chart is identical to the first except for the series type attribute, which has been changed to the new pie3d series type. This series type was introduced in ExtJS 5.1.

### 201504091810

* Refactored scripts/fiddle.sh
    * This script is now the master fiddle-*.sh script. It can be used as the single entry point interacting with the other "fiddle" prefixed scripts.
* Added scripts/fiddle-create.sh
    * This script replaces the scripts/fiddle.sh script. It can be used to create a specific type of fiddle.
* Enhanced scripts/bin/house-node-fs.sh to support an optional port parameter.  When supplied, the port number will override the default (hard coded) 8889 port number.
    * Similar enhancement made to--
        1. scripts/bin/house-node-fs-start.sh
        2. scripts/fiddle-start.sh
        3. scripts/fiddle-stop.sh
        4. scripts/fiddle.sh
    * Note - This change was made because I ran into a situation today where I needed to use the default port 8889 for something else.  Plus, having flexibility to startup the fiddle server on an alternate port makes sense-- its a good to have.
* Added [fiddles/extjs/fiddle-20150408-GridDynamicFieldFilter](fiddles/extjs/fiddle-20150408-GridDynamicFieldFilter/README.markdown)
* Added [fiddles/extjs/fiddle-20150407-GridFilteringToolBar](fiddles/extjs/fiddle-20150407-GridFilteringToolBar/README.markdown)
* Added [fiddles/extjs/fiddle-20150407-ChainedStoreFiltering](fiddles/extjs/fiddle-20150407-ChainedStoreFiltering/README.markdown)
* Added [fiddles/three/fiddle18Spheres](fiddles/three/fiddle18Spheres/README.markdown)

### 201504121810

* Added [fiddles/jquery/fiddle-0008-CanvasMouseCapture](fiddles/jquery/fiddle-0008-CanvasMouseCapture)
* Added [fiddles/jquery/fiddle-0009-CanvasMouseRecordRestore](fiddles/jquery/fiddle-0009-CanvasMouseRecordRestore)
* Added [fiddles/extjs/fiddle-20150412-GridFieldFilterContext](fiddles/extjs/fiddle-20150412-GridFieldFilterContext)

### 201504151810

* Added [fiddles/extjs/fiddle-20150412-GridItemContextFilterPlugin](fiddles/extjs/fiddle-20150412-GridItemContextFilterPlugin)
* Added [fiddles/extjs/fiddle-20150414-GridDynamicTagFilter](fiddles/extjs/fiddle-20150414-GridDynamicTagFilter)
* Added [fiddles/extjs/fiddle-20150414-HTMLEditor](fiddles/extjs/fiddle-20150414-HTMLEditor)
* Added [fiddles/chrome](fiddles/chrome)
* Added [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
    * Reflected changes:
        1. [scripts/fiddle.sh](scripts/fiddle.sh)
* Added [scripts/fiddle-chrome.sh](scripts/fiddle-chrome.sh)
    * Reflected changes:
        1. [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
        2. [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
* Added [fiddles/extjs/fiddle-20150415-SpreadsheetClipBoardMixin](fiddles/extjs/fiddle-20150415-SpreadsheetClipBoardMixin)
* Added [fiddles/chrome/fiddle-0001-templateTest](fiddles/chrome/fiddle-0001-templateTest)
* Added [fiddles/extjs/fiddle-20150415-MixinBeforeConstructorSetPlugins](fiddles/extjs/fiddle-20150415-MixinBeforeConstructorSetPlugins)
* Deleted fiddles/extjs/fiddle-20150402-CustomHeaderMenu
* Added [fiddles/extjs/fiddle-20150414-GridDynamicTagFilter](fiddles/extjs/fiddle-20150414-GridDynamicTagFilter)
* Added [fiddles/jquery/fiddle-0012-DifferentialInheritance](fiddles/jquery/fiddle-0012-DifferentialInheritance)

### 201504201810

* Added [fiddles/jquery/fiddle-0013-ConstructorInvocationPattern](fiddles/jquery/fiddle-0013-ConstructorInvocationPattern)
* Added [fiddles/extjs/fiddle-20150420-GridItemContextTagFilterMixin](fiddles/extjs/fiddle-20150420-GridItemContextTagFilterMixin)
* Added [fiddles/extjs/fiddle-20150421-GridItemContextDistinctTagFilterMixin](fiddles/extjs/fiddle-20150421-GridItemContextDistinctTagFilterMixin)
* Added [fiddles/extjs/fiddle-20150423-ComboBoxNumericFormatting](fiddles/extjs/fiddle-20150423-ComboBoxNumericFormatting)
* Added [fiddles/extjs/fiddle-20150423-VanillaClassDebugHook](fiddles/extjs/fiddle-20150423-VanillaClassDebugHook)
* Added [fiddles/php/fiddle-wpExtJSGrayTheme](fiddles/php/fiddle-wpExtJSGrayTheme)

### 201505011810

* Added [scripts/fiddle-node.sh](scripts/fiddle-node.sh)
    * Reflected changes:
        1. [scripts/fiddle.sh](scripts/fiddle.sh)
        2. [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
        3. [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
        4. [scripts/fiddle-index.sh](scripts/fiddle-index.sh)
        5. [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
* Added [fiddles/jquery/fiddle-0011-Calculator](fiddles/jquery/fiddle-0011-Calculator)
* Added [fiddles/chrome/fiddle-0002-Calculator](fiddles/chrome/fiddle-0002-Calculator)
* Added [fiddles/node/fiddle-0001-SocketIoChat](fiddles/node/fiddle-0001-SocketIoChat)
* Added [fiddles/dojo/fiddleEnhancedGridPlugins](fiddles/dojo/fiddleEnhancedGridPlugins)

### 201505061810

* Added [fiddles/three/README.markdown](fiddles/three/README.markdown)
* Added [fiddles/extjs/fiddle-20150505-GridFilteringFloatBug](fiddles/extjs/fiddle-20150505-GridFilteringFloatBug)
* Added [fiddles/jquery/fiddle-0009-CanvasMouseRecordRestore](fiddles/jquery/fiddle-0009-CanvasMouseRecordRestore)
* Removed fiddles/phantomjs (unfinished)
* Added [fiddles/jquery/fiddle-0014-RequestAnimationFrameLimit](fiddles/jquery/fiddle-0014-RequestAnimationFrameLimit)
* Added [fiddles/jquery/fiddle-0015-xUnitTesting](fiddles/jquery/fiddle-0015-xUnitTesting)
* Enhanced [fiddles/jquery/template](fiddles/jquery/template) to include test.html, test.js files
    * Reflected changes:
        1. [scripts/fiddle-jquery.sh](scripts/fiddle-jquery.sh)
* Added [scripts/fiddle-tween.sh](scripts/fiddle-tween.sh)
    * Reflected changes:
        1. [scripts/fiddle.sh](scripts/fiddle.sh)
        2. [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
        3. [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
        4. [scripts/fiddle-index.sh](scripts/fiddle-index.sh)
        5. [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        6. [scripts/fiddle-start.sh](scripts/fiddle-start.sh)
        7. [fiddles/index.html](fiddles/index.html)
* Added [fiddles/tween/fiddle-0001-BouncingBall](fiddles/tween/fiddle-0001-BouncingBall)
* Added [fiddles/tween/fiddle-0002-100MovingDots](fiddles/tween/fiddle-0002-100MovingDots)
* Added [fiddles/tween/fiddle-0003-CreatejsEaseQuadIn](fiddles/tween/fiddle-0003-CreatejsEaseQuadIn)

### 201505210420

* Added [fiddles/extjs/fiddle-20150521-ClearStoreAndColumns](fiddles/extjs/fiddle-20150521-ClearStoreAndColumns)

