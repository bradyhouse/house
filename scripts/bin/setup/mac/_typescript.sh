#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER TYPESCRIPT INSTALL SCRIPT FOR MAC MACHINE________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201704170420
# ---------------------------------------------------------------------------------------------------|

function installTypeScript() {
  groupLog "installTypeScript";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install -g typescript;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    installTypeScript || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0) endLog "Done. typeScript installed successfully."
        ;;
    *) endLog "foo-bar! Something went wrong."
        ;;
  esac
  #finally
  return ${_rc};
}

