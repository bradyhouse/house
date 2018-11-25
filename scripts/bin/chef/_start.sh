#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/21/2018______________________________________________________________|
#  Description             : MASTER CHEF STARTUP FUNCTION____________________________________________|
#  Entry Point             : reactStart______________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-start.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 262_add_chef_setup
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
