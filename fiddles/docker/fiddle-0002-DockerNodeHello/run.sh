#!/usr/bin/env bash

source ../../../scripts/bin/_utils.sh;
source ../../../scripts/bin/docker/_brew_install_docker.sh;
source ../../../scripts/bin/docker/_brew_install_virtualbox.sh;
source ../../../scripts/bin/docker/_brew_update.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

this=$(pwd;);


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
        6)  endLog "";
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
    # add your code here

    if [[ -d "fiddle" ]]
    then
        rm -rf fiddle;
    fi

    git clone https://github.com/spkane/docker-node-hello "fiddle";
    cd fiddle;
    docker build -t example/docker-node-hello:latest . || exit 6;
    docker run -d -p 8080:8080 example/docker-node-hello:latest || exit 7;

)
# catch
rc=$?; catch ${rc};
# finally
exit ${rc};
