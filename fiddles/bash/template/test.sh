#!/usr/bin/env bash
clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

test1=$(./script.sh 1;);


if [[ ! ${test1} -eq "2" ]]
then
    echo "test 1 failed"
else
    echo "test 1 passed"
fi



