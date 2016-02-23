#!/usr/bin/env bash

source script.sh

function catch() {
    case $1 in
        0)  echo "all tests succeeded"
            ;;
        1)  echo "script.sh: failed @ testPhoneCatRepo@14()";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    nohup ./run.sh &
    testPhoneCatRepo@14 || exit 1;
)
catch $?;
