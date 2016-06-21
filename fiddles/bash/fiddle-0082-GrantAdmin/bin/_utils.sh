#!/usr/bin/env bash

function log() {
    script=$(echo $1 | sed 's/\.\///g' | awk '{print toupper($0)}');
    message=$(echo $2 | sed 's/\.\///g' | awk '{print toupper($0)}');
    tput bold; tput rev;
    echo -e "├──${message}";
    tput sgr0;
}

function groupLog() {
    message=$(echo $1 | sed 's/\.\///g' | awk '{print toupper($0)}');
    tput bold; tput rev;
    echo -e "├────${message}";
    tput sgr0;
}

function endLog() {
    message=$(echo $1 | sed 's/\.\///g' | awk '{print toupper($0)}');
    tput bold; tput rev;
    echo -e "└──${message}";
    echo -e "";
    tput sgr0;
}

function grantAdmin() {
    groupLog "grantAdmin";
    target=$1;
    groupLog "${target}";
    if [[ ! -d ${target} ]]; then endLog "Invalid Path"; exit -1; fi
    sudo chown -R $(whoami):admin ${target} || exit $?;
}
