#!/usr/bin/env bash

source ../../../scripts/bin/_utils.sh;


echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."



function catch() {
    case $1 in
        0)  endLog "protractor installed";
            ;;
        1)  endLog "could not find java";
            ;;
        2)  endLog "could not find npm";
            ;;
        3)  endLog "failed while attempting to install protractor";
            ;;
        4)  endLog "failed while attempting to update wedriver-manager";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    startLog "Is Java Installed...";
    isInstalled java || exit 1;
    startLog "Is Npm installed...";
    isInstalled npm || exit 2;
    startLog "Installing protractor...";
    npm install -g protractor || exit 3;
    startLog "Updating webdriver-manager...";
    webdriver-manager update || exit 4;

)
catch $?;

