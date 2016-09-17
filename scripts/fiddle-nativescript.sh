#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/22/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/NATIVESCRIPT DIR_____|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201605180420
# 09/16/2016 - See CHANGELOG.MARKDOWN @ 201609160420
# ---------------------------------------------------------------------------------------------------|

source bin/nativescript/.nativescriptrc
source bin/_utils.sh;
source bin/nativescript/_create.sh;
source bin/nativescript/_install.sh;
source bin/nativescript/_start.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 59
fi
fiddleSubDir="../fiddles/nativescript/$1";
bornOnDate=$(date +"%m-%d-%y";)

function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
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
        9)  endLog "Invalid name please use the format \"fiddle-####-[Name]\"."
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    projectName=$(toLowerCase $(parseName $1;);) || exit 9;
    groupLog "App Name: ";
    echo "\"${projectName}\"";
    cd ../fiddles/nativescript;
    typescriptInstall || exit 1;
    nativescriptInstall || exit 2;
    nvmInstall || exit 3;
    adbInstall || exit 8;
    nvmUseNodeVer || exit 4;
    nativescriptCreate $1 ${bornOnDate} ${projectName} ${__TEMPLATE_TYPE__} || exit 5;
)
rc=$?; catch ${rc};
# finally
exit ${rc};


