#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 07/27/2018______________________________________________________________|
#  Description             : MASTER COMMAND LINE SETUP FUNCTIONS LIB_________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 234_add_bash_setup
# ---------------------------------------------------------------------------------------------------|


function isZshrc() {
  _homeDir=${HOME_ROOT};
  _actual=$(fileContains "${_homeDir}/.zshrc" "FIDDLE.SH";);
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
  _actual=$(fileContains "${_homeDir}/.bash_profile" "FIDDLE.SH";);
  _expected="1";
  if [[ "${_actual}" != "${_expected}" ]]
  then
    echo 0;
  else
    echo 1;
  fi
}

function updateZshrc() {
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
      echo -e "### FIDDLE.SH ####" >> .zshrc;
      echo -e "\n" >> .zshrc;
      echo -e "function fiddle() {" >> .zshrc;
      echo -e "\t _location=\$(pwd;);" >> .zshrc;
      echo -e "\t cd ${_gitRepoPath};" >>.zshrc;
      echo -e "\t ./fiddle.sh \"\$@\";" >> .zshrc;
      echo -e "\t cd \${_location};" >> .zshrc;
      echo -e "}" >> .zshrc;
      echo -e "\n" >> .zshrc;
      cd ${_gitRepoPath};

    fi
  fi
}

function updateBashProfile() {
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
      echo -e "### FIDDLE.SH ####" >> .bash_profile;
      echo -e "\n" >> .bash_profile;
      echo -e "function fiddle() {" >> .bash_profile;
      echo -e "\t _location=\$(pwd;);" >> .bash_profile;
      echo -e "\t cd ${_gitRepoPath}/scripts;" >>.bash_profile;
      echo -e "\t ./fiddle.sh \"\$@\";" >> .bash_profile;
      echo -e "\t cd \${_location};" >> .bash_profile;
      echo -e "}" >> .bash_profile;
      echo -e "\n" >> .bash_profile;
      cd ${_gitRepoPath};
    fi
  fi
}


function install() {
  groupLog "install";
  #try
  (
    updateZshrc || exit $?;
    updateBashProfile || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ bash installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}
