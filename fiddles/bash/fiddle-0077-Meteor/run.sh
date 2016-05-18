#!/usr/bin/env bash

source bin/_util.sh;
source bin/meteor/_install.sh;
source bin/meteor/_create.sh;
source bin/meteor/_start.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "environment configured";
            ;;
        1)  echo "_install.sh: npmInstallMeteorGlobal() failed";
            ;;
        2)  echo "_create.sh: meteorCreate() failed";
            ;;
        3)  echo "_start.sh: meteorStart() failed";
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
    npmInstallMeteorGlobal || exit 1;
    meteorCreate ${_path} || exit 2;
    meteorStart ${_path} || exit 3;
)
catch $?;





