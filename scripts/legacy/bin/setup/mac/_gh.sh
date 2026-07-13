#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER GITHUB TERMINAL TOOLS INSTALL SCRIPT FOR MAC MACHINES____________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201703100420
# ---------------------------------------------------------------------------------------------------|

function installGh() {
  groupLog "installGh";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install -g gh;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    installGh || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0) endLog "Done. Github terminal tools installed successfully."
        ;;
    *) endLog "foo-bar! Something went wrong."
        ;;
  esac
  #finally
  echo ${_rc}
}

