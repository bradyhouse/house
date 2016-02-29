fiddle-0025-TreeComponent
======

![Screenshot](screenshot.png)

### Title

Tree Component


### Creation Date

02-24-16


### Location

Chicago, IL


### Description

An Angular2 Fiddle exploring how to--

 1. "Subscribe" to a get request in order to download some JSON
 2. Populate a __homemade__ tree view grid, with the following constraints:

    * Checkboxes are visible on each node
    * Parent nodes have expand/collapse state icon
    * All parent nodes are collapsed initially
    * Checked and expanded state are synchronized based on the state of the checkbox
        * checking | unchecking => expand | collapse
        * nodes can be expanded without being checked
    * The Root node should not be visible
    * Includes a "Search" text field
        * On change, it filters the tree for any matching nodes
    * Includes a "Filter Selected" button
        * On first click, it hides all unchecked nodes
        * Clicking a second time, unhides anything hidden
    * Includes a "Reset" button
        * Clicking returns the tree to it's initial state

Note - Data for this fiddle was generated using [http://www.json-generator.com/](http://www.json-generator.com/). The
recipe:

    {
      "title": "root",
        "leaf": "false",
      "children": [
      '{{repeat(100)}}',
      {
         title: '{{firstName()}} {{surname()}}',
         leaf: 'false',
         children: [
    	   '{{repeat(1,10)}}',
               {
           	     title: '{{company().toUpperCase()}}',
                 leaf: 'true'
          	   }
    	]
       }
    ]
    }


### Published Version Link

[plnkr.co](http://embed.plnkr.co/HiXzqu/)


### Tags

angular2, typescript, component, pipes, http, headers, http_providers

### Forked From

[fiddle-0022-MicroApp](../fiddle-0022-MicroApp)
