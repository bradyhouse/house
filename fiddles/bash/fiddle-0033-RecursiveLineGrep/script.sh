#!/usr/bin/env bash

dir=$1
location=$(pwd;)
listFile="${location}/list.yaml"
scriptFile="${location}/update.sh"

function generateList() {
    cd ${dir}
    find . -name \*.sh -print > ${listFile}
}

function parseScript() {
    srcScriptDir=$(echo $1 | cut -d/ -f 2)
    srcScriptFile=$(echo $1 | cut -d/ -f 3)
    #echo ${srcScriptDir}
    cd "${dir}/${srcScriptDir}"
    echo -e "# ${srcScriptDir}" >> ${scriptFile}
    cat "${srcScriptFile}" | grep -v "#" | grep "cp" | sed -e 's/^[[:space:]]*//' >> ${scriptFile}
    echo -e "" >> ${scriptFile}
}
function iterateList() {
    if [[ -e ${listFile} ]]
    then
        if [[ -e ${scriptFile} ]]
        then
            rm ${scriptFile}
            touch ${scriptFile}
        fi
        for file in $(cat ${listFile})
        do
            parseScript "${file}";
        done
    fi
}
function cleanup() {
    rm ${listFile}
}

generateList;
iterateList;
cleanup;



