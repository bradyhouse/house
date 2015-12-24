#!/usr/bin/env bash
clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."
function isCappuccinoInstalled() {
    if [[ $(which cappuccino;) ]]
    then
        echo 0
    else
        echo -1
    fi
}
function installCappuccino() {
	curl https://raw.githubusercontent.com/cappuccino/cappuccino/v0.9.8/bootstrap.sh >/tmp/cb.sh && bash /tmp/cb.sh || exit 86;
}
function getCappuccinoVersion() {
    return $(cordova -v) || exit 87;
}
function try() {
    if [[ ! $(isCappuccinoInstalled;) ]]
    then
        installCappuccino || exit #?;
    fi
}
function catch() {
    case $1 in
        0)  echo "Cappuccino version $(getCappuccinoVersion;) installed.";
            ;;
        86) echo "fubar! install cappuccino failed."
            ;;
        87) echo "fubar! get cappuccino version failed."
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
try;
catch;

