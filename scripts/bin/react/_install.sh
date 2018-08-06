#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 08/01/2018______________________________________________________________|
#  Description             : REACT INSTALL SETUP_____________________________________________________|
#  Entry Point             : ngInstall_______________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-angular2-cli.sh_______________________________________________|
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

function isNcuInstalled() {
  if [[ ! $(which ncu;) ]]
  then
      echo "false";
  else
      echo "true";
  fi
}

function shrinkWrapInstall() {
  groupLog "shrinkWrapInstall";
  os=$(getOS;);
  ./fiddle.sh "setup" "${os}" "shrinkwrap";
}

function ncuInstall() {
  groupLog "ncuInstall";
  installed=$(isNcuInstalled;);
  if [[ "${installed}" == "false" ]]
  then
    os=$(getOS;);
    ./fiddle.sh "setup" "${OS}" "ncu";
  fi
}

function isNgInstalled() {
    if [[ ! $(which ng;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function ngInstall() {
    groupLog "ngInstall";
    installed=$(isNgInstalled;);
    if [[ "${installed}" == "false" ]]
    then
      os=$(getOS;);
      ./fiddle.sh "setup" "${os}" "ng";
    fi
}
