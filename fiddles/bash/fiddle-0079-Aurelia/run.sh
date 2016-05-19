#!/usr/bin/env bash

source bin/_utils.sh
source bin/aurelia/_create.sh
source bin/http-server/_install.sh
source bin/http-server/_start.sh

function catch() {
    case $1 in
        0)  endLog "fiddle created.";
            ;;
        1)  echo "aureliaCreate() failed";
            ;;
        2)  echo "installHttpServer() failed";
            ;;
        3)  echo "startHttpServer() failed";
            ;;
        *)  echo "fubar! Something went wrong.";
            ;;
    esac
    exit $1
}
# try
(
   _path="fiddle";
   _bornOnDate=$(date +"%m-%d-%y";)
   aureliaCreate "${_path}" "${_bornOnDate}" || exit 1;
   installHttpServer || exit 2;
   cd ${_path};
   startHttpServer || exit 3;
)
catch $?;





