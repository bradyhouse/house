#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : ANGULAR2 CLI INSTALL SETUP______________________________________________|
#  Entry Point             : ngInstall_______________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-angular2-cli.sh_______________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605020420
# 01/24/2018 - See CHANGELOG @ aurelia-dependencies-update
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
