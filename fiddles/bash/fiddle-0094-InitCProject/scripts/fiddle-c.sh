#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/28/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/C DIR________________|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG.MARKDOWN @ 201611280420
# ---------------------------------------------------------------------------------------------------|

this=$0;

source bin/_utils.sh;
source bin/c/.gccrc;
source bin/c/_install.sh;
source bin/c/_create.sh;

clear;

if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 59
fi
fiddleSubDir="../fiddles/c";
bornOnDate=$(date +"%m-%d-%y";)

function catch() {
    case $1 in
        0)  endLog "${this}";
            ;;
        1)  endLog "gcc is not installed or configured properly.";
            ;;
        2)  endLog "call to cCreate function failed";
            ;;
        3)  endLog "cannot access root android fiddle directory.";
            ;;
        *)  endLog "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    startLog $(echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}');
    name=$1;
    suffix=$(parseName ${name};);
    projectName=$(toLowerCase ${suffix};);
    groupLog "App Name: ";
    echo "\"${projectName}\"";
    cd "${fiddleSubDir}" || exit 3;
    isGccInstalled || exit 1;
    gccCreate $1 ${bornOnDate} ${projectName} || exit 2;
)
rc=$?; catch ${rc};
# finally
exit ${rc};


