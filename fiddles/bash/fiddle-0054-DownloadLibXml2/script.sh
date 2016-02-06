#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function downloadLibXml2() {

    if [[ -e "libxml2-2.7.2.tar.gz" ]]
    then
        rm -rf "libxml2-2.7.2.tar.gz";
    fi
    curl "http://xmlsoft.org/sources/libxml2-2.7.2.tar.gz" -o "libxml2-2.7.2.tar.gz";

}

function unzipLibXml2() {

    if [[ -d "libxml2-2.7.2" ]]
    then
        rm -rf "libxml2-2.7.2"
    fi

    tar xvzf "libxml2-2.7.2.tar.gz"
}



function configureLibXml2() {
    cd "libxml2-2.7.2"

}


function isPipInstalled() {
    if [[ $(which pip;) ]]
    then
        echo 0
    else
        echo -1
    fi
}

function installpip() {
    if [[ ! $(isPipInstalled) ]]
    then
        sudo easy_install pip;
    fi
}


function install-pip-scrapy() {
    sudo pip install scrapy;
}



