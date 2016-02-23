#!/usr/bin/env bash

clonePhoneCatRepo@14() {
    if [[ ! -d "angular-phonecat" ]]
    then
        git clone --depth=14 https://github.com/angular/angular-phonecat.git
    fi
}

checkoutPhoneCatRepoStep0() {
    if [[ -d "angular-phonecat" ]]
    then
        cd angular-phonecat;
        git checkout -f step-0;
    else
        exit -1;
    fi
}

installPhoneCatRepo() {
    cd angular-phonecat;
    npm install;
}

stopPhoneCatRepo() {
    _pid=$(lsof -i:8000 -t || echo '-1')  # Capture Process Id

  # Verify pid found
  if [[ ${_pid} -eq "-1" ]]; then exit 0; fi

  # Kill the process
  $(lsof -i:8000 -t | xargs kill;) || exit -1

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
