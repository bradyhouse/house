#!/usr/bin/env bash

test1=$(./script.sh "svg" "0022";);
test2=$(./script.sh "svg" "22";);
test3=$(./script.sh "svg" "222222";);


if [[ ! ${test1} -eq "fiddle-0022-Spirograph" ]]
then
    echo "test 1 failed"
else
    echo "test 1 passed"
fi

if [[ ! ${test2} -eq "fiddle-0022-Spirograph" ]]
then
    echo "test 2 failed"
else
    echo "test 2 passed"
fi

if [[ ! ${test3} -eq "Invalid Criteria specified!" ]]
then
    echo "test 3 failed"
else
    echo "test 3 passed"
fi


