#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

DB_ROOT="db"
TYPE_TABLE="types.csv"
ACTION_TABLE="actions.csv"

function pipeTypesTo() {
    root=${DB_ROOT};
    table=${TYPE_TABLE};
    callback=$1;
    dbFile="${root}/${table}"
    if [[ ! -e "${dbFile}" ]]; then echo "Type table, \"${dbFile}\", could not be found"; exit 5001; fi
    while read line; do
        set -- "$line";
        IFS=","; declare -a Array=($*);
        id=$(echo ${Array[0]});
        type=$(echo ${Array[1]});
        ${callback} "${id}" "${type}";
    done < ${dbFile}
}

function pipeTypes() {
    root=${DB_ROOT};
    table=${TYPE_TABLE};
    dbFile="${root}/${table}";
    delim=$1;
    result="";
    if [[ ! -e "${dbFile}" ]]; then echo "Type table, \"${dbFile}\", could not be found"; exit 5002; fi
    lineIndex=1;
    while read line; do
        set -- "$line";
        IFS=","; declare -a Array=($*);
        id=$(echo ${Array[0]});
        type=$(echo ${Array[1]});
        if [[ ${lineIndex} -eq 1 ]]
        then
            result="${type}";
        else
            result="${result}${delim}${type}";
        fi
        lineIndex=`expr ${lineIndex} + 1`;
    done < ${dbFile}
    echo "${result}";
}

function isValidType() {
    root=${DB_ROOT};
    table=${TYPE_TABLE};
    query=$1;
    result=-1;
    dbFile="${root}/${table}";
    if [[ ! -e "${dbFile}" ]]; then echo "Type table, \"${dbFile}\", could not be found"; exit 5003; fi
    while read line; do
        set -- "$line";
        IFS=","; declare -a Array=($*);
        id=$(echo ${Array[0]});
        type=$(echo ${Array[1]});
        if [[ "${query}" -eq "${type}" ]]
        then
            result=0;
        fi
    done < ${dbFile}
    echo "${result}"
}

function pipeActions() {
    root=${DB_ROOT};
    table=${ACTION_TABLE};
    query=$1;
    result="";
    dbFile="${root}/${table}";
    if [[ ! $(isValidType "${query}") ]]; then echo "Invalid Type specified"; exit 5004; fi
    if [[ ! -e "${dbFile}" ]]; then echo "Action table, \"${dbFile}\", could not be found"; exit 5004; fi
    while read line; do
        set -- "$line";
        IFS="|"; declare -a Array=($*);
        type=$(echo ${Array[0]});
        actions=$(echo ${Array[1]});
        if [[ "${query}" -eq "${type}" ]]
        then
            result=${actions};
        fi
    done < ${dbFile}
    echo "${result}";
}

function typeContainsAction() {
    line=$1;
    query=$2;
    result="false";
    set -- "$line";
    IFS=","; declare -a Array=($*);
    for action in "${Array[@]}"
    do
        if [[ ${query} = ${action} ]]
        then
            result="true";
        fi
    done
    echo ${result};
}

function pipeTypesByAction() {
    root=${DB_ROOT};
    table=${ACTION_TABLE};
    typeIndex=1;
    query=$1;
    delim=$2;
    result="";
    dbFile="${root}/${table}";
    if [[ ! $(isValidType "${query}") ]]; then echo "Invalid Type specified"; exit 5005; fi
    if [[ ! -e "${dbFile}" ]]; then echo "Action table, \"${dbFile}\", could not be found"; exit 5005; fi
    while read line; do
        set -- "$line";
        IFS="|"; declare -a Array=($*);
        type=$(echo ${Array[0]});
        actions=$(echo ${Array[1]});
        typeActionLinked=$(typeContainsAction "${actions}" "${query}";);
        if [[ "${typeActionLinked}" = "true" ]]
        then
            if [[ ${typeIndex} -eq 1 ]]
            then
                result="${type}";
            else
                result="${result}${delim}${type}";
            fi
            typeIndex=`expr ${typeIndex} + 1`;
        fi
    done < ${dbFile}
    echo "${result}";
}

