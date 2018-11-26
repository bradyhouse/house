#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/21/2018______________________________________________________________|
#  Description             : MASTER CHEF INSTALL SCRIPT FOR MAC OS___________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 262_add_chef_setup
# ---------------------------------------------------------------------------------------------------|

function installChef() {
  groupLog "installChef";
  installed=$(isInstalled "chef";);
  if [[ "${installed}" == "false" ]]
  then
      brew cask install chef/chef/chefdk;
  fi
}

function isZshrc() {
  _homeDir=${HOME_ROOT};
  _actual=$(fileContains "${_homeDir}/.zshrc" "CHEF";);
  _expected="1";
  if [[ "${_actual}" != "${_expected}" ]]
  then
    echo 0;
  else
    echo 1;
  fi
}

function isBashProfile() {
  _homeDir=${HOME_ROOT};
  _actual=$(fileContains "${_homeDir}/.bash_profile" "CHEF";);
  _expected="1";
  if [[ "${_actual}" != "${_expected}" ]]
  then
    echo 0;
  else
    echo 1;
  fi
}


function updateZshrc() {
  groupLog "updateZshrc";
  _gitRepoPath=$(pwd;);
  _homeDir=${HOME_ROOT};
  _bckSuffix=$(date +%s);
  _isUpdated=$(isZshrc;);
  if (( ${_isUpdated} == 1 ))
  then
    cd ${_homeDir};
    if [[ -e ".zshrc" ]]
    then
      cp -rf .zshrc ".zshrc-${_bckSuffix}";
      echo -e "\n" >> .zshrc;
      echo -e "### CHEF ####" >> .zshrc;
      echo -e 'eval "$(chef shell-init bash)"' >> .zshrc
      echo -e "\n" >> .zshrc;
      cd ${_gitRepoPath};
    fi
  fi
}

function updateBashProfile() {
  groupLog "updateBashProfile";
  _gitRepoPath=$(cd ..; pwd;);
  _homeDir=${HOME_ROOT};
  _bckSuffix=$(date +%s);
  _isUpdated=$(isBashProfile;);
  if (( ${_isUpdated} == 1 ))
  then
    cd ${_homeDir};
    if [[ -e ".bash_profile" ]]
    then
      cp -rf .bash_profile ".bash_profile-${_bckSuffix}";
      echo -e "\n" >> .bash_profile;
      echo -e "### CHEF ####" >> .bash_profile;
      echo -e 'eval "$(chef shell-init bash)"' >> .bash_profile
      echo -e "\n" >> .bash_profile;
      cd ${_gitRepoPath};
    fi
  fi
}

function install() {
  groupLog "install";
  #try
  (
   installChef || exit $?;
   updateZshrc || exit $?;
   updateBashProfile || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ Chef installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  return ${_rc}
}
