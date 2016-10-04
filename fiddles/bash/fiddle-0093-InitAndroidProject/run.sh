#!/usr/bin/env bash
source scripts/bin/_utils.sh;

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}';
echo "Bash version ${BASH_VERSION}...";


function catch() {
    case $1 in
        0)  endLog "$0";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
     _path="fiddle-0001-Console";
    cd scripts;
    ./fiddle-android.sh ${_path};

)
catch $?;
