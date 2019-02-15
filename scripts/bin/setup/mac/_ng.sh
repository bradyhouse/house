#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create dat=e             : 02/11/2017_____________________________________________________________|
#  Description             : MASTER ANGULAR2 CLI INSTALL SCRIPT FOR MAC MACHINES_____________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201703100420
# ---------------------------------------------------------------------------------------------------|

function configNg() {
  groupLog "configNg";
  ng set --global warnings.versionMismatch=false;
}

function uninstallNg() {
  groupLog "uninstallNg";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm uninstall -g @angular/cli;
  else
    return 1;
  fi
}

function installNg() {
  groupLog "installNg";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install -g @angular/cli;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    uninstallNg || exit $?;
    installNg || exit $?;
    configNg || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0) endLog "Done.";
       echo -e "Angular2 CLI installed successfully.";
        ;;
    *) endLog "foo-bar! Something went wrong."
        ;;
  esac
  #finally
  echo ${_rc};
}

