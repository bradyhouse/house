#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/21/2018______________________________________________________________|
#  Description             : MASTER CHEF DELETE FUNCTION_____________________________________________|
#  Entry Point             : destroy_________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-delete.sh_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 262_add_chef_setup
# ---------------------------------------------------------------------------------------------------|

function deleteFiddle() {
   groupLog "deleteFiddle"
   _curDir=$(pwd;);
   if [[ ! $(which kitchen;) ]]
   then
        rm -rf "$1" || exit $?;
   else
        cd "$1" || exit $?;
        kitchen destroy || exit $?;
        cd ${_curDir} || exit $?;
        rm -rf "$1" || exit $?;
   fi
}


function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" delete.";
            ;;
        *)  endLog "fubar! Something went wrong.";
            ;;
    esac
    exit $1
}

function destroy() {
  if [[ "$#" -ne 1 ]]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the fiddle to be deleted"
        exit 59
  fi

  # try
  (
      deleteFiddle $1 || exit $?;
  )
  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};



}


