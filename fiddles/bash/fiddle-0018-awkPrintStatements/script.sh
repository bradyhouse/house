#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function listByGroup() {
    awk -v criteria="$1" '{if ($2 ~ criteria) if(length($4) > 7) print $4"\t"$5; else print $4"\t\t"$5;}' FS=',' database
}

echo -e "List Actions:\n"
listByGroup "action"
echo -e "\nList Types:\n"
listByGroup "type"
echo -e "\n"






