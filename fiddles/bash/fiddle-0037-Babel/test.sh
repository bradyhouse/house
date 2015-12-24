#!/usr/bin/env bash
clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

test=$(./script.sh "app.js" "app.min.js";);


if [[ ! -e "app.min.js" ]]
then
    echo "test 1 failed"
else
    echo "test 1 passed"
fi


