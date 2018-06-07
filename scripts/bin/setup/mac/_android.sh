#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER ANDROID INSTALL SCRIPT FOR MAC MACHINES__________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201702110420
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# ---------------------------------------------------------------------------------------------------|

function brewTapCaskRoom() {
  groupLog "brewTapCaskRoom";
  brew tap caskroom/cask;
}


function installAndroid() {
  groupLog "installAndroid";
  brew cask install android-sdk;
}

function updateBashProfile() {
  groupLog "updateBashProfile";
  if [[ ! -d "${ANDROID_HOME}" ]]
  then
    if [[ -e "${BASH_PROFILE}" ]]
    then
        cp -rf "${BASH_PROFILE}" "${BASH_PROFILE}.bck"
        echo -e " " >> ${BASH_PROFILE}
        echo -e "### ANDROID" >> ${BASH_PROFILE};
        echo -e "export ANDROID_HOME=/usr/local/share/android-sdk" >> ${BASH_PROFILE};
        echo -e " " >> ${BASH_PROFILE};
    fi
  fi
}

function updateZshrcProfile() {
  groupLog "updateBashProfile";
  if [[ ! -d "${ANDROID_HOME}" ]]
  then
    if [[ -e "${ZSH_PROFILE}" ]]
    then
        cp -rf "${ZSH_PROFILE}" "${ZSH_PROFILE}.bck"
        echo -e " " >> ${ZSH_PROFILE}
        echo -e "### ANDROID" >> ${ZSH_PROFILE};
        echo -e "export ANDROID_HOME=/usr/local/share/android-sdk" >> ${ZSH_PROFILE};
        echo -e " " >> ${ZSH_PROFILE};
    fi
  fi
}

function install() {
  groupLog "install";
  #try
  (
    brewTapCaskRoom || exit $?;
    installAndroid || exit $?;
    updateBashProfile || exit $?;
    updateZshrcProfile || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ android installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}





