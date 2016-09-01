fiddle-0038-CorsRequest
======

### Title

CORS Request

### Creation Date

07-20-16


### Location

Chicago, IL


### Issue

[Issue 52](https://github.com/bradyhouse/house/issues/52)


### Description

_CORS! CORS! CORS!_ Is there no way to perform a _cross domain_ AJAX request without getting CORS error?  And I am not talking JSONP.
I simply want a AJAX Call that will return the [Apple Itunes RSS feed](https://itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/featuredalbums/sf=143441/limit=100/genre=20/explicit=true/rss.xml).  _Is that so wrong??_

I am not sure if it is wrong or right, but there is a way:  Its called a secondary server.  You can short circuit CORS Requests
errors using a secondary server to wrap the response with the required allow-* headers.  And this can
be accomplished (for free) using [open shift](https://www.openshift.com/).  The subsequent section details how to
configure a node.js based REST Service that will wrap any URL with the necessary headers.


#### Procedure

1.  Using the open shift web console, create an app using the `Node.js (Latest)` Cartridge
2.  Clone the app's repo
3.  Delete the contents of the repo
4.  Copy the contents [Node Fiddle #19 ~ PassThru Rest](../../node/fiddle-0019-PassThruRest) to the repo root directory
5.  Commit the changes
6.  Update the url parameter of the [app.js](app.js) to point to your app's url + `/passthru`


### Published Version Link

[js fiddle](https://jsfiddle.net/bradyhouse/Lqemmdyv/)
[bradyhouse.github.io > ES2015 > Fiddle #38](http://bradyhouse.github.io/jquery/fiddle-0038-CorsRequest/index.html)

### Tags

jquery, CORS
