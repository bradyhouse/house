#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function main() {
    git push --set-upstream origin $1
}


if [ "$#" -ne 2 ]
then
    echo "$0 \"[src]\" \"[nwb]\""
    echo ""
    echo -e "[src]\tSource git branch"
    echo -e "[nwb]\tNew git branch"
    echo ""
    exit
fi

main $1 $2

