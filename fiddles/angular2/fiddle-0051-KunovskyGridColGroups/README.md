fiddle-0051-SlickGrid
======

### Title

fiddle-0051-SlickGrid


### Creation Date

06-26-17


### Location

Chicago, IL


### Issue

[Issue 176](https://github.com/bradyhouse/house/issues/176)


### Description

Okay so you have an app that relies on [slickgrid-kunovsky](https://www.npmjs.com/package/slickgrid-kunovsky) and 
now you have a requirement for column groups (or sub-headings) combined with frozen columns. You search NPM and 
find [slickgrid-colgroup-plugin](https://www.npmjs.com/package/slickgrid-colgroup-plugin). 
Question is, are they compatible? This fiddle attempts to answer that question.  In truth these two libraries
do not play well together.  Ultimately, I had to create a modified version of col-group the plugin.  But even
then I could not resolve the column resizing issues. As a sidebar, this angular2 fiddle also relies on (or incorporates)
the following libraries:

*   [css-element-queries](https://www.npmjs.com/package/css-element-queries)
*   [lodash](https://www.npmjs.com/package/lodash)


### Published Version Link

[bradyhouse.github.io > Angular2 > KunovskyGridColGroups](http://bradyhouse.github.io/angular2/fiddle-0051-fiddle-0051-KunovskyGridColGroups)


### Tags

angular2, slickgrid-kunovsky, slickgrid-colgroup-plugin, css-element-queries, lodash
