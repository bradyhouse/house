#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

curl https://extjs.cachefly.net/ext/gpl/5.1.0/build/ext-all-debug.js -o ext-all-debug.js
curl http://www.houseknecht.com/2011/Labs/JavaScript/GoogleMapApiV3/RecursiveTree.htm -o recursivetree.htm
curl http://www.houseknecht.com/2015/images/avatar.jpg -o avatar.jpg
