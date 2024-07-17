#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 07/09/2024______________________________________________________________|
#  Description             : MASTER PIPENV SETUP UTILITY FOR MAC MACHINES____________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 1901_python_init
# ---------------------------------------------------------------------------------------------------|


function uninstallPipenv() {
  groupLog "uninstallPipenv";
  installed=$(isInstalled "pipenv";);
  if [[ "${installed}" == "true" ]]
  then
    brew uninstall pipenv;
  else
    return 1;
  fi
}

function installPipenv() {
  groupLog "installPipenv";
  installed=$(isInstalled "pipenv";);
  isArm64=$(is64Bit) 

  if [[ "${installed}" == "false" ]]
  then
      if [[ is64Bit ]]
      then 
        arch -arm64 brew install pipenv;
      else 
        brew install pipenv;
      fi
  else
    return 1;
  fi
}


function install() {
  groupLog "install";
  #try
  (
    uninstallPipenv || exit $?;
    installPipenv || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0) endLog "Done.";
       echo -e "Pipenv installed successfully.";
        ;;
    *) endLog "foo-bar! Something went wroVue."
        ;;
  esac
  #finally
  echo ${_rc};
}

