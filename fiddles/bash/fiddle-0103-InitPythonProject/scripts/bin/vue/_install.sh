#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 04/03/2023______________________________________________________________|
#  Description             : VUE INSTALL SETUP_______________________________________________________|
#  Entry Point             : vueInstall______________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-angular2-cli.sh_______________________________________________|
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
    nvm use ${NVM_VERSION} || nvm install ${NVM_VERSION}
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

function ncuInstall() {
  groupLog "ncuInstall";
  installed=$(isNcuInstalled;);
  if [[ "${installed}" == "false" ]]
  then
    os=$(getOS;);
    ./fiddle.sh "setup" "${OS}" "ncu";
  fi
}


function isVueInstalled() {
    if [[ ! $(which create-vue;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function vueInstall() {
    groupLog "vueInstall";
    installed=$(isVueInstalled;);
    if [[ "${installed}" == "false" ]]
    then
      os=$(getOS;);
      ./fiddle.sh "setup" "${os}" "vue";
    fi
}
