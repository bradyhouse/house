D3
======

In _Ext JS_ land, there is a component for data visualization (or charts). In the _non-platform_, _npm-smorga_ world,
good luck.  Actually, there is Data-Driven Documents -- aka [D3.js](https://d3js.org/). This collection is dedicated to
pen involving my exploration of this framework. 


### Book

As a starting point, I will work through the examples outlined by Nick Qi Zhu in the book **Data Visualization with D3.js Cookbook**. 
The [source code](https://github.com/NickQiZhu/d3-cookbook) from this book is sub-moduled in the [libs/d3-cookbook](libs/d3-cookbook) 
directory. To pull-down this secondary code base, simply run `git submodule update` command. Finally, the links listed 
below are taken from the aforementioned text.

### Using fiddle.sh ...

#### To Create

[D3](../angular) fiddles are created to simply run in the browser.  This means, the resulting sandbox can
be hosted using [live-server](https://www.npmjs.com/package/live-server) or any type of vanilla web server
package. The contents of the sandbox is based entirely on the contents of the [template](template) directory.
To create a new D3 fiddle, run the following command from the [scripts](../../scripts) directory like so:

    ./fiddle.sh "create" "d3" "fiddle-####-<Name>"

where:

    <Name> is the name of the new fiddle.

If everything is working correctly, you should see a stream of output that looks like this [sample create output](create.markdown).

#### To Remove

_TBW_

#### To Refactor

_TBW_

#### To Fork

_TBW_

#### To Index

_TBW_

#### To Start

_TBW_


### Online Resources

#### Galleries
* [D3 Gallery](https://github.com/mbostock/d3/wiki/Gallery)
* [Bio Visualize Gallery](http://christopheviau.com/d3list/gallery.html)

#### Reference
* [D3 API](https://github.com/mbostock/d3/wiki/API-Reference)
* [D3 Tutorials Page](https://github.com/mbostock/d3/wiki/Tutorials)
* [D3 Cookbook](https://github.com/NickQiZhu/d3-cookbook)
* [DOM Element API](https://developer.mozilla.org/en-US/docs/Web/API/element)
* [W3C Level-3 Event Spec](https://www.w3.org/TR/DOM-Level-3-Events/)
* [W3C Level-3 Selector Spec](http://www.w3.org/TR/css3-selectors/#sibling-combinators)
* [W3C Level-4 Selector Spec](http://www.w3.org/csswg/selectors4/#combinator)
* [Domain-Specific Languages (excerpt)](http://www.informit.com/article.aspx?p=1592379)
* [D3 Mouse API Document](https://github.com/mbostock/d3/wiki/Selections#wiki-d3_mouse)

#### Plugins
* [D3 Plugins](https://github.com/d3/d3-plugins)

#### Other
* [Mike Bostok's Blocks](bl.ocks.org/mbostock)
* [Forkable Fiddle](jsfiddle.net/qAHC2)
* [NPM Package](https://www.npmjs.com/package/d3)
* [D3 Origin Story](http://vis.stanford.edu/papers/d3)
* [sizzlejs](http://sizzlejs.com/)




