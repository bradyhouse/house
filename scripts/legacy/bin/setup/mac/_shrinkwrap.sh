#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/26/2018______________________________________________________________|
#  Description             : MASTER SHRINKWRAP SETUP SCRIPT FOR DARWIN_______________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 230_update_and_shrinkwrap
# ---------------------------------------------------------------------------------------------------|


function installShrinkwrap() {
  groupLog "iinstallShrinkwrap";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install -g shrinkwrap;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    installShrinkwrap || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0)  echo "Done. shrinkwrap installed successfully."
        ;;
    *)  echo "foo bar! Something went wrong."
        ;;
  esac
  #finally
  exit ${_rc}
}
