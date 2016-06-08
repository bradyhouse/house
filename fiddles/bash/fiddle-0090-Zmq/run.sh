#!/usr/bin/env bash

source bin/_utils.sh;
source bin/brew/_update.sh;
source bin/zmq/_install.sh;
source bin/zmq/_uninstall.sh;


clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        1)  endLog "call to brewUpdate failed";
            ;;
        2)  endLog "call to zmqUnInstall failed";
            ;;
        3)  endLog "call to zmqInstall failed";
            ;;
        0)  endLog "zmq configured";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    _path="fiddle";
    brewUpdate || exit 1;
    zmqUninstall || exit 2;
    zmqInstall ${_path} || exit 3;
)
catch $?;
