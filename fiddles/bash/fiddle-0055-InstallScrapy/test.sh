#!/usr/bin/env bash

source script.sh

function catch() {
    case $1 in
        0)  echo "all tests succeeded"
            ;;
        1)  echo "isPip3Installed() failed";
            ;;
        2)  echo "install() failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    isPip3Installed || exit 1
    install || exit 2
)
catch $?;





