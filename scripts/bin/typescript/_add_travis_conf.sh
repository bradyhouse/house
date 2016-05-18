#!/usr/bin/env bash

function initTravisFile() {
    groupLog "initTravisFile";
    if [[ -e "travis.yml" ]]
    then
        rm -rf "travis.yml";
    fi
    touch "travis.yml";
}

function addNodeConfiguration() {
    echo -e "language: node_js" >> travis.yml
    echo -e "node_js:" >> travis.yml
    echo -e "\t- \"0.10\"\"" >> travis.yml

}

function addTravisConf() {
    log "$0" "addTravisConf";
    initTravisFile;
    addNodeConfiguration;
    endLog "travis.yml added";
}
