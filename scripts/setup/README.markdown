setup
=====

Collection of shell scripts created to insure my machine's environment.  In the event of catastrophe (my current
machine blows-up or stops working), these scripts can be used to restore my environment from a different (or new)
machine.  In particular --

* [curl-codekit.sh](download-codekit.sh) - [CodeKit](http://incident57.com/codekit/) is web development tool intended for mac users.
If your mac is of the enterprise variety, this script can be used to download the zipped executable using Curl.  After unzipping,
you can then launch the app without getting the annoying "downloaded from the internet" warning.

* [install-babel.sh](install-babel.sh) - [Babel](https://babeljs.io/) is a "Javascript Compiler". It helpful for minification and transpiling
javascript as a background process.

* [install-npm.sh](install-npm.sh) - [NPM](https://www.npmjs.com/) Package manager for javascript. 

* [install-browserify.sh](install-browserify.sh) - [browersify](http://browserify.org/) utility that allows you to "require" modules
in the browser by bundling up all of your dependencies.





