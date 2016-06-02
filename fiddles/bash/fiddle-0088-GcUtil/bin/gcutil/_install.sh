#!/usr/bin/env bash

this=$0;

function gcUtilInstall() {
    groupLog "gcUtilInstall";
    installed=$(isInstalled "gcutil";);
    if [[ "${installed}" == "false" ]]
    then
        curl https://dl.google.com/dl/cloudsdk/release/artifacts/gcutil-1.16.1.tar.gz -o gcutil-1.16.1.tar.gz
        sudo tar xzvpf gcutil-1.16.1.tar.gz -C /usr/local/share
        sudo ln -sf /usr/local/share/gcutil-1.16.1/gcutil /usr/local/bin/gcutil
    fi
}



