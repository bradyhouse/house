#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/26/2018______________________________________________________________|
#  Description             : MASTER NODE STARTUP FUNCTION____________________________________________|
#  Entry Point             : nodeStart_______________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-start.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 230_update_and_shrinkwrap
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

function nodeStart() {
    groupLog "nodeStart";
    online=$(isOnline;);
    if [[ "${online}" == "Online" ]]
    then
      nvmInstall || exit $?;
      npmInstall || exit $?;
    fi

    npmStart || exit $?;
    exit 0;
}
