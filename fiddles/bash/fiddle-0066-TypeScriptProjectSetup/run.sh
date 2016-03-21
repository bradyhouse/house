#!/usr/bin/env bash

source bin/_common.sh;
source bin/_install_global.sh;
source bin/_add_directory.sh;
source bin/_init.sh;
source bin/_add_typingsrc.sh;
source bin/_install_save.sh;
source bin/_add_gulpfile.sh;
source bin/_add_karma_conf.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "environment configured";
            ;;
        1)  echo "_add_directory.sh: createRootDirectory() failed";
            ;;
        2)  echo "_install_global.sh: npmInstallBowerGlobal() failed";
            ;;
        3)  echo "_install_global.sh: npmInstallGulpGlobal() failed";
            ;;
        4)  echo "_install_global.sh: npmInstallTsdGlobal() failed";
            ;;
        5)  echo "_install_global.sh: npmInstallTypescriptGlobal() failed";
            ;;
        6)  echo "_install_global.sh: npmInstallBrowserifyGlobal() failed";
            ;;
        7)  echo "_install_global.sh: npmInstallBrowserSyncGlobal() failed";
            ;;
        8)  echo "_install_global.sh: npmInstallYoGlobal() failed";
            ;;
        9)  echo "_init.sh: createTypingsRcFile() failed";
            ;;
        10)  echo "_init.sh: npmInit() failed";
            ;;
        11)  echo "_install_save.sh: npmInstallGulpTypescript() failed";
            ;;
        12)  echo "_install_save.sh: npmInstallJquery() failed";
            ;;
        13)  echo "_init.sh: bowerInit() failed";
            ;;
        14) echo "_install_save.sh: tsdInstallJquery() failed";
            ;;
        15) echo "_install_save.sh: npmInstallGulpTslintSaveDev() failed";
            ;;
        16) echo "_install_save.sh: npmInstallBrowserifySaveDev() failed";
            ;;
        17) echo "_install_save.sh: npmInstallVinylTransformSaveDev() failed";
            ;;
        18) echo "_install_save.sh: npmInstallGulpUglifySaveDev() failed";
            ;;
        19) echo "_install_save.sh: npmInstallGulpSourceMapsSaveDev() failed";
            ;;
        20) echo "_install_save.sh: npmInstallMochaSaveDev() failed";
            ;;
        21) echo "_install_save.sh: npmInstallKarmaSaveDev() failed";
            ;;
        22) echo "_install_save.sh: npmInstallBrowserSyncSaveDev() failed";
            ;;
        23) echo "_add_gulpfile.sh: addGulpFile() failed";
            ;;
        24) echo "_add_karma_conf.sh: addKarmaConf() failed";
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
    npmInstallBowerGlobal || exit 2;
    npmInstallGulpGlobal || exit 3;
    npmInstallTsdGlobal || exit 4;
    npmInstallTypescriptGlobal  || exit 5;
    npmInstallBrowserifyGlobal || exit 6;
    npmInstallBrowserSyncGlobal || exit 7;
    npmInstallYoGlobal || exit 8
    createTypingsRcFile || exit 9;
    npmInit || exit 10;
    npmInstallGulpTypescript || exit 11;
    npmInstallJquery || exit 12;
    bowerInit || exit 13;
    tsdInstallJquery || exit 14;
    npmInstallGulpTslintSaveDev || exit 15;
    npmInstallBrowserifySaveDev || exit 16;
    npmInstallVinylTransformSaveDev || exit 17;
    npmInstallGulpUglifySaveDev || exit 18;
    npmInstallGulpSourceMapsSaveDev || exit 19;
    npmInstallMochaSaveDev || exit 20;
    npmInstallKarmaSaveDev || exit 21;
    npmInstallBrowserSyncSaveDev || exit 22;
    addGulpFile || exit 23;
    addKarmaConf || exit 24;
)
catch $?;





