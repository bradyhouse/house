#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : http://www.linuxfromscratch.org/blfs/view/svn/postlfs/joe.html__________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER JOE EDITOR INSTALL SCRIPT FOR MAC OS_____________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201702110420
# ---------------------------------------------------------------------------------------------------|

function installJoe() {
  groupLog "installJoe";
  cd $1;
  brew install joe;
}

function install() {
  groupLog "install";
  #try
  (
   installJoe || exit 1;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ joe editor installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}
