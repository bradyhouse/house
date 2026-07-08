#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO TEST AN EXISTING NODE FIDDLE____________________________|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201704170420
# ---------------------------------------------------------------------------------------------------|

function test() {
  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit 59
  fi

  fiddleSubDir="node"
  bornOnDate=$(date +"%m-%d-%y";)

  echo ${bornOnDate}

  #try
  (
       cd "../fiddles/${fiddleSubDir}/$1"
      npm test || exit 1;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog ""
          ;;
      1)  endLog "foo bar! failed trying to run npm test."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}
