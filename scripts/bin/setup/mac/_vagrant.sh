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
# 09/12/2024 - See CHANGELOG @ 2147-fiddlesh-cleanup-maintenance
# ---------------------------------------------------------------------------------------------------|

function installVagrant() {
  groupLog "installVagrant";
  installed=$(isInstalled "vagrant";);
  isArm64=$(is64Bit);

  if [[ "${installed}" == "false" ]]
  then
      if [[ ${isArm64} ]]
      then 
        arch -arm64 brew install vagrant --cask;
      else 
        brew install vagrant --cask;
      fi
  fi
  return $?;
}

function installVagrantManager() {
  groupLog "installVagrantManager";
  installed=$(brew list | grep vagrant-manager;);
  isArm64=$(is64Bit);

  if [[ "${installed}" != *"vagrant-manager"* ]]
  then
      if [[ ${isArm64} ]]
      then 
        arch -arm64 brew install vagrant-manager --cask;
      else 
        brew install vagrant-manager --cask;
      fi
  fi
  return $?;
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
