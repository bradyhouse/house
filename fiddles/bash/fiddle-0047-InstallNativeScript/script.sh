#!/usr/bin/env bash
clear;
echo $(pwd;)
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isNpmInstalled() {
    if [[ $(which npm;) ]]
    then
        echo 0
    else
        echo -1
    fi
}

function isNativeScriptInstalled() {
    if [[ $(which tns;) ]]
    then
        echo 0;
    else
        echo -1;
    fi
}

function isAndroidInstalled() {
    if [[ $(which android;) ]]
    then
        echo 0;
    else
        echo -1;
    fi
}

function installNativeScript() {
	sudo npm i -g nativescript || exit 86;
}

function getNativeScriptVersion() {
    echo $(tns --version | tail -1)
}

function try() {
    if [[ ! $(isNativeScriptInstalled;) ]]
    then
        if [[ ! $(isAndroidInstalled) ]]; then exit 88; fi
        if [[ ! $(isNpmInstalled) ]]; then exit 89; fi
        installNativeScript || exit $?;
    fi
}

function catch() {
    case $? in
        0)  echo "NativeScript version $(getNativeScriptVersion;) installed."
            ;;
        86) echo "fubar! installation failed."
            ;;
        87) echo "fubar! get nativeScript version failed."
            ;;
        88) echo "fubar! android is required to install nativeScript."
            ;;
        89) echo "fubar! npm is required to install nativeScript."
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
try | catch;

