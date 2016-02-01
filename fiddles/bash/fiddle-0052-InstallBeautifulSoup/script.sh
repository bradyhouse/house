#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function installpip() {
    sudo easy_install pip;
}

function install-pip-beautifulSoup4() {
    sudo pip install beautifulsoup4;
}
function install-pip3-beautifulSoup4() {
    sudo pip3 install beautifulsoup4;
}
function install-pip-virtualenv() {
    sudo pip install virtualenv;
}
function install-pip3-virtualenv() {
    sudo pip3 install virtualenv;
}

installpip;
install-pip-beautifulSoup4;
install-pip3-beautifulSoup4;
install-pip-virtualenv;
install-pip3-virtualenv;

