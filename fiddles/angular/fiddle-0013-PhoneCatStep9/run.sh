#!/usr/bin/env bash

source script.sh

function catch() {
    case $1 in
        0)  echo "startup succeeded";
            ;;
        1)  echo "script.sh: failed @ stopPhoneCatRepo()";
            ;;
        2)  echo "script.sh: failed @ startPhoneCatRepo()";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    stopPhoneCatRepo || exit 1;
    startPhoneCatRepo || exit 2;
)
catch $?;
