#!/usr/bin/env bash

source bin/_utils.sh;
source bin/electron/_create.sh;
source bin/electron/_install.sh;
source bin/electron/_start.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "Electron POC created";
            ;;
        1)  endLog "electronInstall failed";
            ;;
        2)  endLog "electronCreate failed";
            ;;
        3)  endLog "electronStart failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    _path="fiddle";
    _bornOnDate=$(date +"%m-%d-%y";);
    electronInstall || exit 1;
    electronCreate ${_path} ${_bornOnDate} || exit 2;
    cd ${_path};
    electronStart || exit 3;
)
rc=$?; catch ${rc};
# finally
exit ${rc};
