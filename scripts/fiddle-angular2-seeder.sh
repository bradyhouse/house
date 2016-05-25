#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/10/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/ANGULAR DIRECTORY____|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201605180420
# ---------------------------------------------------------------------------------------------------|

source bin/_utils.sh;
source bin/angular2-seeder/_create.sh;

if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 59
fi

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

fiddleSubDir="../fiddles/angular2/$1";
fiddleTemplateDir="../fiddles/angular2/template";
bornOnDate=$(date +"%m-%d-%y";)
echo ${bornOnDate};


function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
            ;;
        1)  endLog "_create.sh: ngCreate() failed";
            ;;
        *)  endLog "fubar! Something went wrong.";
            ;;
    esac
    exit $1
}
# try
(
    if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
    cd ../fiddles/angular2-seeder;
    seederCreate $1 ${bornOnDate} || exit 1;
)

# catch
rc=$?; catch ${rc};

#finally
exit ${rc};




