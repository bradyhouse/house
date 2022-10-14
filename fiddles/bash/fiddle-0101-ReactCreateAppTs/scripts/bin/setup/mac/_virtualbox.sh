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
# ---------------------------------------------------------------------------------------------------|

function installVirtualBox() {
  groupLog "installVirtualBox";
  installed=$(isInstalled "virtualbox";);
  if [[ "${installed}" == "false" ]]
  then
    brew cask install virtualbox;
  fi
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
