#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 09/12/2024______________________________________________________________|
#  Description             : MASTER COMPASS SETUP SCRIPT FOR MAC OS__________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 2147-fiddlesh-cleanup-maintenance
# ---------------------------------------------------------------------------------------------------|


function installCompass() {
  groupLog "installCompass";
  installed=$(isInstalled "compass";);
  if [[ "${installed}" == "false" ]]
  then
    sudo gem update --system;
    sudo gem install compass;
  fi
}



function install() {
  groupLog "install";
  #try
  (
   installCompass || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ Compass installed successfully.";
          ;;
      *)  endLog "foo bar! Something went wrong.";
          ;;
  esac
  #finally
  return ${_rc};
}
