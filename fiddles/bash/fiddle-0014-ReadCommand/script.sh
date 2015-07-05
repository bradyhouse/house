#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'


function contains() {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
  return 1
}

function menu() {
    commandArr=("1" "2" "3" "4", "5" "6" "7" "8" "9")
    echo -e ""
    echo -e "--------------------------------------------------------"
    echo -e "ACTION MENU"
    echo -e "--------------------------------------------------------"
    echo -e ""
    echo -e "1\t\"create\"\tCreate a new fiddle"
    echo -e "2\t\"fork\"\t\tFork an existing fiddle"
    echo -e "3\t\"index\"\t\tRe-index a specific fiddle type"
    echo -e "4\t\"start\"\t\tStart the fiddle web service process"
    echo -e "5\t\"stop\"\t\tStop the web service process"
    echo -e "6\t\"delete\"\tDelete an existing fiddle"
    echo -e "7\t\"refactor\"\tRename (\"refactor\") an existing fiddle"
    echo -e "8\t\"test\"\t\tInvoke JsTestDriver for a given fiddle"
    echo -e "9\t\"exit\"\t\tQuit"
    echo -e ""
    echo -e "--------------------------------------------------------"
    read -p "(1-9)? " COMMAND
    if [[ $(contains "${COMMAND}" "${commandArr[@]}"; echo "$?";) == "0" ]]
    then
        echo "you selected ${COMMAND}"
    else
        clear;
        menu;
    fi
}

menu

