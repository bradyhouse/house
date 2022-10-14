#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/26/2018______________________________________________________________|
#  Description             : MASTER ELECTRON UPDATE FUNCTION_________________________________________|
#  Entry Point             : update__________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-update.sh_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# BASELINE VERSION - See CHANGELOG @ 230_update_and_shrinkwrap
# ---------------------------------------------------------------------------------------------------|

function nvmInstall() {
  groupLog "nvmInstall";
  if [[ -d ${NVM_DIR} ]]
  then
    source ${NVM_DIR}/nvm.sh;
    nvm install ${NVM_VERSION};
  else
    exit 3;
  fi
}

function isNcuInstalled() {
  if [[ ! $(which ncu;) ]]
  then
      echo "false";
  else
      echo "true";
  fi
}

function ncuInstall() {
  groupLog "ncuInstall";
  installed=$(isNcuInstalled;);
  if [[ "${installed}" == "false" ]]
  then
    os=$(getOS;);
    ./fiddle.sh "setup" "${os}" "ncu";
  fi
}

function shrinkWrapInstall() {
  groupLog "shrinkWrapInstall";
  installed=$(isNcuInstalled;);
  os=$(getOS;);
  ./fiddle.sh "setup" "${OS}" "shrinkwrap";
}

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


function npmShrinkWrap() {
  groupLog "npmShrinkWrap";

  if [[ -e "npm-shrinkwrap.json" ]]
  then
    rm -rf "npm-shrinkwrap.json";
  fi
  npm shrinkwrap;
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
    shrinkWrapInstall || exit $?;
    cd ${_fiddleDir};
    rmNodeModules || exit $?;
    rmPackageLock || exit $?;
    npmCheckUpdates || exit $?;
    npmShrinkWrap || exit $?;
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  return ${rc};

}
