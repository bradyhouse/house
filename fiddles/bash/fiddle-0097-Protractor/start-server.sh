#!/usr/bin/env bash

source ../../../scripts/bin/_utils.sh;


echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


function catch() {
    case $1 in
        0)  endLog "http://localhost:4444/wd/hub started";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    nohup webdriver-manager start &

)
catch $?;
