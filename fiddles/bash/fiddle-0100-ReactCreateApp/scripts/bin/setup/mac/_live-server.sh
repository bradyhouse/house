#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/15/2017______________________________________________________________|
#  Description             : MASTER LIVE-SERVER SETUP SCRIPT FOR MAC OS______________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201702110420
# ---------------------------------------------------------------------------------------------------|


function installLiveServer() {
  groupLog "installLiveServer";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install -g live-server;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    installLiveServer || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0)  echo "Done. live-server installed successfully."
        ;;
    *)  echo "foo bar! Something went wrong."
        ;;
  esac
  #finally
  exit ${_rc}
}
