#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER NATIVESCRIPT INSTALL SCRIPT FOR MAC MACHINE______________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201703100420
# ---------------------------------------------------------------------------------------------------|

function installNativeScript() {
  groupLog "installNativeScript";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install -g nativescript;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    installNativeScript || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0) endLog "Done. nativeScript installed successfully."
        ;;
    *) endLog "foo-bar! Something went wrong."
        ;;
  esac
  #finally
  echo ${_rc};
}

