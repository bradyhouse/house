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
* Added [fiddles/three/fiddle-0003-18Spheres](fiddles/three/fiddle-0003-18Spheres/README.markdown)

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

### 201505310420

* Added [fiddles/jquery/fiddle-0016-BackgroundCover](fiddles/jquery/fiddle-0016-BackgroundCover)
* Added [scripts/fiddle-refactor.sh](scripts/fiddle-refactor.sh)
    * Reflected changes:
        1. [scripts/fiddle.sh](scripts/fiddle.sh)
* Added [fiddles/extjs/fiddle-20150528-TableLayout](fiddles/extjs/fiddle-20150528-TableLayout)
* Added [fiddles/extjs/fiddle-20150528-GridSubColumns](fiddles/extjs/fiddle-20150528-GridSubColumns)
* Added [fiddles/java](fiddles/java)
* Added [fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleBinaryOperator.java](fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleBinaryOperator.java)
* Added [fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleFibonacci.java](fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleFibonacci.java)
* Added [fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleNoArguments.java](fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleNoArguments.java)
* Added [fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleStreamFilter.java](fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleStreamFilter.java)
* Added [fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleStreamMap.java](fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleStreamMap.java)
* Added [fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleReduceFilter.java](fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleReduceFilter.java)
* Added [fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleReduceMap.java](fiddles/java/src/io/bradyhouse/fiddles/java8/FiddleReduceMap.java)

### 201506020420

* Added [fiddles/jquery/fiddle-0017-DateSerialization](fiddles/jquery/fiddle-0017-DateSerialization)
* Added [fiddles/extjs/fiddle-20150602-GridRecordToolTip](fiddles/extjs/fiddle-20150602-GridRecordToolTip)
* Updated all index.html pages to include background carousel slider
    * Reflected changes:
        1. [fiddles/resources/css/custom.css](fiddles/resources/css/custom.css)
        2. [fiddles/dojo/resources/css/custom.css](fiddles/dojo/resources/css/custom.css)
        3. [fiddles/extjs/resources/css/custom.css](fiddles/extjs/resources/css/custom.css)
        4. [fiddles/jquery/resources/css/custom.css](fiddles/jquery/resources/css/custom.css)
        5. [fiddles/three/resources/css/custom.css](fiddles/three/resources/css/custom.css)
        6. [fiddles/tween/resources/css/custom.css](fiddles/tween/resources/css/custom.css)
        7. [fiddles/jquery/fiddle-0005-BootStrapCarousel/resources/css/custom.css](fiddles/jquery/fiddle-0005-BootStrapCarousel/resources/css/custom.css)
        8. [fiddles/jquery/fiddle-0006-BootStrapVideoControls/resources/css/custom.css](fiddles/jquery/fiddle-0006-BootStrapVideoControls/resources/css/custom.css)
        9. [fiddles/jquery/fiddle-0006-VideoPlayer/resources/css/custom.css](fiddles/jquery/fiddle-0006-VideoPlayer/resources/css/custom.css)
        10. [fiddles/jquery/fiddle-0007-BootstrapVideoCarousel/resources/css/custom.css](fiddles/jquery/fiddle-0007-BootstrapVideoCarousel/resources/css/custom.css)
        11. [fiddles/jquery/fiddle-0011-Calculator/resources/css/custom.css](fiddles/jquery/fiddle-0011-Calculator/resources/css/custom.css)
        12. [fiddles/jquery/template/resources/css/custom.css](fiddles/jquery/template/resources/css/custom.css)
* Migrated dojo fiddles to CDN
    * Reflected changes:
        1. [fiddles/dojo/fiddleDateTextBox/index.html](fiddles/dojo/fiddleDateTextBox/index.html)
        2. [fiddles/dojo/fiddleEnhancedGrid/index.html](fiddles/dojo/fiddleEnhancedGrid/index.html)
        3. [fiddles/dojo/fiddleEnhancedGridPlugins/index.html](fiddles/dojo/fiddleEnhancedGridPlugins/index.html)
        4. [fiddles/dojo/fiddleEpochTimeStamp/index.html](fiddles/dojo/fiddleEpochTimeStamp/index.html)
        5. [fiddles/dojo/fiddleObjectToQuery/index.html](fiddles/dojo/fiddleObjectToQuery/index.html)
        6. [fiddles/dojo/fiddleParsingDates/index.html](fiddles/dojo/fiddleParsingDates/index.html)
        7. [fiddles/dojo/fiddleTabContainer/index.html](fiddles/dojo/fiddleTabContainer/index.html)
        8. [fiddles/dojo/template/index.html](fiddles/dojo/template/index.html)

### 201506040420

* Added [fiddles/jquery/fiddle-0018-BootstrapDatagrid](fiddles/jquery/fiddle-0018-BootstrapDatagrid)
* Updated [fiddles/jquery/template/data.json](fiddles/jquery/template/data.json) ~ Overwrote with [fiddles/extjs/template/data.json](fiddles/extjs/template/data.json)
* Updated [fiddles/jquery/template/index.html](fiddles/jquery/template/index.html) ~ Added footer link to [fiddles/jquery/template/test.html](fiddles/jquery/template/test.html)
* Added [fiddles/extjs/fiddle-20150605-ExtendToolTip](fiddles/extjs/fiddle-20150605-ExtendToolTip)
* Added [fiddles/extjs/fiddle-20150605-LockedColumns](fiddles/extjs/fiddle-20150605-LockedColumns)
* Refactored [fiddles/jquery/template/test.html](fiddles/jquery/template/test.html)
    * Reflected changes:
        1. [scripts/fiddle-jquery.sh](scripts/fiddle-jquery.sh)
