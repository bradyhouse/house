#!/usr/bin/env bash

source ../../../scripts/bin/_utils.sh;
source bin/aurelia/_create.sh;
source bin/aurelia/_install.sh;
source bin/aurelia/_add_gulpfile.sh;
source bin/http-server/_install.sh;
source bin/http-server/_start.sh;

this=$0;

function catch() {
    case $1 in
        0)  endLog "fiddle created.";
            ;;
        1)  echo "aureliaCreate() failed";
            ;;
        2)  echo "call to aureliaBundlerInstall() failed";
            ;;
        3)  echo "gulpInstall() failed";
            ;;
        4)  echo "jspmInstall() failed";
            ;;
        5)  echo "aureliaPathInstall() failed";
            ;;
        6)  echo "webComponentsJsInstall() failed";
            ;;
        7)  echo "aureliaHITLInstall() failed";
            ;;
        8)  echo "installHttpServer() failed";
            ;;
        9)  echo "initGulpFile() failed";
            ;;
        10)  echo "startHttpServer() failed";
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
    cd ${_path};
    aureliaBundlerInstall || exit 2;
    gulpInstall || exit 3;
    jspmInstall || exit 4;
    echo "continue?";
    read continue;
    aureliaPathInstall || exit 5;
    webComponentsJsInstall || exit 6;
    aureliaHITLInstall || echo $? || exit 7;
    installHttpServer || exit 8;
    addGulpFile || exit 9;

    log "${this}" "Do you want start \"${_path}\" [Y/n]?"
    read _startNow;
    if [[ ${_startNow} == "Y" || ( ${_startNow} == "y" || ${_startNow} == "") ]]
    then
        startHttpServer || exit 10;
    fi
)
catch $?;





