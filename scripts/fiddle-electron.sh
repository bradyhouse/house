#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/18/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/ELECTRON DIR_________|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201605180420
# ---------------------------------------------------------------------------------------------------|

source bin/_utils.sh;
source bin/electron/_install.sh;
source bin/electron/_create.sh;

if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 59
fi

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

fiddleSubDir="../fiddles/electron/$1";
fiddleTemplateDir="../fiddles/electron/template";
bornOnDate=$(date +"%m-%d-%y";)
echo ${bornOnDate};


function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
            ;;
        1)  endLog "_install.sh: electronInstall() failed";
            ;;
        2)  endLog "_create.sh: electronCreate() failed";
            ;;
        *)  endLog "fubar! Something went wrong.";
            ;;
    esac
    exit $1
}
# try
(
    if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
    cd ../fiddles/electron;
    electronInstall || exit 1;
    electronCreate $1 ${bornOnDate} || exit 2;
)

# catch
rc=$?; catch ${rc};

#finally
exit ${rc};




