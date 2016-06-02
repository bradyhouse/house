#!/usr/bin/env bash

source bin/_utils.sh;
source bin/openshift/_install.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "openshift configured";
            ;;
        1)  endLog "call to rhcInstall() failed";
            ;;
        2)  endLog "call to rhcSetup() failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    _path="fiddle";
    if [ "$#" -eq 1 ]; then _path=$1; fi
    rhcInstall || exit 1;
    rhcSetup || exit 2;
)
catch $?;
