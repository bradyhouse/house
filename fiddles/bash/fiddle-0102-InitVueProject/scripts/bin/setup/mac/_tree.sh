#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/21/2018______________________________________________________________|
#  Description             : MASTER TREE SETUP SCRIPT FOR MAC OS_____________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 262_add_chef_setup
# ---------------------------------------------------------------------------------------------------|

function installTree() {
  groupLog "installTree";
  installed=$(isInstalled "tree";);
  if [[ "${installed}" == "false" ]]
  then
    brew install tree;
  fi
}

function install() {
  groupLog "install";
  #try
  (
   installTree || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ Tree installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  return ${_rc};
}
