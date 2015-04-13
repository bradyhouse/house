fiddle-20150412-GridFieldFilterContext
======

![Screenshot](screenshot.png)


### Title

Dynamic Field filtering


### Creation Date

04-08-15


### Description

Fiddle exploring (or exploiting) the logic exposed in the Ext.grid.header.Container > getColumnMenu method. Specifically, this logic has been adapted (hacked) to create an external, column (or field) selection menu. Based on the user's selection in the field drop-down, a secondary filtering (or search) combo is dynamically reconfigured to point to the alternate field.  Note - This fiddle also illustratesthe use of chained stores. The search combo is attached to a standard data store while the grid is bounded to a chained store copy. When the search criteria changes, a filtered is applied to the chained store leaving the original data store unaffected. This means that the search drop-down list remains unaffected by the filter applied to the grid.


### Published Version Link

[https://fiddle.sencha.com/#fiddle/l0v](https://fiddle.sencha.com/#fiddle/l0v)


### Tags

ExtJS-5-1, data, store, combo, picker, chainedstore, grid, filter, MVVM 
 


### Forked From

[fiddle-20150407-ChainedStoreFiltering](../fiddle-20150407-ChainedStoreFiltering/README.markdown)



### Forked From

[fiddle-20150408-GridDynamicFieldFilter](../fiddle-20150408-GridDynamicFieldFilter/README.markdown)

