#!/usr/bin/env bash

source _script.sh

function catch() {
    case $1 in
        0)  echo "all tests succeeded"
            ;;
        1)  echo "_script.sh: reset() failed";
            ;;
        2)  echo "_script.sh: gitClone() failed";
            ;;
        3)  echo "_script.sh: gitSubModuleInit() failed";
            ;;
        4)  echo "_script.sh: gitSubModuleUpdate() failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    reset  || exit 1;
    gitClone || exit 2;
    cd "house";
    gitSubModuleInit || exit 3;
    gitSubModuleUpdate || exit 4;
)
catch $?;





