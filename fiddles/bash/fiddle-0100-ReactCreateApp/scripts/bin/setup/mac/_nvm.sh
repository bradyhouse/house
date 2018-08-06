#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER NODE VERSION MANAGER INSTALL SCRIPT FOR MAC OS___________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201702110420
# ---------------------------------------------------------------------------------------------------|

function installNvm() {
    groupLog "installNvm";
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash;
}


function install() {
  groupLog "install";
  #try
  (
    installNvm || exit 1;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  echo "Done ~ nvm installed successfully."
          ;;
      *)  echo "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}
