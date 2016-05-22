#!/usr/bin/env bash

source bin/_utils.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "environment configured";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash

)
catch $?;
