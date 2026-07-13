#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER NATIVESCRIPT STARTUP FUNCTION____________________________________|
#  Entry Point             : electronStart___________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-start.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
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
  npm install;
}

function npmStart() {
  groupLog "npmStart";
  npm start;
}

function electronStart() {
    groupLog "electronStart";
    nvmInstall || exit $?;
    npmInstall || exit $?;
    npmStart || exit $?;
    exit 0;
}
