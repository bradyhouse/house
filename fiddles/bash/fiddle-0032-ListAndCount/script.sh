#!/usr/bin/env bash

fiddleType=$1
fiddleCriteria=$2

function listAndCount() {
    cd ../../${fiddleType}
    echo $(ls -1 | grep ${fiddleCriteria} | wc -l | sed -e 's/^[[:space:]]*//';)
}

function getFiddle() {
    matches=$(listAndCount;)
    if [[ ${matches} -eq 1 ]]
    then
        cd ../../${fiddleType};
        echo $(ls -1 | grep ${fiddleCriteria};);
    else
        echo "";
    fi
}

fiddle=$(getFiddle;);

if [[ ! ${fiddle}  ]]
then
    echo "Invalid Criteria specified!";
else
    echo "${fiddle}"
fi

