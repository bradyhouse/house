#!/usr/bin/env bash

source script.sh

function pause() {
    echo "";
    read -p "Press any key to continue ..."
    echo "";
}

function onReadTypeTable() {
    id=$1
    type=$2
    echo -e "${id}\t${type}"
}

function catch() {
    case $1 in
        0)  echo "all tests succeeded"
            ;;
        1)  echo "script.sh: pipeTypesTo() failed."
            ;;
        2)  echo "script.sh: pipeTypes() failed";
            ;;
        3)  echo "script.sh: pipeActions() failed";
            ;;
        4)  echo "script.sh: typeContainsAction() failed";
            ;;
        5)  echo "script.sh: pipeTypeByAction() failed";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    pipeTypesTo "onReadTypeTable" || exit 1;
    pause;
    pipeTypes " | " || exit 2;
    pause;
    pipeActions "Angular" || exit 3;
    pause;
    typeContainsAction "create,fork,index,list,delete,refactor" "refactor" || exit 4;
    pause;
    pipeTypesByAction "combine" " | " || exit 5;
    pause;
)
catch $?;
