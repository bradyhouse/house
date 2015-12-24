#!/usr/bin/env bash

_srcDir="src";
_srcDirTmp=$(echo "${_srcDir}1";);

if [[ "$#" -eq 1 ]]
then
    _srcDir=$1;
    _srcDirTmp=$(echo "${_srcDir}1";);
fi
function isBabelInstalled() {
    if [[ $(which babel;) ]]
    then
        echo 0
    else
        echo -1
    fi
}
function isJsBeautifyInstalled() {
    if [[ $(which js-beautify;) ]]
    then
        echo 0
    else
        echo -1
    fi
}
function parseFile() {
    if [[ -e $1 ]]
    then
        cat $1 | sed -e 's/^[[:space:]]*//'
    fi
}
function initPath() {
    if [[ -d "$2" ]]
    then
        rm -rf "$2" || exit 87;
    fi
    cp -rf "$1" "$2" || exit 87;

    cp -rf "${_srcDir}/sequence.conf" "${_srcDirTmp}/sequence.conf"

}
function transpile() {
    babel $1 --compact=false --no-comments > $2
}
function beautify() {
    js-beautify -d $1 > $2
}

function main() {
    if [[ $(isBabelInstalled) && $(isJsBeautifyInstalled) ]]
    then
        initPath "${_srcDir}" "${_srcDirTmp}" || exit 87
        for file in $(parseFile "${_srcDir}/sequence.conf")
        do
            echo "${file}";
            transpile "${_srcDir}/${file}" "${_srcDir}/${file}.tmp" || exit 88
            beautify "${_srcDir}/${file}.tmp" "${_srcDirTmp}/${file}" || exit 88
        done
        rm -rf "${_srcDir}" || exit 89
        mv "${_srcDirTmp}" "${_srcDir}" || exit 90
    fi
}
main;
