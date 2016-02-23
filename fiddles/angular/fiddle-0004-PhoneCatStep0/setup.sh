#!/usr/bin/env bash

source script.sh

function catch() {
    case $1 in
        0)  echo "setup succeeded"
            ;;
        1)  echo "script.sh: failed @ clonePhoneCatRepo@14()";
            ;;
        2)  echo "script.sh: failed @ checkoutPhoneCatRepoStep0()";
            ;;
        3)  echo "script.sh: failed @ installPhoneCatRepo()";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    clonePhoneCatRepo@14 || exit 1;
    checkoutPhoneCatRepoStep0 || exit 2;
    installPhoneCatRepo || exit 3;
)
catch $?;
