#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function downloadAtom() {
    curl https://atom-installer.github.com/v1.5.4/atom-mac.zip?s=1456950936 -o atom.zip
}

function installAtom() {
    ./atom
}
