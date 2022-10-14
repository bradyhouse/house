#!/usr/bin/env bash

source ../../../scripts/bin/_utils.sh;


clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "environment configured";
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
    # Do stuff

)
catch $?;
