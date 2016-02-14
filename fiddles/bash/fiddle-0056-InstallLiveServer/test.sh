#!/usr/bin/env bash

source script.sh

function catch() {
    case $1 in
        0)  echo "all tests succeeded"
            ;;
        1)  echo "installLiveServer() failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    installLiveServer || exit 1
)
catch $?;





