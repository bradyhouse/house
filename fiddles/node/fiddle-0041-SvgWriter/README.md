fiddle-0040-DropBoxSdk
======

### Title <a name="title"></a>

DropBoxSdk


### Author <a name="author"></a>

bradyhouse@gmail.com


### Creation Date <a name="creation-date"></a>

11-27-19


### Location <a name="location"></a>

Chicago, IL


### Issue <a name="issue"></a>

[Issue 331](https://github.com/bradyhouse/house/issues/331)


### Description <a name="description"></a>

I love vacation-- finally, time to code what I feel like coding.  Per [Issue 328](https://github.com/bradyhouse/house/issues/328), [brady.house](https://brady.house) is pathetic.  In [angular-cli fiddle 32](https://github.com/bradyhouse/house/tree/master/fiddles/angular2-cli/fiddle-0032-ImageLazyLoad), I addressed the image loading issue.  Now, I need a way to pull the displayed image from a specific folder on dropbox.  In other words, time (to finally) learn with the [dropbox sdk](https://github.com/dropbox/dropbox-sdk-js). 


### Use Case<a name="use-case"></a>

1.  Open a console and navigate to the fiddle's root directory
2.  Update the config.json file with --
    * Your dropBox Access Token
    * The name of the directory on DropBox containing the images
    * The name of the resulting json file
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

5.  Web Browser should open to localhost:5555 displaying the contents of the data.json file.


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

          File Builder
            static config property
              ✓ should return default options
            static init method
              ✓ should return a valid class instance
            verifyConfig method
              ✓ should return true

          File Parser
            static config property
              ✓ should return default options
            static init method
              ✓ should return a valid class instance

          8 passing (18ms)


### Tags <a name="tags"></a>

node.js, hamony, dropbox, isomorphic-fetch, rimraf, mkdirp, mocha, chai, live-server


### Forked From

[fiddle-0040-DropBoxSdk](../fiddle-0040-DropBoxSdk)
