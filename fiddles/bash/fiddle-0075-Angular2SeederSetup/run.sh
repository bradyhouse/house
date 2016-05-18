#!/usr/bin/env bash

source _Angular2SeederSetup.sh;


function catch() {
    case $1 in
        0)  echo "";
            ;;
        1)  echo "seedAngular2Fiddle failed";
            ;;
        *)  echo "fubar! Something went wrong.";
            ;;
    esac
    exit $1
}
# try
(
    seedAngular2Fiddle "fiddle" || exit $?;
)
catch $?;





