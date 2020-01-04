fiddle-0041-SvgWriter
======

### Title <a name="title"></a>

Svg Writer


### Author <a name="author"></a>

bradyhouse@gmail.com


### Creation Date <a name="creation-date"></a>

12-27-19


### Location <a name="location"></a>

Chicago, IL


### Issue <a name="issue"></a>

[Issue 333](https://github.com/bradyhouse/house/issues/333)


### Description <a name="description"></a>

Okay, so I need something that will bridge the gap between DropBox (#331) and SVG.  Specifically, I want something that will embed images downloaded from drop box into an SVG file that can be rendered in a browser.  Something like the [SVG Fiddle 27](http://bradyhouse.github.io/svg/fiddle-0027-ImageCloud/index.html).  [Node Fiddle 40](https://github.com/bradyhouse/house/tree/master/fiddles/node/fiddle-0040-DropBoxSdk) can be used as the starting point-- aka fork it.


### Use Case<a name="use-case"></a>

1.  Open a console and navigate to the fiddle's root directory
2.  Update the config.json file with --
    * Your dropBox Access Token
    * The name of the directory on DropBox containing the images
    * The name of the resulting json file
    * Tne name of the resulting svg file
3.  Enter the command `npm install`
4.  Enter the command `npm start`

        > node --harmony ./main.js

        cleanup		 deleting ./images directory
        setup		 creating empty ./images directory
        download	 connecting to dropbox
        explode		 writing individual json files
        cleanup		 deleting ./data.json
        build		 initializing ./data.json
        cleanup		 deleting ./images directory
        Serving "./" at http://localhost:5555 (http://127.0.0.1:5555)
        Ready for changes

5.  Web Browser should open to localhost:5555 displaying the contents of the resulting svg file.


### Running Unit Tests<a name="running-unit-tests"></a>

1.  Open a console and navigate to the fiddle's root directory
2.  Enter the command `npm install`
3.  Enter the command `npm test`

        > mocha --reporter spec

          DropBox Client
            static config property
              ✓ should return default options
            static init method
              ✓ should return a valid class instance
            verifyConfig method
              ✓ should return true

          Jpeg Parser
            static config property
              ✓ should return default options
            static init method
              ✓ should return a valid class instance

          Json Factory
            static config property
              ✓ should return default options
            static init method
              ✓ should return a valid class instance
            verifyConfig method
              ✓ should return true

          Svg Factory
            static config property
              ✓ should return default options
            static factory method
              ✓ should return a valid class instance

          tags
            surface default
              ✓ should return <svg id="surface1" xmlns="http://www.w3.org/2000/s...
            rectangle default
              ✓ should return <rect id="rect1" title="rectangle"></rect>
            image default
              ✓ should return <image id="img1" xlink:href="undefined" width="100...
            animate default
              ✓ should return <animate attributeName="cy" dur="10s" values="0%;1...
            pattern default
              ✓ should return <pattern id="pattern1" ></pattern>
            path default
        <path id="path1"></path>
              ✓ should return <path id="path1"></path>


          16 passing (20ms)

4.  Enter the command `npm start`

        > node --harmony ./main.js

        cleanup		 deleting images directory
        setup		 creating empty images directory
        download	 connecting to dropbox
        explode		 writing individual json files
        cleanup		 deleting ./paintings.json
        build		 initializing ./paintings.json
        cleanup		 deleting images directory
        cleanup		 deleting ./paintings.svg
        build		 initializing ./paintings.svg
        Serving "./" at http://127.0.0.1:5555
        Ready for changes

    ![Imgur](https://i.imgur.com/hHdP7Qh.png)


### Tags <a name="tags"></a>

node.js, hamony, dropbox, isomorphic-fetch, rimraf, mkdirp, mocha, chai, live-server, svg


### Forked From

[fiddle-0040-DropBoxSdk](../fiddle-0040-DropBoxSdk)
