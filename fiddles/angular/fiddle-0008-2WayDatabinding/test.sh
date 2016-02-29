#!/usr/bin/env bash
clear
thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'

source script.sh

function catch() {
    case $1 in
        0)  echo "test.sh: succeeded";
            ;;
        1)  echo "script.sh: failed @ e2eTestPhoneCatRepo()";
            ;;
        2)  echo "script.sh: failed @ unitTestPhoneCatRepo()";
            ;;
        86) echo ""
            echo "test.sh: Incorrect number of arguments"
            echo ""
            echo "Usage:"
            echo ""
            echo "$0 \"[t]\""
            echo ""
            echo -e "[t] \"test type\". Valid types include: "
            echo ""
            echo -e "\t\"e2e\"\tend 2 end"
            echo -e "\t\"unit\"\tunit tests"
            echo ""
            echo ""
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
	if [ "$#" -ne 1 ]; then  exit 86; fi
    nohup ./run.sh &
    case $1 in
        'e2e')
            e2eTestPhoneCatRepo || exit 1;
            ;;
        'unit')
            unitTestPhoneCatRepo || exit 2;
            ;;
        '*')
            exit 86;
            ;;
    esac
)
catch $?;
