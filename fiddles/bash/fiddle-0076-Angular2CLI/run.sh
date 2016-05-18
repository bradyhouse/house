#!/usr/bin/env bash

source bin/_util.sh;
source bin/angular2/_install.sh;
source bin/angular2/_create.sh;
source bin/angular2/_start.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "environment configured";
            ;;
        1)  echo "_install.sh: npmInstallAngularCLIGlobal() failed";
            ;;
        2)  echo "_create.sh: ngCreate() failed";
            ;;
        3)  echo "_start.sh: ngStart() failed";
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
    npmInstallAngularCLIGlobal || exit 1;
    ngCreate ${_path} || exit 2;
    ngStart ${_path} || exit 3;
)
catch $?;





