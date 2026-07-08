#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/21/2018______________________________________________________________|
#  Description             : MASTER VIRTUALBOX SCRIPT FOR MAC OS_____________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 262_add_chef_setup
# 09/12/2024 - See CHANGELOG @ 2147-fiddlesh-cleanup-maintenance
# ---------------------------------------------------------------------------------------------------|

function installVirtualBox() {
  groupLog "installVirtualBox";
  installed=$(isInstalled "virtualbox";);

  if [[ "${installed}" == "false" ]]
  then
      if is64Bit; then 
        arch -arm64 brew install virtualbox --cask;
      else 
        brew install virtualbox --cask;
      fi
  fi
  return $?;
}


function install() {
  groupLog "install";
  #try
  (
   installVirtualBox || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ VirtualBox installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  return ${_rc}
}
