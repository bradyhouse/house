#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/21/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/DOCKER DIRECTORY_____|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# ---------------------------------------------------------------------------------------------------|

source bin/_utils.sh;
source bin/docker/_brew_update.sh;
source bin/docker/_brew_install_virtualbox.sh;
source bin/docker/_brew_install_docker.sh;
source bin/docker/_create.sh;


if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 59
fi

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

fiddleSubDir="../fiddles/docker/$1";
fiddleTemplateDir="../fiddles/docker/template";
bornOnDate=$(date +"%m-%d-%y";)
echo ${bornOnDate};


function catch() {
    case $1 in
        0)  endLog "environment configured";
            ;;
        1)  endLog "${this}: call to brewUpdate failed.";
            ;;
        2)  endLog "${this}: call to brewInstallCask failed.";
            ;;
        3)  endLog "${this}: call to brewInstallVirtualbox failed.";
            ;;
        4)  endLog "${this}: call to brewInstallDocker failed.";
            ;;
        5)  endLog "${this}: call to brewInstallDockerMachine failed.";
            ;;
        6)  endLog "${this}: call to dockerCreate failed.";
            ;;
        *)  endLog "${this}: Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    brewUpdate || exit 1;
    brewInstallBrewCask || exit 2;
    brewInstallVirtualbox || exit 3;
    brewInstallDocker || exit 4;
    brewInstallDockerMachine || exit 5;
    dockerCreate "$1" "${bornOnDate}" || exit 6;
)
# catch
rc=$?; catch ${rc};
# finally
exit ${rc};




