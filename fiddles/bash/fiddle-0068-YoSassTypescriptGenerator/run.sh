#!/usr/bin/env bash

source bin/_common.sh
source bin/_add_directory.sh
source bin/_install_global.sh
source bin/_init.sh

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function catch() {
    case $1 in
        0)  endLog "environment configured";
            ;;
        1)  echo "_add_directory.sh: createRootDirectory() failed";
            ;;
        2)  echo "_install_global.sh: npmInstallYoGlobal() failed";
            ;;
        3)  echo "_install_global.sh: npmInstallGeneratorSassTypescriptGlobal() failed";
            ;;
        4)  echo "_install_global.sh: npmInstallNodeSassGlobal() failed";
            ;;
        5)  echo "_init.sh: yoSassTypescript() failed";
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
    createRootDirectory "${_path}" || exit 1;
    cd "${_path}";
    npmInstallYoGlobal || exit 2;
    npmInstallGeneratorSassTypescriptGlobal || exit 3;
    npmInstallNodeSassGlobal || exit 4;
    yoSassTypescript || exit 5;
)
catch $?;
