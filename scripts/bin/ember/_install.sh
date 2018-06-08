#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : EMBER INSTALL FUNCTIONS LIB_____________________________________________|
#  Entry Point             : emberInstall____________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : _create.sh, _update.sh__________________________________________________|
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

function shrinkWrapInstall() {
  groupLog "shrinkWrapInstall";
  os=$(getOS;);
  ./fiddle.sh "setup" "${os}" "shrinkwrap";
}

function isNcuInstalled() {
  if [[ ! $(which ncu;) ]]
  then
      echo "false";
  else
      echo "true";
  fi
}


function ncuInstall() {
  groupLog "ncuInstall";
  installed=$(isNcuInstalled;);
  if [[ "${installed}" == "false" ]]
  then
    os=$(getOS;);
    ./fiddle.sh "setup" "${os}" "ncu";
  fi
}

function isEmberInstalled() {
    if [[ ! $(which ember;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function emberInstall() {
    log "$0" "emberInstall";
    installed=$(isEmberInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        npm install -g ember-cli || exit $?;
    fi
}
