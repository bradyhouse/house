#!/usr/bin/env bash
source '../../../scripts/bin/_utils.sh';
clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."
this=$0;

function downloadClass() {
    _class=$1;
    if [[ ! -d "${_class}" ]]
    then
        ./coursera-dl -n ".netrc" ${_class};
    fi
    return 0;
}


function catch() {
    case $1 in
        0)  endLog "${this}: classes downloaded";
            ;;
        1)  endLog "${this}: .netrc not found.";
            ;;
        2)  endLog "${this}: download of pgm-003 failed";
            ;;
        3)  endLog "${this}: download of bitcointech-001 failed";
            ;;
        4)  endLog "${this}: download of algorithm-design-analysis failed";
            ;;
        6)  endLog "${this}: download of socialpsychology-002 failed";
            ;;
        7)  endLog "${this}: download of maththink-006 failed";
            ;;
        8)  endLog "${this}: download of automata-003 failed";
            ;;
        9)  endLog "${this}: download of mmds-002 failed";
            ;;
        10) endLog "${this}: download of algs4partI-010 failed";
            ;;
        11) endLog "${this}: download of algs4partII-007 failed";
            ;;
        *)  echo "${this}: Something went wrong."
            ;;
    esac
    exit $1
}
# try
(

    if [[ ! -e .netrc ]]; then exit 1; fi
    downloadClass pgm-003 || exit 2;
    downloadClass bitcointech-001 || exit 3;
    downloadClass algorithm-design-analysis || exit 4;
    downloadClass socialpsychology-002 || exit 6;
    downloadClass maththink-006 || exit 7;
    downloadClass automata-003 || exit 8;
    downloadClass mmds-002 || exit 9;
    downloadClass algs4partI-010 || exit 10;
    downloadClass algs4partII-007 || exit 11;
)
catch $?;



