#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO STOP A NODE.JS FILE SERVER ON PORT 8889_________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# 04/09/2015 - CHANGELOG.MARKDOWN ~ 201504091810
# ---------------------------------------------------------------------------------------------------|

_port=8889
if [ "$#" -eq 1 ]; then _port=$1; fi
_pid=$(lsof -i:${_port} -t || echo '-1')  # Capture Process Id

#try
(
  # Verify pid found
  if [[ ${_pid} -eq "-1" ]]; then exit 0; fi

  # Kill the process
  $(lsof -i:${_port} -t | xargs kill;) || exit 86

  e

)
#catch
_rc=$?
case ${_rc} in
    0)  echo "http://localhost:${_port} ~ is dead."
        ;;
    86) echo "FUBAR ~ Attempt to kill Pid = ${_pid} failed."
        ;;
    *)  echo "An unknown error has occurred. Haaa-Ha! You Win :)"
        ;;
esac
#bubble up (re-throw)
exit ${_rc}

