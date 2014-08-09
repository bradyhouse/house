#!/bin/bash

sudo ./substr.sh '+new Date()' '1' ../web/house/bootstrap.js > bootstrap.js
cp -rf bootstrap.js ../web/house/bootstrap.js
chmod u-w ../web/house/bootstrap.js
rm -R bootstrap.js

