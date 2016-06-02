#!/usr/bin/env bash

this=$0;

function rubyInstall() {
    groupLog "rubyInstall";
    installed=$(isInstalled "ruby";);
    if [[ "${installed}" == "false" ]]
    then
         groupLog "${this}: ruby is not installed";
         exit 1;
    fi
}

function rhcInstall() {
    groupLog "rhcInstall";
    installed=$(isInstalled "rhc";);
    if [[ "${installed}" == "false" ]]
    then
         sudo gem install rhc || exit $?;
    fi
}

function rhcSetup() {
    groupLog "rhcSetup";
    rhc setup || exit $?;
}