* Added [fiddles/jquery/resources/js/yui-min.js](fiddles/jquery/resources/js/yui-min.js)
    * Reflected changes:
        1. Updated [fiddles/jquery/template/test.html](fiddles/jquery/template/test.html)

### 201506200420

* Added [fiddles/bash](fiddles/bash)
     * Reflected changes:
        1. [scripts/fiddle-bash.sh](scripts/fiddle-bash.sh)
        2. [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
        3. [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
        4. [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        5. [fiddles/bash/README.markdown](fiddles/bash/README.markdown)
* Added [fiddles/bash/fiddle-0001-FunctionBasics](fiddles/bash/fiddle-0001-FunctionBasics)
* Refactored [scripts/fiddle-index.sh](scripts/fiddle-index.sh)
    * Note - It now ignores fiddles whose relative path has been added to the .gitignore file.

### 201506210420

* Enhanced [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
    * Note - It now appends an entry to the CHANGELOG.markdown file.
* Enhanced [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
    * Note - If the target directory doesn't exist, it now throws an error.
* Added [fiddles/bash/fiddle-0003-SystemDate](fiddles/bash/fiddle-0003-SystemDate)
* Added [scripts/fiddle-test.sh](scripts/fiddle-test.sh)
    * Note - This allows for the running of the JsTestDriver library for a given fiddle.
    * Reflected changes:
        1. Added [fiddles/jquery/fiddle-0020-JsTestDriver](fiddles/jquery/fiddle-0020-JsTestDriver)
        2. Added [scripts/bin/house-jstestdriver-start.sh](scripts/bin/house-jstestdriver-start.sh)
        3. Added [scripts/bin/house-jstestdriver-stop.sh](scripts/bin/house-jstestdriver-stop.sh)
        4. Added [scripts/bin/house-jstestdriver-test.sh](scripts/bin/house-jstestdriver-test.sh)
        5. [scripts/fiddle.sh](scripts/fiddle.sh)
        6. Added [fiddles/jquery/template/jsTestDriver.conf](fiddles/jquery/template/jsTestDriver.conf)
        7. Deleted fiddles/jquery/template/test.js
        8. Deleted fiddles/jquery/template/test.html
* Added [fiddles/jquery/fiddle-0020-JsTestDriver](fiddles/jquery/fiddle-0020-JsTestDriver)
* Deleted scripts/bin/house-java-version.sh

### 201506230420

* Added [fiddles/extjs/fiddle-20150623-ButtonSetLocalX](fiddles/extjs/fiddle-20150623-ButtonSetLocalX)
* Added [fiddles/extjs/fiddle-20150623-jsTestDriver](fiddles/extjs/fiddle-20150623-jsTestDriver)
* Added [fiddles/bash/fiddle-0002-ListCommand](fiddles/bash/fiddle-0002-ListCommand)
* Added [fiddles/three/fiddle-0000-TemplateTest](fiddles/three/fiddle-0000-TemplateTest)
* Added [fiddles/three/fiddle-0002-WebGlDetection](fiddles/three/fiddle-0002-WebGlDetection)
* Added [fiddles/bash/fiddle-0004-CurlDownload](fiddles/bash/fiddle-0004-CurlDownload)
* Added [fiddles/bash/fiddle-0006-SayCommand](fiddles/bash/fiddle-0006-SayCommand)
* Added [fiddles/bash/fiddle-0007-InstallUbuntuZfs](fiddles/bash/fiddle-0007-InstallUbuntuZfs)
* Added [fiddles/bash/fiddle-0008-ZfsFileVolume](fiddles/bash/fiddle-0008-ZfsFileVolume)
* Added [fiddles/bash/fiddle-0009-TrCommand](fiddles/bash/fiddle-0009-TrCommand)
* Added [fiddles/bash/fiddle-0010-SortCommand](fiddles/bash/fiddle-0010-SortCommand)
* Added [fiddles/bash/fiddle-0011-WcCommand](fiddles/bash/fiddle-0011-WcCommand)
* Added [fiddles/bash/fiddle-0012-PrCommand](fiddles/bash/fiddle-0012-PrCommand)
* Added [fiddles/bash/fiddle-0013-NlCommand](fiddles/bash/fiddle-0013-NlCommand)
* Added [fiddles/jquery/fiddle-0021-CanvasToDataURL](fiddles/jquery/fiddle-0021-CanvasToDataURL)

### 201506290420

* Refactored [scripts/fiddle-jquery.sh](scripts/fiddle-jquery.sh)
    * Note - Refactored based on the 201506210420 changes.  Now, it updates the tests/test.js based on the supplied fiddle name.
* Added [fiddles/extjs/fiddle-20150630-MsgBoxVariations](fiddles/extjs/fiddle-20150630-MsgBoxVariations)
* Added [fiddles/extjs/fiddle-20150702-SimplePromise](fiddles/extjs/fiddle-20150702-SimplePromise)
* Added [fiddles/extjs/fiddle-20150701-GMapRecursiveTree](fiddles/extjs/fiddle-20150701-GMapRecursiveTree)
* Added [fiddles/svg](fiddles/svg)
    * Reflected changes:
        1. added [scripts/fiddle-svg.sh](scripts/fiddle-svg.sh)
        2. added [fiddles/svg/README.markdown](fiddles/svg/README.markdown)
        3. updated [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
        4. updated [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
        5. updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        6. updated [scripts/fiddle-index.sh](scripts/fiddle-index.sh)
        7. updated [scripts/fiddle-refactor.sh](scripts/fiddle-refactor)
        8. updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
* Added [fiddles/svg/fiddle-0001-Circle](fiddles/svg/fiddle-0001-Circle)
* Added [fiddles/bash/fiddle-0014-ReadCommand](fiddles/bash/fiddle-0014-ReadCommand)
* Added [fiddles/svg/fiddle-0002-Rectangle](fiddles/svg/fiddle-0002-Rectangle)
* Added [fiddles/svg/fiddle-0003-Ellipses](fiddles/svg/fiddle-0003-Ellipses)

### 201507060420

* Enhanced [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
    Note - Script now adds an entry to the CHANGELOG.markdown file.
* Added [fiddles/svg/fiddle-0006-PathLineSubCmd](fiddles/svg/fiddle-0006-PathLineSubCmd)
* Added [fiddles/svg/fiddle-0007-PathQuadCurveSubCmd](fiddles/svg/fiddle-0007-PathQuadCurveSubCmd)
* Added [fiddles/extjs/fiddle-20150706-AjaxRetryPopUp](fiddles/extjs/fiddle-20150706-AjaxRetryPopUp)
* Added [fiddles/svg/fiddle-0008-ReusablePattern](fiddles/svg/fiddle-0008-ReusablePattern)
* Added [fiddles/bash/fiddle-0015-BackgroundJobs](fiddles/bash/fiddle-0015-BackgroundJobs)
* Added [fiddles/svg/fiddle-0009-Text](fiddles/svg/fiddle-0009-Text)
* Added [fiddles/svg/fiddle-0010-DynamicShapeInjection](fiddles/svg/fiddle-0010-DynamicShapeInjection)
* Added [fiddles/extjs/fiddle-20150709-GridLayoutPersistence](fiddles/extjs/fiddle-20150709-GridLayoutPersistence)
* Added [fiddles/extjs/fiddle-20150710-DynamicColumnState](fiddles/extjs/fiddle-20150710-DynamicColumnState)
* Added [fiddles/extjs/fiddle-20150710-DynamicColumnState](fiddles/extjs/fiddle-20150710-DynamicColumnState)

### 201507110420

* Added [scripts/fiddle-list.sh](scripts/fiddle-list.sh)
    * Note - Needed a way to list the fiddles of a given type from within the scripts directory.  This becomes useful when you want to "fork" or "refactor" an existing fiddle.
    * Reflected changes:
        1. Updated [scripts/fiddle.sh](scripts/fiddle.sh)
* Moved fiddles/extjs to [fiddles/extjs5](fiddles/extjs5)
    * Note - Response to the release of ExtJS version 6 this week.
    * Reflected changes:
        1. updated [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
        2. updated [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
        3. updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        4. updated [scripts/fiddle-index.sh](scripts/fiddle-index.sh)
        5. updated [scripts/fiddle-refactor.sh](scripts/fiddle-refactor)
        6. updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        7. updated [scripts/fiddle-start.sh](scripts/fiddle-start.sh)
        8. updated [fiddles/index.html](fiddles/index.html)
* Added [fiddles/extjs/6](fiddles/extjs6)
    * Note - Response to the release of ExtJS version 6 this week.
    * Reflected changes:
        1. updated [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
        2. updated [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
        3. updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        4. updated [scripts/fiddle-index.sh](scripts/fiddle-index.sh)
        5. updated [scripts/fiddle-refactor.sh](scripts/fiddle-refactor)
        6. updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        7. updated [scripts/fiddle-start.sh](scripts/fiddle-start.sh)
        8. updated [fiddles/index.html](fiddles/index.html)
* Added [fiddles/bash/fiddle-0016-ForLoops](fiddles/bash/fiddle-0016-ForLoops)
* Deleted all "sencha-*" scripts
    * Note - I have forgotten what these scripts do. I haven't used them and therefore, no point in maintaining.
    * Reflected changes:
        1. [scripts/README.markdown](scripts/README.markdown)
* Added [fiddles/extjs6/fiddle-0001-HelloWorld](fiddles/extjs6/fiddle-0001-HelloWorld)

### 201507260420

* Added [fiddles/bash/fiddle-0017-InstallJoeEditor](fiddles/bash/fiddle-0017-InstallJoeEditor)
* Added [fiddles/svg/fiddle-0011-DeclarativeAnimiation](fiddles/svg/fiddle-0011-DeclarativeAnimiation)
* Added [fiddles/extjs6/fiddle-0002-Calculator](fiddles/extjs6/fiddle-0002-Calculator)
    * Note - This one is unfinished.
* Added [fiddles/svg/fiddle-0012-AnimatedTextPath](fiddles/svg/fiddle-0012-AnimatedTextPath)
* Added [fiddles/extjs6/fiddle-0003-Defect18720](fiddles/extjs6/fiddle-0003-Defect18720)
* Added [fiddles/bash/fiddle-0018-awkPrintStatements](fiddles/bash/fiddle-0018-awkPrintStatements)
* Added [fiddles/extjs6/fiddle-0004-BarChart](fiddles/extjs6/fiddle-0004-BarChart)
* Added [fiddles/extjs5/fiddle-20150721-BarChartPanZoom](fiddles/extjs5/fiddle-20150721-BarChartPanZoom)
* Added [fiddles/extjs6/fiddle-0005-LockedColumnState](fiddles/extjs6/fiddle-0005-LockedColumnState)
* Added [scripts/download-codekit.sh](download-codekit.sh)
    * Note - [CodeKit](http://incident57.com/codekit/) is web development tool intended for mac users.  If your mac is
    locked down like mine, this script can be used to download the executable using Curl.  This will allow you to open
    the zip without getting the annoying "Not from the App Store" error.
* Refactored [scripts/fiddle-list.sh](scripts/fiddle-list.sh)
* Added [fiddles/compass](fiddles/compass)
    * Reflected changes:
        1. updated [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
        2. updated [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
        3. updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        4. updated [scripts/fiddle-index.sh](scripts/fiddle-index.sh)
        5. updated [scripts/fiddle-refactor.sh](scripts/fiddle-refactor)
        6. updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        7. updated [scripts/fiddle-start.sh](scripts/fiddle-start.sh)
        8. updated [fiddles/index.html](fiddles/index.html)
        9. updated [scripts/fiddle-list.sh](scripts/fiddle-list.sh)
        10. added [scripts/fiddle-compass.sh](scripts/fiddle-compass.sh)
        11. added [fiddles/compass/README.markdown](fiddles/compass/README.markdown)
* Added [fiddles/svg/fiddle-0013-GradientCylinder](fiddles/svg/fiddle-0013-GradientCylinder)
* Added [fiddles/svg/fiddle-0014-TriColorGradients](fiddles/svg/fiddle-0014-TriColorGradients)
* Added [fiddles/svg/fiddle-0015-GradientWeave](fiddles/svg/fiddle-0015-GradientWeave)
* Added [fiddles/compass/fiddle-0001-Template](fiddles/compass/fiddle-0001-Template)

### 201508010420

* Started [fiddles/jquery/fiddle-0024-AjaxJsonPYahooChartApi](fiddles/jquery/fiddle-0024-AjaxJsonPYahooChartApi)
* Added [fiddles/svg/fiddle-0016-getBBoxMethod](fiddles/svg/fiddle-0016-getBBoxMethod)
* Added [fiddles/extjs6/fiddle-0008-CandleStickChart](fiddles/extjs6/fiddle-0008-CandleStickChart)
* Added [fiddles/svg/fiddle-0017-SmilToScript](fiddles/svg/fiddle-0017-SmilToScript)
* Added [fiddles/extjs6/fiddle-0009-DjiComboChart](fiddles/extjs6/fiddle-0009-DjiComboChart)
* Added [fiddles/compass/fiddle-0002-Partials](fiddles/compass/fiddle-0002-Partials)
* Added [fiddles/compass/fiddle-0003-Mixins](fiddles/compass/fiddle-0003-Mixins)
* Added [fiddles/extjs5/fiddle-20150810-DjiComboChart](fiddles/extjs5/fiddle-20150810-DjiComboChart)
* Added [fiddles/bash/fiddle-0019-GitMergeCommand](fiddles/bash/fiddle-0019-GitMergeCommand)
* Added [fiddles/svg/fiddle-0018-DaileyClock](fiddles/svg/fiddle-0018-DaileyClock)
* Added [fiddles/svg/fiddle-0019-ClockFace](fiddles/svg/fiddle-0019-ClockFace)
* Added [fiddles/bash/fiddle-0020-GitBranchCommand](fiddles/bash/fiddle-0020-GitBranchCommand)
* Added [fiddles/jquery/fiddle-0025-ScrollableDiv](fiddles/jquery/fiddle-0025-ScrollableDiv)
* Started [fiddles/svg/fiddle-0022-Spirograph](fiddles/svg/fiddle-0022-Spirograph)
* Added [fiddles/bash/fiddle-0021-InstallPhantomJs](fiddles/bash/fiddle-0021-InstallPhantomJs)
* Added [fiddles/bash/fiddle-0022-OSVersion](fiddles/bash/fiddle-0022-OSVersion)
* Added [fiddles/jquery/fiddle-0026-ScrollableDatagrid](fiddles/jquery/fiddle-0026-ScrollableDatagrid)
* Added [fiddles/bash/fiddle-0023-GitAmendCommit](fiddles/bash/fiddle-0023-GitAmendCommit)
* Added [fiddles/extjs6/fiddle-0011-PageMapHasRange](fiddles/extjs6/fiddle-0011-PageMapHasRange)
* Added [fiddles/extjs6/fiddle-0012-DefectXXXX](fiddles/extjs6/fiddle-0012-DefectXXXX)
* Added [fiddles/bash/fiddle-0024-InstallBabel](fiddles/bash/fiddle-0024-InstallBabel)
* Added [fiddles/bash/fiddle-0025-InstallYuiCompressor](fiddles/bash/fiddle-0025-InstallYuiCompressor)

### 201508240420

* Added [fiddles/bash/fiddle-0026-BatchYuiCompressor](fiddles/bash/fiddle-0026-BatchYuiCompressor)
* Added [fiddles/bash/fiddle-0027-CombineJs](fiddles/bash/fiddle-0027-CombineJs)
* Added [fiddles/bash/fiddle-0028-CurlAndroidSDK](fiddles/bash/fiddle-0028-CurlAndroidSDK)
* Added [fiddles/bash/fiddle-0029-JarExtraction](fiddles/bash/fiddle-0029-JarExtraction)
* Added [fiddles/bash/fiddle-0030-PhantomJsScreenShot](fiddles/bash/fiddle-0030-PhantomJsScreenShot)
* Added [fiddles/extjs6/fiddle-0013-MiniGauges](fiddles/extjs6/fiddle-0013-MiniGauges)
* Added [fiddles/extjs6/fiddle-0014-WidgetGridKS](fiddles/extjs6/fiddle-0014-WidgetGridKS)
* Added [scripts/fiddle-combine.sh](scripts/fiddle-combine.sh)
  * Reflected changes:
        1. updated [scripts/fiddle.sh](scripts/fiddle.sh)
* Added [fiddles/ant](fiddles/ant)
    * Reflected changes:
        1. updated [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
        2. updated [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
        3. updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        4. updated [scripts/fiddle-list.sh](scripts/fiddle-list.sh)
        5. added [scripts/fiddle-ant.sh](scripts/fiddle-ant.sh)
        6. added [fiddles/ant/README.markdown](fiddles/ant/README.markdown)
        7. added [fiddles/ant/template](fiddles/ant/template)
* Added [fiddles/bash/fiddle-0031-AntInstalled](fiddles/bash/fiddle-0031-AntInstalled)
* Added [fiddles/ant/fiddle-0001-antEcho](fiddles/ant/fiddle-0001-antEcho)
* Added [fiddles/extjs6/template/src](fiddles/extjs6/template/src)
    * Reflected changes:
        1. updated [scripts/fiddle-extjs-6.sh](scripts/fiddle-extjs-6.sh)
        2. updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
* Added [fiddles/extjs6/fiddle-0017-AssociatedModels](fiddles/extjs6/fiddle-0017-AssociatedModels)
* Added [fiddles/bash/fiddle-0032-ListAndCount](fiddles/bash/fiddle-0032-ListAndCount)
    * Reflected changes:
        1. Updated [scripts/fiddle-combine.sh](scripts/fiddle-combine.sh)
        2. updated [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
        3. updated [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
        4. updated [scripts/fiddle-refactor.sh](scripts/fiddle-refactor.sh)
* Added [fiddles/bash/fiddle-0033-RecursiveLineGrep](fiddles/bash/fiddle-0033-RecursiveLineGrep)
* Added [fiddles/bash/fiddle-0034-InstallTree](fiddles/bash/fiddle-0034-InstallTree)
* Added [fiddles/ant/fiddle-0002-Properties](fiddles/ant/fiddle-0002-Properties)
* Added [fiddles/ant/fiddle-0003-FileList](fiddles/ant/fiddle-0003-FileList)
* Added [fiddles/ant/fiddle-0004-SenchaCmdWebStart](fiddles/ant/fiddle-0004-SenchaCmdWebStart)
* Started [fiddles/extjs6/fiddle-0019-ReporterTearDown](fiddles/extjs6/fiddle-0019-ReporterTearDown)
* Added [fiddles/extjs6/fiddle-0020-PivotGrid](fiddles/extjs6/fiddle-0020-PivotGrid)
* Added [fiddles/extjs6/fiddle-0021-GridExcelExport](fiddles/extjs6/fiddle-0021-GridExcelExport)

### 201509220420

* Added [fiddles/extjs6/fiddle-0022-BufferedStoreExcelExport](fiddles/extjs6/fiddle-0022-BufferedStoreExcelExport)
* Added [fiddles/extjs6/fiddle-0023-ReporterSpecRunner](fiddles/extjs6/fiddle-0023-ReporterSpecRunner)
* Refactored [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
    * Based on [fiddles/bash/fiddle-0032-ListAndCount](fiddles/bash/fiddle-0032-ListAndCount)
* Added [fiddles/jquery/fiddle-0028-RecursiveDOMInjection](fiddles/jquery/fiddle-0028-RecursiveDOMInjection)
* Refactored [scripts/fiddle-combine.sh](scripts/fiddle-combine.sh)
    1. Added "preinit.js" file support for non-ext* fiddles
    2. Added "js-beautify" app.js reformatting logic
    3. Added optional 3rd input parameter for overriding the target file
        * Reflected changes:
            1. updated [scripts/fiddle.sh](scripts/fiddle.sh)
    4. Added optional 4th input parameter for disabling main closure in non-extjs fiddles
            1. updated [scripts/fiddle.sh](scripts/fiddle.sh)
    5. Added support for extjs5 fiddles
* Added [fiddles/jquery/fiddle-0029-CustomJasmineReporter](fiddles/jquery/fiddle-0029-CustomJasmineReporter)
* Added [fiddles/bash/fiddle-0035-Kdiff3](fiddles/bash/fiddle-0035-Kdiff3)
* Added [fiddles/extjs5/fiddle-20150926-PivotGrid](fiddles/extjs5/fiddle-20150926-PivotGrid)
* Enhanced [scripts/fiddle.sh](scripts/fiddle.sh)
    1. Added ASCII artwork-- showTitle function
* Added [fiddles/jquery/fiddle-0030-MixinClass](fiddles/jquery/fiddle-0030-MixinClass)
* Added [fiddles/extjs6/fiddle-0024-TreeStoreLifeCycle](fiddles/extjs6/fiddle-0024-TreeStoreLifeCycle)
* Added [fiddles/jquery/fiddle-0031-ReferenceError](fiddles/jquery/fiddle-0031-ReferenceError)
* Added [fiddles/jquery/fiddle-0032-Namespace](fiddles/jquery/fiddle-0032-Namespace)
* Added [fiddles/svg/fiddle-0019-Button](fiddles/svg/fiddle-0019-Button)

### 2015010270420

* Added [fiddles/svg/fiddle-0024-Clock](fiddles/svg/fiddle-0024-Clock)

### 2015011060420

* Added [fiddles/svg/toolkit](fiddles/svg/toolkit)
    * Based on [fiddles/svg/fiddle-0024-Clock/src/toolkit](fiddles/svg/fiddle-0024-Clock/toolkit)
    * Reflected changes:
        1. Updated [fiddles/svg/template](fiddles/svg/template)
        2. Added [fiddles/svg/toolkit/README.markdown](fiddles/svg/toolkit/README.markdown)
* Finished [fiddles/svg/fiddle-0020-ArcPath](fiddles/svg/fiddle-0020-ArcPath)
    * Reflected changes:
        1. [fiddles/svg/toolkit/Util.js](fiddles/svg/toolkit/Util.js)
            * added mapCircularPoint
            * added convertToRadians
        2. [fiddles/svg/toolkit/Util.js](fiddles/svg/toolkit/Text.js)
            * added style attribute support
* Added [scripts/setup/install-browserify.sh](scripts/setup/install-browserify.sh)
    * Reflected changes:
        1. [scripts/setup/README.markdown](scripts/setup/README.markdown)
* Added [scripts/setup/install-npm.sh](scripts/setup/install-npm.sh)
    * Reflected changes:
        1. [scripts/setup/README.markdown](scripts/setup/README.markdown)
* Added [scripts/setup/install-babel.sh](scripts/setup/install-babel.sh)
    * Reflected changes:
        1. [scripts/setup/README.markdown](scripts/setup/README.markdown)
* Added [fiddles/bash/fiddle-0036-Browserify](fiddles/bash/fiddle-0036-Browserify)
* Added [fiddles/bash/fiddle-0037-Babel](fiddles/bash/fiddle-0037-Babel)
* Enhanced [fiddles/svg/toolkit/Util.js](fiddles/svg/toolkit/Util.js)
* Added [fiddles/extjs6/fiddle-0024-SmartTreeFiltering](fiddles/extjs6/fiddle-0024-SmartTreeFiltering)
* Started [fiddles/extjs6/fiddle-0025-CustomToolButton](fiddles/extjs6/fiddle-0025-CustomToolButton)

### 201511100420

* Added [fiddles/bash/fiddle-0039-DateCommand](fiddles/bash/fiddle-0039-DateCommand)
* Finished [fiddles/bash/fiddle-0037-Babel](fiddles/bash/fiddle-0037-Babel)
* Added [fiddles/bash/fiddle-0040-SenchaAppGenerate](fiddles/bash/fiddle-0040-SenchaAppGenerate)
* Added [fiddles/bash/fiddle-0041-findDeleteCommand](fiddles/bash/fiddle-0041-findDeleteCommand)
* Added [fiddles/bash/fiddle-0042-BabelBeautify](fiddles/bash/fiddle-0042-BabelBeautify)
* Added [fiddles/extjs6/fiddle-0027-GlobalErrors](fiddles/extjs6/fiddle-0027-GlobalErrors)
* Added [fiddles/bash/fiddle-0043-InstallCordova](fiddles/bash/fiddle-0043-InstallCordova)
* Added [fiddles/bash/fiddle-0044-CordovaCreate](fiddles/bash/fiddle-0044-CordovaCreate)
* Added [fiddles/extjs6/fiddle-0027-DragAndDropKS](fiddles/extjs6/fiddle-0027-DragAndDropKS)
* Added [fiddles/extjs6/fiddle-0028-GaugeColumnWidget](fiddles/extjs6/fiddle-0028-GaugeColumnWidget)
* Added [fiddles/bash/fiddle-0045-InstallCappuccino](fiddles/bash/fiddle-0045-InstallCappuccino)
* Added [fiddles/bash/fiddle-0046-InstallEmber](fiddles/bash/fiddle-0046-InstallEmber)
* Added [fiddles/extjs6/fiddle-0029-AriaTheme](fiddles/extjs6/fiddle-0029-AriaTheme)
* Added [fiddles/bash/fiddle-0038-CsvToJson](fiddles/bash/fiddle-0038-CsvToJson)
* Enhanced [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
    1. Added logic to remove the deleted fiddle from the CHANGELOG.markdown file
* Added [fiddles/bash/fiddle-0047-InstallNativeScript](fiddles/bash/fiddle-0047-InstallNativeScript)
* Added [fiddles/bash/fiddle-0048-MountSharedDrive](fiddles/bash/fiddle-0048-MountSharedDrive)
* Added [fiddles/jquery/fiddle-0033-15Puzzle](fiddles/jquery/fiddle-0033-15Puzzle)
* Added [fiddles/jquery/fiddle-0034-RandNumSeq](fiddles/jquery/fiddle-0034-RandNumSeq)
* Added [fiddles/extjs6/fiddle-0030-CSVReporter](fiddles/extjs6/fiddle-0030-CSVReporter)
* Added [fiddles/anglular](fiddles/angular)
    * Reflected changes:
        1. Added [scripts/fiddle-angular.sh](scripts/fiddle-angular.sh)
        2. Updated [fiddles/index.html](fiddles/index.html)
        3. Updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        4. Updated [scripts/fiddle-index.sh](scripts/fiddle-index.sh)
        5. Updated [scripts/fiddle-list.sh](scripts/fiddle-list.sh)
        6. Updated [scripts/fiddle-refactor.sh](scripts/fiddle-refactor.sh)
        7. Updated [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
        8. Updated [scripts/fiddle-combine.sh](scripts/fiddle-combine.sh)
        9. Updated [scripts/fiddle-start.sh](scripts/fiddle-start.sh)
        10. Updated [fiddles/index.html](fiddles/index.html)
* Added [fiddles/nativeScript](fiddles/nativeScript)
* Added [fiddles/jquery/fiddle-0035-JqueryCSV](fiddles/jquery/fiddle-0035-JqueryCSV)
* Added [fiddles/angular/fiddle-0001-SimpleGrid](fiddles/angular/fiddle-0001-SimpleGrid)
* Started [fiddles/svg/fiddle-0025-15Puzzle](fiddles/svg/fiddle-0025-15Puzzle)
* Added [fiddles/three/fiddle-0005-EarthMoon](fiddles/three/fiddle-0005-EarthMoon)
* Added [fiddles/jquery/fiddle-0036-NavBar](fiddles/jquery/fiddle-0036-NavBar)
* Added [fiddles/nativeScript/fiddle-0001-SampleGroceries](fiddles/nativeScript/fiddle-0001-SampleGroceries)
* Started [fiddles/nativeScript/fiddle-0002-Puzz](fiddles/nativeScript/fiddle-0002-Puzz)

### 201512240420

* Added [fiddles/java/fiddle-0001-Lambda](fiddles/java/fiddle-0001-Lambda)
* Added [fiddles/java/fiddle-0002-StrategyPattern](fiddles/java/fiddle-0002-StrategyPattern)
* Added [fiddles/android](fiddles/android)
* Added [fiddles/android/fiddle-0006-OpenGLRenderer](fiddles/android/fiddle-0006-OpenGLRenderer)
* Added [fiddles/android/fiddle-0007-DroidzAttack](fiddles/android/fiddle-0007-DroidzAttack)
* Added [fiddles/android/fiddle-0008-SpriteAnimation](fiddles/android/fiddle-0008-SpriteAnimation)
* Added [fiddles/android/fiddle-0009-ParticleExplosion](fiddles/android/fiddle-0009-ParticleExplosion)
* Added [fiddles/android/fiddle-0010-BitmapFonts](fiddles/android/fiddle-0010-BitmapFonts)
* Refactored / Published [fiddles/three/fiddle-0005-EarthMoon](fiddles/three/fiddle-0005-EarthMoon)
* Added [fiddles/three/fiddle-0006-Saturn](fiddles/three/fiddle-0006-Saturn)
* Added [fiddles/three/fiddle-0007-Stars](fiddles/three/fiddle-0007-Stars)
* Added [fiddles/three/fiddle-0008-Orbit](fiddles/three/fiddle-0008-Orbit)
* Added [fiddles/three/fiddle-0009-Sun](fiddles/three/fiddle-0009-Sun)
* Added [fiddles/three/fiddle-0010-SolarSystem](fiddles/three/fiddle-0010-SolarSystem)

### 201601100420

* Added [fiddles/python](fiddles/python)
    * Reflected changes:
        1. Added [scripts/fiddle-python.sh](scripts/fiddle-python.sh)
        2. Updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
        3. Updated [scripts/fiddle-list.sh](scripts/fiddle-list.sh)
        4. Updated [scripts/fiddle-refactor.sh](scripts/fiddle-refactor.sh)
        5. Updated [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
* Added dependency to [nativescript-marketplace-demo](https://github.com/NativeScript/nativescript-marketplace-demo) ~ [fiddles/nativeScript/demo/nativescript-marketplace-demo](fiddles/nativeScript/demo/nativescript-marketplace-demo)
* Added dependency to [the-art-of-command-line](https://github.com/jlevy/the-art-of-command-line) ~ [fiddles/bash/libs/the-art-of-command-line](fiddles/bash/libs/the-art-of-command-line)
* Added dependency to [angular.js](https://github.com/angular/angular.js) ~ [fiddles/angular/libs/angular.js](fiddles/angular/libs/angular.js)
* Added dependency to [programming_chrome_apps](https://github.com/MarcRochkind/programming_chrome_apps.git) ~ [fiddles/chrome/libs/programming_chrome_apps](fiddles/chrome/libs/programming_chrome_apps)
* Added dependency to [ITM463](https://github.com/bradyhouse/ITM463.git) ~ [fiddles/jquery/libs/ITM463](fiddles/jquery/libs/ITM463)
* Added dependency to [WebGLBook](https://github.com/tparisi/WebGLBook.git) ~ [fiddles/three/libs/WebGLBook](fiddles/three/libs/WebGLBook)
* Added dependency to [three.js/](https://github.com/mrdoob/three.js/) ~ [fiddles/three/libs/three.js](fiddles/three/libs/three.js)
* Added dependency to [ITM413](https://github.com/bradyhouse/ITM413.git) ~ [fiddles/python/libs/ITM413](fiddles/python/libs/ITM413)
* Added dependency to [ITM462](https://github.com/bradyhouse/ITM462.git) ~ [fiddles/php/libs/ITM462](fiddles/php/libs/ITM462)
* Added dependency to [tween.js](https://github.com/tweenjs/tween.js.git) ~ [fiddles/tween/libs/tween.js](fiddles/tween/libs/tween.js)
* Added dependency to [ITM455](https://github.com/bradyhouse/ITM455.git) ~ [fiddles/android/libs/ITM455](fiddles/android/libs/ITM455)
* Added [fiddles/extjs6/fiddle-0031-ArrayStore](fiddles/extjs6/fiddle-0031-ArrayStore)
* Continued [fiddles/nativeScript/fiddle-0002-Puzz](fiddles/nativeScript/fiddle-0002-Puzz)
* Added [fiddles/nativeScript/emulate.sh](fiddles/nativeScript/emulate.sh)
* Added [fiddles/bash/fiddle-0049-InstallTypeScript](fiddles/bash/fiddle-0049-InstallTypeScript)
* Added [fiddles/three/fiddle-0011-PlanetTween](fiddles/three/fiddle-0011-PlanetTween)
* Added [fiddles/three/fiddle-0012-BasicTween](fiddles/three/fiddle-0012-BasicTween)

### 201601190420

* Bug fix [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
    * Note - Previously, the "fiddle.sh fork chrome ..." command threw an error while attempting to update the manifest.json file.  This issue is now resolved.
* Added [fiddles/chrome/fiddle-0003-NoteApp](fiddles/chrome/fiddle-0003-NoteApp)
* Added [fiddles/chrome/fiddle-0004-NoteAppSync](fiddles/chrome/fiddle-0004-NoteAppSync)
* Added [fiddles/chrome/fiddle-0005-TextEditor](fiddles/chrome/fiddle-0005-TextEditor)
* Added [fiddles/extjs6/fiddle-0032-CSVStore](fiddles/extjs6/fiddle-0032-CSVStore)
* Added [fiddles/chrome/fiddle-0006-BookmarkSearch](fiddles/chrome/fiddle-0006-BookmarkSearch)
* Added [fiddles/bash/fiddle-0050-InstallIstanbul](fiddles/bash/fiddle-0050-InstallIstanbul)
* Added [fiddles/bash/fiddle-0051-InstallCucumber](fiddles/bash/fiddle-0051-InstallCucumber)
* Added [fiddles/bash/fiddle-0052-InstallBeautifulSoup](fiddles/bash/fiddle-0052-InstallBeautifulSoup)
* Added [fiddles/bash/fiddle-0053-PythonVirtualEnv](fiddles/bash/fiddle-0053-PythonVirtualEnv)
* Added [fiddles/python/fiddle-0001-BeautifulSoup](fiddles/python/fiddle-0001-BeautifulSoup)
* Added [fiddles/python/fiddle-0002-SoupFindAll](fiddles/python/fiddle-0002-SoupFindAll)
* Added [fiddles/python/fiddle-0003-SoupFindChildren](fiddles/python/fiddle-0003-SoupFindChildren)
* Added [fiddles/python/fiddle-0004-SoupFindRegex](fiddles/python/fiddle-0004-SoupFindRegex)
* Added [fiddles/python/fiddle-0005-HelloCrawler](fiddles/python/fiddle-0005-HelloCrawler)
* Added [fiddles/python/fiddle-0006-OreillyCrawler](fiddles/python/fiddle-0006-OreillyCrawler)

### 201602010420

* **fiddle.sh**
  1. Added [fiddles/angular2](fiddles/angular2)
        * Reflected changes:
            1. Added [scripts/fiddle-angular2.sh](scripts/fiddle-angular2.sh)
            2. Updated [scripts/fiddle-create.sh](scripts/fiddle-create.sh)
            3. Updated [scripts/fiddle-index.sh](scripts/fiddle-index.sh)
            4. Updated [scripts/fiddle-list.sh](scripts/fiddle-list.sh)
            5. Updated [scripts/fiddle-refactor.sh](scripts/fiddle-refactor.sh)
            6. Updated [scripts/fiddle-delete.sh](scripts/fiddle-delete.sh)
            7. Updated [scripts/fiddle-fork.sh](scripts/fiddle-fork.sh)
            8. Updated [scripts/fiddle-start.sh](scripts/fiddle-start.sh)
* **Bash**
    1. Added [fiddles/bash/fiddle-0054-DownloadLibXml2](fiddles/bash/fiddle-0054-DownloadLibXml2)
    2. Added [fiddles/bash/fiddle-0055-InstallScrapy](fiddles/bash/fiddle-0055-InstallScrapy)
    3. Added [fiddles/bash/fiddle-0056-InstallLiveServer](fiddles/bash/fiddle-0056-InstallLiveServer)
* **Angular 2**
    1. Added dependency to [systemjs](https://github.com/systemjs/systemjs)
    2. Added dependency to [traceur-compiler](https://github.com/google/traceur-compiler.git)
    3. Added [fiddles/angular2/fiddle-0001-HelloWorld](fiddles/angular2/fiddle-0001-HelloWorld)
    4. Added [fiddles/angular2/fiddle-0002-PoormanReddit](fiddles/angular2/fiddle-0002-PoormanReddit)
* **ExtJS 6**
    1. Added [fiddles/extjs6/fiddle-0033-CSVExporter](fiddles/extjs6/fiddle-0033-CSVExporter)

### 201602011420

* **fiddle.sh**
    1. Updated [scripts/fiddle-angular-2.sh](scripts/fiddle-angular-2.sh)
        * Added logic to use the fiddle name as the default component selector in the app.ts template file.
* **Angular 2**
    1.  Added [fiddles/angular2/fiddle-0003-InventoryApp](fiddles/angular2/fiddle-0003-InventoryApp)
    2.  Added [fiddles/angular2/fiddle-0004-OutputBinding](fiddles/angular2/fiddle-0004-OutputBinding)
    3.  Added [fiddles/angular2/fiddle-0005-NgIf](fiddles/angular2/fiddle-0005-NgIf)
    4.  Added [fiddles/angular2/fiddle-0006-NgStyle](fiddles/angular2/fiddle-0006-NgStyle)
    5.  Added [fiddles/angular2/fiddle-0007-NgSwitch](fiddles/angular2/fiddle-0007-NgSwitch)
    6.  Added [fiddles/angular2/fiddle-0008-NgClass](fiddles/angular2/fiddle-0008-NgClass)
    7.  Added [fiddles/angular2/fiddle-0009-NgFor](fiddles/angular2/fiddle-0009-NgFor)
    8.  Added [fiddles/angular2/fiddle-0011-NgNonBindable](fiddles/angular2/fiddle-0011-NgNonBindable)
    9.  Added [fiddles/angular2/fiddle-0012-FormBuilder](fiddles/angular2/fiddle-0012-FormBuilder)
    10. Added [fiddles/angular2/fiddle-0013-FormValidator](fiddles/angular2/fiddle-0013-FormValidator)
* **ExtJS 6**
    1. Added [fiddles/extjs6/fiddle-0034-CSVExcelStyleGrid](fiddles/extjs6/fiddle-0034-CSVExcelStyleGrid)
* **Bash**
    1. Added [fiddles/bash/fiddle-0057-PhantomJsRasterize](fiddles/bash/fiddle-0057-PhantomJsRasterize)
