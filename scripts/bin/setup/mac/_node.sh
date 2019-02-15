#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER NODE INSTALL SCRIPT FOR MAC OS________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201702110420
# ---------------------------------------------------------------------------------------------------|

function installNode() {
  groupLog "installNode";
  nvm current;
  installed=$(nvm current);
  if [[ "${installed}" ]]
  then
    nvm install stable;
  else
    return 1;
  fi


}

function npmDisableStrictSsl() {
  groupLog "npmDisableStrictSsl";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm config set strict-ssl false;
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    $(installNode;) || exit $?;
    $(npmDisableStrictSsl;) || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0)  echo "Done. node and npm installed successfully."
        ;;
    *)  echo "foo bar! Something went wrong."
        ;;
  esac
  #finally
  exit ${_rc}
}
