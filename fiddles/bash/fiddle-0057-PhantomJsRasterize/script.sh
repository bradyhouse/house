#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function screenshot() {
   phantomjs screenshot.js "http://localhost:5555/angular2/fiddle-0001-HelloWorld/index.html" screenshot.png
}

screenshot;
