#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : https://secure.php.net/_________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 08/10/2018______________________________________________________________|
#  Description             : MASTER PHP INSTALL SCRIPT FOR MAC OS____________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 263_node_fiddle_29
# ---------------------------------------------------------------------------------------------------|

function installPhp() {
  groupLog "installPhp";
  brew install php --with-cgi --with-debug --with-libmysql;
}

function linkPhp() {
  groupLog "linkPhp";
  brew link php;
}

function install() {
  groupLog "install";
  #try
  (
   installPhp || exit $?;
   linkPhp || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ php installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}
