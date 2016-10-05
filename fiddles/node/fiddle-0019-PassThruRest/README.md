fiddle-0019-PassThruRest
======

### Title

Pass Thru Rest Service


### Creation Date

08-31-16


### Location

Chicago, IL


### Issue

[Issue 58](https://github.com/bradyhouse/house/issues/58)


### Description

_Got open shift?_ If you are not familiar, check it out: [open shift](https://www.openshift.com/).  Okay, so open shift offers a `Custom Node.js` cartridge.  The question of this fiddle:  _Can this cartridge be customized (aka refactored) to initiate a secondary request to a given URL and return the results with CORS Headers thereby providing a mechanism for getting around CORS violation errors?_ For simplicity, I call this a `pass thru` end point.  For more information on the origin of this question, see [Issue 52](https://waffle.io/bradyhouse/house/cards/578f69e2a22bde1300466b42).

The `Custom Node.js` cartridge out of the box includes 3 endpoints:

  * `health`
  * `info/gen`
  * `info/poll`

The health endpoint is consumed by the open shift service.  The other 2 are referenced by the sample app (index.html) packaged with the cartridge.  The goal of this fiddle is to refactor the [source code for this cartridge](https://github.com/icflorescu/openshift-cartridge-nodejs).  Specifically, this means modifying the [usr/template](https://github.com/icflorescu/openshift-cartridge-nodejs/tree/master/usr/template) directory, which contains the actual guts of the sample node app hosted by the cartridge. The modified template, needs to expose a fourth endpoint --

  * `passthru`

This end point should accept a POST request with the following parameters:

  1. url
  2. allowOrigin (optional)
  3. allowCredentials (optional)
  4. allowMethods (optional)
  5. allowHeaders (optional)
  6. convertToJson (optional)

The `url` parameters is used to initiate a secondary HTTP request using the npm [request](https://www.npmjs.com/package/request) lib.  Its required.  If this parameter is not included, then a forbidden response,  [HTTP 403](https://en.wikipedia.org/wiki/HTTP_403) error, should be generated.  The other 4 parameters are optional.  When present they are used to add the associated CORS header to the response.


### Procedure

1.  Install all dependencies `npm install`
2.  Startup the service `npm start`
3.  Test the pass thru service using curl

        curl --data "url=https://itunes.apple.com/us/rss/topsongs/limit=100/explicit=true/xml&convertToJson=true" 'http://localhost:3000/passthru'

    Note - this should return the [itunes rss feed](https://itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/featuredalbums/sf=143441/limit=100/genre=20/explicit=true/rss.xml).


### Published Version (aka realized solution) Link

[github > bradyhouse > openshift-cartridge-nodejs fork](https://github.com/bradyhouse/openshift-cartridge-nodejs)


### Tags

node.js, hamony, process, argv, fs, request
