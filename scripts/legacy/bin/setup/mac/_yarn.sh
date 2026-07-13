#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/15/2017______________________________________________________________|
#  Description             : MASTER YARN SETUP SCRIPT FOR MAC OS_____________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201702110420
# ---------------------------------------------------------------------------------------------------|


function installYarn() {
  groupLog "installYarn";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install -g yarn;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    installYarn || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0)  echo "Done. yarn installed successfully."
        ;;
    *)  echo "foo bar! Something went wrong."
        ;;
  esac
  #finally
  exit ${_rc}
}
