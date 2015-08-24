#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function main() {
    git checkout $1
    git pull
    git checkout $2
    git merge $1
}


if [ "$#" -ne 3 ]
then
    echo "$0 \"[rt]\" \"[src]\" \"[trg]\""
    echo ""
    echo -e "[rt]\tPath to the root of the git repository "
    echo -e "[src]\tSource git branch"
    echo -e "[trg]\tTarget git branch"
    echo ""
    exit
fi

main $1 $2
