#!/usr/bin/env bash

source script.sh

function catch() {
    case $1 in
        0)  echo "all tests succeeded"
            ;;
        1)  echo "installN() failed";
            ;;
        2)  echo "upgradeNode() failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    installN || exit 1;
    upgradeNode || exit 2;
)
catch $?;
