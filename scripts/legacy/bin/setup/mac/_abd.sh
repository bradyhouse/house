#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/26/2018______________________________________________________________|
#  Description             : MASTER ABD INSTALL LIB FOR MAC OS_______________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 230_update_and_shrinkwrap
# Baseline Ver - CHANGELOG @ 2147-fiddlesh-cleanup-maintenance
# ---------------------------------------------------------------------------------------------------|

function installAbd() {
  groupLog "installAbd";
  _home=$(cd ~; pwd);
  if [[ ! -d "${_home}/Library/Android/sdk/platform-tools" ]]
  then
      if is64Bit; then
        arch -arm64 brew install android-platform-tools --cask;
      else 
        brew install android-platform-tools --cask;
      fi
  fi
}

function install() {
  groupLog "install";
  #try
  (
   installAbd || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ abd installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}
