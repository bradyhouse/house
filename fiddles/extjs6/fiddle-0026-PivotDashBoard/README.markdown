fiddle-0026-PivotDashBoard
======

![Screenshot](screenshot.png)

### Title

Extreme Fiddle ~ The "Premium" Pivot Grid


### Creation Date

09-17-15


### Description

Fiddle exploring the new ExtJS 6 pivot grid configured with an exporter and configurator.  NOTE - This fiddle
is unique in that, to get it to work I had to re-construct the missing "pivot" grid from the sencha ExtJS 6
API doc pages.  Specifically, I reconstructed all of the missing class files including:

        pivot/Aggregators.js
        pivot/MixedCollection.js
        pivot/filter/Base.js
        pivot/filter/Label.js
        pivot/filter/Value.js
        pivot/dimension/Item.js
        pivot/axis/Item.js
        pivot/axis/Base.js
        pivot/result/Base.js
        pivot/result/Collection.js
        pivot/matrix/Base.js
        pivot/axis/Local.js
        pivot/result/Local.js
        pivot/matrix/Local.js
        pivot/matrix/Remote.js
        pivot/feature/PivotStore.js
        pivot/feature/PivotEvents.js
        pivot/feature/PivotView.js
        pivot/Grid.js
        pivot/plugin/configurator/FilterLabelWindow.js
        pivot/plugin/configurator/FilterValueWindow.js
        pivot/plugin/configurator/FilterTopWindow.js
        pivot/plugin/configurator/Column.js
        pivot/plugin/configurator/DragZone.js
        pivot/plugin/configurator/DropZone.js
        pivot/plugin/configurator/Container.js
        pivot/plugin/configurator/Panel.js
        pivot/plugin/Configurator.js
        pivot/plugin/DrillDown.js
        pivot/plugin/Exporter.js
        pivot/plugin/RangeEditor.js

After creating the necessary classes, I then ran each file through
yuicompressor to create a minified version.  The minified versions were then combined into
the final app.js using the "fiddle.sh" combine command.  Of course, there was then the question
of the build sequence. The files (or classes) must be declared in the correct order.  This
required studying the bootstrap.js file packaged with the kitchensink example source code.
In short, one fiddle -- 3+ days :(.


### Published Version Link

[sencha fiddle](https://fiddle.sencha.com/#fiddle/u7o)


### Tags

ExtJS-6, pivot, grid, exporter, configurator


### Forked From

[fiddle-0020-PivotGrid](../fiddle-0020-PivotGrid)
