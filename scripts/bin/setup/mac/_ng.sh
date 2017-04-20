#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER ANGULAR2 CLI INSTALL SCRIPT FOR MAC MACHINES_____________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201703100420
# ---------------------------------------------------------------------------------------------------|

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
    installNg || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0) endLog "Done. Angular2 CLI installed successfully."
        ;;
    *) endLog "foo-bar! Something went wrong."
        ;;
  esac
  #finally
  exit ${_rc}
}

