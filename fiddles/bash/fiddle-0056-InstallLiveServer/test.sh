#!/usr/bin/env bash

source script.sh

function catch() {
    case $1 in
        0)  echo "all tests succeeded"
            ;;
        1)  echo "isLiveServerInstalled() failed"
            ;;
        2)  echo "installLiveServer() failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    isLiveServerInstalled || exit 1
    installLiveServer || exit 2
)
catch $?;





