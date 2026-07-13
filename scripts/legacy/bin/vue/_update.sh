#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/30/2023______________________________________________________________|
#  Description             : MASTER VUE UPDATE FUNCTION______________________________________________|
#  Entry Point             : update__________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-update.sh_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# BASELINE VERSION - See CHANGELOG @ 723-add-vuejs-support
# ---------------------------------------------------------------------------------------------------|

function rmNodeModules() {
  groupLog "rmNodeModules";
  if [[ -d "node_modules" ]]
  then
    rm -rf node_modules;
  fi
}

function rmPackageLock() {
  groupLog "rmPackageLock";
  if [[ -f "package-lock.json" ]]
  then
    rm -rf package-lock.json;
  fi
}

function npmCheckUpdates() {
  groupLog "npmCheckUpdates";
  ncu -u;
}

function catch() {
  case $1 in
      0)  endLog "Update complete.";
          ;;
      *)  endLog "fubar! Something went wrong.";
          ;;
  esac
  return $1
}

function update() {
  groupLog "update";

  if [ "$#" -ne 1 ]
  then
    echo "Incorrect number of arguments";
    echo "Please specify the name of the fiddle";
    exit 59;
  fi

  _fiddleDir=$1;

  if [[ ! -d "${_fiddleDir}" ]]
  then
    echo "\"${_fiddleDir}\" does not exist";
    exit 59
  fi


  # try
  (
    nvmInstall || exit $?;
    ncuInstall || exit $?;
    cd ${_fiddleDir};
    rmNodeModules || exit $?;
    rmPackageLock || exit $?;
    npmCheckUpdates || exit $?;
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  return ${rc};

}
