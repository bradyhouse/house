#!/usr/bin/env bash
clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."
function isEmberInstalled() {
    if [[ $(which ember;) ]]
    then
        echo 0
    else
        echo -1
    fi
}
function installEmber() {
	sudo npm install -g ember-cli || exit 86;
}
function getEmberVersion() {
    return $(ember -v) || exit 87;
}
function try() {
    if [[ ! $(isEmberInstalled;) ]]
    then
        installEmber || exit #?;
    fi
}
function catch() {
    case $1 in
        0)  echo "Ember version $(getEmberVersion;) installed.";
            ;;
        86) echo "fubar! installation failed."
            ;;
        87) echo "fubar! get ember version failed."
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
try;
catch;

