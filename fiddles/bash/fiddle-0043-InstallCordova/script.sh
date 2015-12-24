#!/usr/bin/env bash
clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."
function isCordovaInstalled() {
    if [[ $(which cordova;) ]]
    then
        echo 0
    else
        echo -1
    fi
}
function installCordova() {
	sudo npm install -g cordova || exit 86;
}
function getCordovaVersion() {
    return $(cordova -v) || exit 87;
}
function try() {
    if [[ ! $(isCordovaInstalled;) ]]
    then
        installCordova || exit #?;
    fi
}
function catch() {
    case $1 in
        0)  echo "Cordova version $(getCordovaVersion;) installed.";
            ;;
        86) echo "fubar! install cordova failed."
            ;;
        87) echo "fubar! get cordova version failed."
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
try;
catch;
