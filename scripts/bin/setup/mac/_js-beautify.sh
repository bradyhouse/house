#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER JS-BEAUTIFY INSTALL SCRIPT FOR MAC MACHINE_______________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201703100420
# ---------------------------------------------------------------------------------------------------|

function installJsBeautify() {
  groupLog "installJsBeautify";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install -g js-beautify;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    installJsBeautify || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0)  echo "Done. js-beautify installed successfully."
        ;;
    *)  echo "foo-bar! Something went wrong."
        ;;
  esac
  #finally
  exit ${_rc}
}

