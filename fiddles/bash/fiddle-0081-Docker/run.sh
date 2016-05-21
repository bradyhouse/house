#!/usr/bin/env bash

source bin/_utils.sh;
source bin/brew/_update.sh;
source bin/brew/_install_virtualbox.sh;
source bin/brew/_install_docker.sh;
source bin/docker/_daemon.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

this=$0;

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
        6)  endLog "${this}: call to dockerRunDaemon failed.";
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
    dockerRunDaemon || exit 6;
)
# catch
rc=$?; catch ${rc};
# finally
exit ${rc};

