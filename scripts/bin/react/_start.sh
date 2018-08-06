#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 08/02/2018______________________________________________________________|
#  Description             : MASTER REACT STARTUP FUNCTION___________________________________________|
#  Entry Point             : reactStart______________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-start.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 006_fiddle_react
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

function reactStart() {
    groupLog "reactStart";
    _port=1841
    if [[ $? -eq 2 ]]
    then
        _port=$2;
    fi
    nvmInstall || exit $?;
    npmInstall || exit $?;
    npm start || exit $?;
    exit 0;
}
