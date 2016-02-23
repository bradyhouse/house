#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function installNpmCheckUpdates() {
    sudo npm install -g npm-check-updates;
}

function checkForBowerUpdates() {
    cd ../../angular/fiddle-0007-PhoneCatStep3/angular-phonecat
    npm-check-updates --packageManager bower;
}

