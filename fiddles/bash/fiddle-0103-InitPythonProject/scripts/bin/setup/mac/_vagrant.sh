#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/21/2018______________________________________________________________|
#  Description             : MASTER VAGRANT SETUP SCRIPT FOR MAC OS__________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 262_add_chef_setup
# ---------------------------------------------------------------------------------------------------|

function installVagrant() {
  groupLog "installVagrant";
  installed=$(isInstalled "vagrant";);
  if [[ "${installed}" == "false" ]]
  then
    brew cask install vagrant;
  fi
}

function installVagrantManager() {
  groupLog "installVagrantManager";
  installed=$(isInstalled "VBoxManage";);
  if [[ "${installed}" == "false" ]]
  then
    brew cask install vagrant-manager;
  fi
}

function install() {
  groupLog "install";
  #try
  (
   installVagrant || exit $?;
   installVagrantManager || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ Vagrant & Vagrant Manager installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  return ${_rc}
}
