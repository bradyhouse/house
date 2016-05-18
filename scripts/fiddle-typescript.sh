#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/12/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/TYPESCRIPT DIRECTORY_|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# 04/16/2016 - See CHANGELOG @ 201604160420
# ---------------------------------------------------------------------------------------------------|

source bin/_utils.sh;
source bin/typescript/_install_global.sh;
source bin/typescript/_add_directories.sh;
source bin/typescript/_init.sh;
source bin/typescript/_add_typingsrc.sh;
source bin/typescript/_install_save.sh;
source bin/typescript/_add_gulpfile.sh;
source bin/typescript/_add_karma_conf.sh;


if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 59
fi

fiddleSubDir="../fiddles/typescript/$1";
fiddleTemplateDir="../fiddles/typescript/template";
bornOnDate=$(date +"%m-%d-%y";)
echo ${bornOnDate}

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
        4)  echo "_install_global.sh: npmInstallTypingsGlobal() failed";
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
        10) echo "_init.sh: npmInit() failed";
            ;;
        11) echo "_install_save.sh: npmInstallGulpTypescript() failed";
            ;;
        12) echo "_install_save.sh: npmInstallJquery() failed";
            ;;
        13) echo "_install_save.sh: npmInstallD3() failed";
            ;;
        14)  echo "_init.sh: bowerInit() failed";
            ;;
        15) echo "_install_save.sh: typingsInstallJquery() failed";
            ;;
        16) echo "_install_save.sh: typingsInstallD3() failed";
            ;;
        17) echo "_install_save.sh: npmInstallGulpTslintSaveDev() failed";
            ;;
        18) echo "_install_save.sh: npmInstallBrowserifySaveDev() failed";
            ;;
        19) echo "_install_save.sh: npmInstallVinylTransformSaveDev() failed";
            ;;
        20) echo "_install_save.sh: npmInstallGulpUglifySaveDev() failed";
            ;;
        21) echo "_install_save.sh: npmInstallGulpSourceMapsSaveDev() failed";
            ;;
        22) echo "_install_save.sh: npmInstallMochaSaveDev() failed";
            ;;
        23) echo "_install_save.sh: npmInstallKarmaSaveDev() failed";
            ;;
        24) echo "_install_save.sh: npmInstallBrowserSyncSaveDev() failed";
            ;;
        25) echo "_add_gulpfile.sh: addGulpFile() failed";
            ;;
        26) echo "_add_karma_conf.sh: addKarmaConf() failed";
            ;;
        27) echo "failed to create the \"${fiddleSubDir}\" directory."
            ;;
        28) echo "failed trying to update the \"${fiddleSubDir}/README.markdown\" file."
            if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
    $(cp -rf "${fiddleTemplateDir}" "${fiddleSubDir}") || exit 27
    $(voidSubstr '{{FiddleName}}' $1 "${fiddleSubDir}/README.markdown";) || exit 28
    $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "${fiddleSubDir}/README.markdown";) || exit 28
    cd "${fiddleSubDir}";
    addDirectories "${fiddleSubDir}" || exit 1;
    npmInstallBowerGlobal || exit 2;
    npmInstallGulpGlobal || exit 3;
    npmInstallTypingsGlobal || exit 4;
    npmInstallTypescriptGlobal || exit 5;
    npmInstallBrowserifyGlobal || exit 6;
    npmInstallBrowserSyncGlobal || exit 7;
    npmInstallYoGlobal || exit 8
    createTypingsRcFile || exit 9;
    npmInit || exit 10;
    npmInstallGulpTypescript || exit 11;
    npmInstallJquery || exit 12;
    npmInstallD3 || exit 13;
    bowerInit || exit 14;
    typingsInstallJquery || exit 15;
    typingsInstallD3 || exit 16;
    npmInstallGulpTslintSaveDev || exit 17;
    npmInstallBrowserifySaveDev || exit 18;
    npmInstallVinylTransformSaveDev || exit 19;
    npmInstallGulpUglifySaveDev || exit 20;
    npmInstallGulpSourceMapsSaveDev || exit 21;
    npmInstallMochaSaveDev || exit 22;
    npmInstallKarmaSaveDev || exit 23;
    npmInstallBrowserSyncSaveDev || exit 24;
    addGulpFile || exit 25;
    addKarmaConf || exit 26;
)
catch $?;




