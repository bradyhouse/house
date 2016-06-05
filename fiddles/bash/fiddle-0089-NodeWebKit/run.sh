#!/usr/bin/env bash

source bin/_utils.sh;
source bin/node-webkit/_install.sh;
source bin/node-webkit/_create.sh;
source bin/node-webkit/_start.sh;


clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "fiddle created";
            ;;
        1)  endLog "Call to nwInstall() failed";
            ;;
        2)  endLog "Call to nwCreate() failed";
            ;;
        3)  endLog "Call to nwStart() failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    nwInstall || exit 1;
    nwCreate "fiddle" || exit 2;
    nwStart "fiddle" || exit 3;
)
catch $?;
