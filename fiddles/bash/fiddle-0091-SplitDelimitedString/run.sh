#!/usr/bin/env bash

source bin/_utils.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "environment configured";
            ;;
        1)  endLog "invalid name please use the format \"fiddle-####-[Name]\"";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    _path="fiddle-0002-CrossCommunication";
    if [ "$#" -eq 1 ]; then _path=$1; fi
    # Do stuff
    name=$(parseName ${_path};) || exit 1;
    echo ${name};
)
catch $?;
