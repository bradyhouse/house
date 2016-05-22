#!/usr/bin/env bash

source bin/_utils.sh;
source bin/nativescript/_create.sh;
source bin/nativescript/_install.sh;
source bin/nativescript/_start.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "project created";
            ;;
        1)  endLog "typescriptInstall failed.";
            ;;
        2)  endLog "nativescriptInstall failed";
            ;;
        3)  endLog "nvmInstall failed";
            ;;
        4)  endLog "nvmUseVer5 failed";
            ;;
        5)  endLog "nativescriptCreate failed";
            ;;
        6)  endLog "nvmVer42 failed";
            ;;
        7)  endLog "nativescriptStart failed";
            ;;
        8)  endLog "adbInstall failed";
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
    typescriptInstall || exit 1;
    nativescriptInstall || exit 2;
    nvmInstall || exit 3;
    adbInstall || exit 8;
    nvmUseNodeVer5 || exit 4;
    nativescriptCreate ${_path} ${_bornOnDate} || exit 5;
    nvmUseNodeVer426 || exit 6;
    cd ${_path};
    nativescriptStart || exit 7;

)
rc=$?; catch ${rc};
# finally
exit ${rc};
