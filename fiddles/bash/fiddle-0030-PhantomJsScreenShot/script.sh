#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function phantomJs() {
   phantomjs rasterize.js http://localhost:5555/svg/fiddle-0022-Spirograph/index.html screenshot.png
}

phantomJs;
