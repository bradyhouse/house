#!/usr/bin/env bash

source script.sh

function catch() {
    case $1 in
        0)  echo "all tests succeeded"
            ;;
        1)  echo "downloadLibXml2() failed";
            ;;
        2)  echo "unzipLibXml2() failed";
            ;;
        3)  echo "isPipInstalled() failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    downloadLibXml2 || exit 1
    unzipLibXml2 || exit 2
    isPipInstalled || exit 3
)
catch $?;





