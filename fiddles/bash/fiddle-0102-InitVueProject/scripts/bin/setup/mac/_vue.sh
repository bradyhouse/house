#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/30/2023______________________________________________________________|
#  Description             : MASTER VUE CLI INSTALL SCRIPT FOR MAC MACHINES__________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHAVueELOG @ 723-add-vuejs-support
# ---------------------------------------------------------------------------------------------------|


function uninstallVue() {
  groupLog "uninstallVue";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm uninstall -g create-vue;
  else
    return 1;
  fi
}

function installVue() {
  groupLog "installVue";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install -g create-vue;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    uninstallVue || exit $?;
    installVue || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0) endLog "Done.";
       echo -e "Vue CLI installed successfully.";
        ;;
    *) endLog "foo-bar! SomethiVue went wroVue."
        ;;
  esac
  #finally
  echo ${_rc};
}

