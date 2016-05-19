#!/usr/bin/env bash

source bin/_utils.sh;
source bin/ember/_create.sh;
source bin/ember/_install.sh;
source bin/ember/_start.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "environment configured";
            ;;
        1)  endLog "Ember is not installed and/or can't be installed";
            ;;
        2)  endLog "Call to the ember CLI \"new\" failed";
            ;;
        3)  endLog "Call to the ember CLI \"serve\" failed";
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
    installEmber || exit 1;
    emberCreate "${_path}" || exit 2;
    cd ${_path};
    emberStart || exit 3;
)
catch $?;
