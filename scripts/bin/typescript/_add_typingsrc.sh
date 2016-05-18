#!/usr/bin/env bash

function createTypingsRcFile() {
    log "$0" "createTypingsRcFile";
    touch .typingsrc
    echo "{" >> .typingsrc
    echo -e "   \"rejectUnauthorized\": false" >> .typingsrc
    echo "}" >> .typingsrc
}





