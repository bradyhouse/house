#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 09/12/2024______________________________________________________________|
#  Description             : MASTER SENCHA SETUP SCRIPT FOR MAC OS___________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 2147-fiddlesh-cleanup-maintenance
# ---------------------------------------------------------------------------------------------------|

function installSencha() {
  groupLog "installSencha";
  installed=$(isInstalled "sencha";);

  if [[ "${installed}" == "false" ]]
  then
      if is64Bit; then
        arch -arm64 brew install sencha --cask;
      else 
        brew install sencha --cask;
      fi
  fi
}

function testSencha() {
  groupLog "testSencha";
  sencha which;
}

function install() {
  groupLog "install";
  #try
  (
   installSencha || exit $?;
   testSencha || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ Sencha Cmd installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  return ${_rc};
}
