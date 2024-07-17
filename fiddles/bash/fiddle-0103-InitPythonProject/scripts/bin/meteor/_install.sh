#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : METEOR INSTALL FUNCTION LIB_____________________________________________|
#  Entry Point             : N/A_____________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : _create.sh, _update.sh__________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605020420
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
  ./fiddle.sh "setup" "${OS}" "shrinkwrap";
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

function isMeteorInstalled() {
    if [[ ! $(which meteor;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function meteorInstall() {
    groupLog "meteorInstall";
    installed=$(isMeteorInstalled;);
    if [[ "${installed}" == "false" ]]
    then
      os=$(getOS;);
      ./fiddle.sh "setup" "${os}" "meteor";
    fi
}

