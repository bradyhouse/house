fiddle-0017-XmlToJson
======

### Title

xml-to-json


### Creation Date

07-16-16


### Location

Chicago, IL


### Issue

[Issue 48](https://github.com/bradyhouse/house/issues/48)


### Description

Simple POC exploring how to use [xml-to-json](https://www.npmjs.com/package/xml-to-json) to convert
an xml file to json.

### Procedure

  1.  Save an xml file to the root directory called `input.xml`
  2.  Install all dependencies `npm install`

        018-XmlToJson
        └─┬ xml-to-json@0.1.1
          └─┬ xml2js@0.4.17
            ├── sax@1.2.1
            └─┬ xmlbuilder@4.2.1
              └── lodash@4.15.0

  3.  Run the app `npm start`

        > fiddle-0018-XmlToJson@0.0.0 start /Users/bradyhouse/github/house/fiddles/node/fiddle-0018-XmlToJson
        > node --harmony app.js

        output.json generated.

### Tags

node.js, xml-to-json
