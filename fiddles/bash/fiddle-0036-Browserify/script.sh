#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isBrowserifyInstalled() {
    which browserify || exit -1
    return 0
}

function main() {

    if [[ -e "app.js" ]]
    then
        sudo rm -rf app.js
    fi
    browserify tmp.js -o app.js
}

if [[ $(isBrowserifyInstalled;) ]]
then
    main;
else
    echo "browserify is not installed!"
fi
