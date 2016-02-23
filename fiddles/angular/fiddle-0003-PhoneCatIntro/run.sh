#!/usr/bin/env bash

source script.sh

function catch() {
    case $1 in
        0)  echo "startup succeeded";
            ;;
        1)  echo "script.sh: failed @ stopPhoneCatRepo@14()";
            ;;
        2)  echo "script.sh: failed @ startPhoneCatRepo@14()";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    stopPhoneCatRepo@14 || exit 1;
    startPhoneCatRepo@14 || exit 2;
)
catch $?;
