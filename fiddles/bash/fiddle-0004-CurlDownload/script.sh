#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

#curl https://extjs.cachefly.net/ext/gpl/5.1.0/build/ext-all-debug.js -o ext-all-debug.js

#curl "https://download-installer.cdn.mozilla.net/pub/firefox/releases/41.0/mac/en-US/Firefox%2041.0.dmg" -o firefox.dmg

curl "http://downloadcenter.samsung.com/content/SW/201510/20151001160045583/KiesMacSetup.dmg" -o KiesMacSetup.dmg
