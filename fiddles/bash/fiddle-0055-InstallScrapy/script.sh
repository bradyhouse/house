#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isPip3Installed() {
    if [[ $(which pip3;) ]]
    then
        echo 0
    else
        echo -1
    fi
}

function installpip3() {
    if [[ ! $(isPip3Installed) ]]
    then
        sudo easy_install pip3;
    fi
}


function install-pip3-scrapy() {
    sudo pip3 install scrapy;
}

function install() {
    if [[ ! $(isPip3Installed) ]]
    then
        installpip3;
    fi
    install-pip3-scrapy;
}

