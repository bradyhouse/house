#!/usr/bin/env bash

source script.sh

function catch() {
    case $1 in
        0)  echo "all tests succeeded"
            ;;
        1)  echo "script.sh: installNpmCheckUpdates() failed";
            ;;
        2)  echo "script.sh: checkForBowerUpdates() failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    installNpmCheckUpdates || exit 1;
    checkForBowerUpdates || exit 2;
)
catch $?;
