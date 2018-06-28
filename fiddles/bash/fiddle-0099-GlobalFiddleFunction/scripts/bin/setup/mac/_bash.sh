#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 06/28/2018______________________________________________________________|
#  Description             : MASTER COMMAND LINE SETUP FUNCTIONS LIB_________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 232_bash_fiddle_99
# ---------------------------------------------------------------------------------------------------|


function isZshrc() {
  _homeDir=$(cd home; pwd;);
  _actual=$(fileContains "${_homeDir}/.zshrc" "FIDDLE.SH";);
  _expected=0;
  if [[ "${_actual}" != "${_expected}" ]]
  then
    echo 1;
  fi
}

function isBashProfile() {
  _homeDir=$(cd home; pwd;);
  actual=$(fileContains "${_homeDir}/.bash_profile" "FIDDLE.SH";);
  expected=0;
  if [[ "${actual}" != "${expected}" ]]
  then
    echo 1;
  fi
}

function updateZshrc() {
  _gitRepoPath=$(pwd;);
  _homeDir=$(cd home ~; pwd;);
  _bckSuffix=$(date +%s);
  _isUpdated=$(isZshrc;);

  if [[ "${_isUpdated}" != "0" ]]
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
      echo -e "\t cd ${_gitRepoPath}/scripts;" >>.zshrc;
      echo -e "\t ./fiddle.sh \"\$@\";" >> .zshrc;
      echo -e "\t cd \${_location};" >> .zshrc;
      echo -e "}" >> .zshrc;
      echo -e "\n" >> .zshrc;

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
