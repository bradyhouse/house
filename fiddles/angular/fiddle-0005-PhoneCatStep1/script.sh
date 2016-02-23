#!/usr/bin/env bash

removePhoneCatRepo() {
    if [[ -d "angular-phonecat" ]]
    then
        rm -rf angular-phonecat;
    fi

}
clonePhoneCatRepo@14() {
    removePhoneCatRepo || exit -1;
    if [[ ! -d "angular-phonecat" ]]
    then
        git clone --depth=14 https://github.com/angular/angular-phonecat.git
    fi
}

checkoutPhoneCatRepoStep1() {
    if [[ -d "angular-phonecat" ]]
    then
        cd angular-phonecat;
        git checkout -f step-1;
    else
        exit -1;
    fi
}

installPhoneCatRepo() {
    cd angular-phonecat;
    npm install;
}

stopPhoneCatRepo() {
    _pid=$(lsof -i:8000 -t || echo '-1')
    if [[ ${_pid} -ne "-1" ]]
    then
        $(lsof -i:8000 -t | xargs kill;) || exit -1
    fi
}

startPhoneCatRepo() {
    if [[ -d "angular-phonecat" ]]
    then
        cd angular-phonecat;
        npm start;
    else
        exit -1;
    fi
}

testPhoneCatRepo() {
    if [[ -d "angular-phonecat" ]]
    then
        cd angular-phonecat;
        npm run protractor;
    else
        exit -1;
    fi
}
