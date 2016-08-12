fiddle-0027-ImageCloud
======


### Title

SVG Image Cloud

### Creation Date

07-17-16


### Location

Chicago, IL


### Issue

[Issue 51](https://github.com/bradyhouse/house/issues/51)


### Description

You have heard of a "tag cloud" (or "word cloud"), what about a "photo album cloud"? Here you go.  This is an SVG element + google photo album rss (xml).  On `DOMContentLoaded`, 202 photos from a google photo album are randomly injected into an SVG element.  Each image then moves in a circular path to create the floating (cloud) effect.  

 To look at a specific image, simply double-click.  To return it to the cloud, click it again.  NOTE -  for simplicity and to avoid `CORS` issues, I converted the album XML to JSON using [xml-to-json](https://www.npmjs.com/package/xml-to-json).


### Published Version Link

[codepen](https://codepen.io/bradyhouse/details/LkJqQO/)
[bradyhouse.github.io > svg > #27](http://bradyhouse.github.io/svg/fiddle-0027-ImageCloud/index.html)

### Tags

svg, image, animate, google photo
