#!/usr/bin/env bash

_srcFile="app.js";
_compiledFile="app.min.js";

if [[ "$#" -gt 1 ]]
then
    _srcFile=$1
    _compiledFile=$2
fi

function isBabelInstalled() {

    if [[ $(which babel;) ]]
    then
        echo 0
    else
        echo -1
    fi

}

function transpile() {
    babel $1 --compact=true --no-comments > $2
}

if [[ $(isBabelInstalled) ]]
then
    transpile ${_srcFile} ${_compiledFile};
fi
