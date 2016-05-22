#!/usr/bin/env bash

source bin/_utils.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

this=$0;

function catch() {
    case $1 in
        0)  endLog "permissions updated";
            ;;
        1)  endLog "${this}: Call to grantAdmin failed";
            ;;
        *)  echo "${this}: Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    grantAdmin "/usr/local" || exit 1;
)
catch $?;
