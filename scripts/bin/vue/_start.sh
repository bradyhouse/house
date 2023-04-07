#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/30/2023______________________________________________________________|
#  Description             : MASTER VUE STARTUP FUNCTION_____________________________________________|
#  Entry Point             : vueStart________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-start.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 723-add-vuejs-support
# ---------------------------------------------------------------------------------------------------|

function nvmInstall() {
  groupLog "nvmInstall";

  if [[ -d ${NVM_DIR} ]]
  then
    source ${NVM_DIR}/nvm.sh;
    nvm install ${NVM_VERSION};
  else
    exit 3;
  fi
}

function npmInstall() {
  groupLog "npmInstall";
  if [[ ! -d node_modules ]]
  then
    npm install;
  fi
}

function vueStart() {
    groupLog "vueStart";
    _port=3000;
    if [[ $? -eq 2 ]]
    then
        _port=$2;
    fi
    nvmInstall || exit $?;
    npmInstall || exit $?;
    ./node_modules/.bin/vite --port ${_port} || exit $?;
    exit 0;
}
