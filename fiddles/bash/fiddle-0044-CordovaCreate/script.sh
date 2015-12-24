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
function createCordova() {
    if [[ -d "helloCordova" ]]
    then
        rm -fr helloCordova || exit 86
    fi
    cordova create "helloCordova"
}
function getCordovaVersion() {
    return $(cordova -v) || exit 87;
}
function try() {
    if [[ $(isCordovaInstalled;) ]]
    then
        createCordova || exit #?;
    fi
    exit 0
}
function catch() {
    case $1 in
        0)  echo "\"helloCordova\" project created.";
            ;;
        86) echo "fubar! cordova create failed."
            ;;
        87) echo "fubar! Cordova is not installed."
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
try;
catch;
