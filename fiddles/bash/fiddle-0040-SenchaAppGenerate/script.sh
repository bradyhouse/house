#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

_appName="Magpie";
_appPath="magpie";
_sdkPath="~/ext61";

case "$#" in
    1)
        _sdkPath=$1;
        ;;
    2)
        _sdkPath=$1;
        _appName=$2;
        ;;
    3)
        _sdkPath=$1;
        _appName=$2;
        _appPath=$3;
esac


function isSenchaInstalled() {
    which sencha || exit -1
    return 0
}

function initPath() {
    if [[ -d $1 ]]
    then
        rm -rf $1 || exit -1;
    fi
    return 0;
}

function generateApp() {
    sencha -sdk $1 generate app $2 $3 || exit -1;
    return 0;
}

function generateViewport() {
    sencha generate view -b "Ext.container.Viewport" -n "Viewport" || exit -1;
    return 0;
}

function main() {
    initPath "${_appPath}" || exit 86;
    generateApp "${_sdkPath}" "${_appName}" "${_appPath}" || exit 87;
}

if [[ $(isSenchaInstalled;) ]]
then
    main;
else
    echo "sencha is not installed!"
fi
