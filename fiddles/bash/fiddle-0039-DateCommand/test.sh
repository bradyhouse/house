#!/usr/bin/env bash
clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

test1=$(./script.sh;);
test2=$(./script.sh "2015-11-10" "16:24:29";);


if [[ ! ${test1} -eq "1444101428" ]]
then
    echo "test 1 failed"
else
    echo "test 1 passed"
fi

if [[ ! ${test2} -eq "1444080269" ]]
then
    echo "test 2 failed"
else
    echo "test 2 passed"
fi



