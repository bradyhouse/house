#!/usr/bin/env bash

source bin/_util.sh;
source bin/meteor/_bundle.sh;
source bin/meteor/_install.sh;
source bin/meteor/_create.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "fiddle created and bundled";
            ;;
        1)  echo "_install.sh: call to the installMeteor() function failed";
            ;;
        2)  echo "_install.sh: call to the installMeteorWebpack() function failed";
            ;;
        3)  echo "_create.sh: call to the meteorCreate() function failed";
            ;;
        4)  echo "_bundle.sh: call to the meteorBundle() function failed";
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
    installMeteor || exit 1;
    installMeteorWebpack || exit 2;
    meteorCreate ${_path} || exit 3;
    cd ${_path};
    meteorBundle || exit 4;
)
catch $?;





