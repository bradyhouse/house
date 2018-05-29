#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/26/2018______________________________________________________________|
#  Description             : MASTER NPM-CHECK-UPDATES SETUP SCRIPT FOR DARWIN________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 230_update_and_shrinkwrap
# ---------------------------------------------------------------------------------------------------|


function installNpmCheckUpdates() {
  groupLog "iinstallNpmCheckUpdates";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install -g npm-check-updates;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    installNpmCheckUpdates || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0)  echo "Done. npm-check-updates installed successfully."
        ;;
    *)  echo "foo bar! Something went wrong."
        ;;
  esac
  #finally
  exit ${_rc}
}
