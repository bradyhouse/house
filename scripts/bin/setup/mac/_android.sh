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
# ---------------------------------------------------------------------------------------------------|

function installAndroid() {
    groupLog "installBrew";
    cd  ${HOME_ROOT};
    if [[ -d "homebrew" ]]; then exit 1; fi
    mkdir homebrew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C homebrew;
}

function updateBashProfile() {
  groupLog "updateBashProfile";
  if [[ ! -e "${BASH_PROFILE}" ]]; then exit 2; fi
  echo -e " " >> ${BASH_PROFILE}
  echo -e "### homebrew" >> ${BASH_PROFILE};
  echo -e "export PATH=\"${HOME_ROOT}/homebrew:\$PATH\"" >> ${BASH_PROFILE};
  echo -e "export PATH=\"${HOME_ROOT}/homebrew/bin:\$PATH\"" >> ${BASH_PROFILE};
  echo -e " " >> ${BASH_PROFILE};
}

function install() {
  #try
  (
    installAndroid || exit $?;
    updateBashProfile || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  echo "Done. homebrew installed successfully."
          ;;
      1)  echo "${HOME_ROOT}/homebrew already exists.";
          ;;
      2)  echo "${BASH_PROFILE} does not exist and could not be updated.";
          ;;
      *)  echo "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}


