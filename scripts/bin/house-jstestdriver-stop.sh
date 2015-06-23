#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 06/21/2015______________________________________________________________|
#  Description             : UTILITY USED TO STOP JSTESTDRIVER STARTED ON PORT 4224__________________|
#  Command line Arguments  : $1 - port number (default 4224)_________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201506210420
# ---------------------------------------------------------------------------------------------------|

_port=4224
if [ "$#" -eq 1 ]; then _port=$1; fi
_pid=$(lsof -i:${_port} -t || echo '-1')  # Capture Process Id

#try
(
  # Verify pid found
  if [[ ${_pid} -eq "-1" ]]; then exit 0; fi

  # Kill the process
  $(lsof -i:${_port} -t | xargs kill;) || exit 86

)
#catch
_rc=$?
case ${_rc} in
    0)  echo "jsTestDriver on port ${_port} ~ is dead."
        ;;
    86) echo "FUBAR ~ Attempt to kill Pid = ${_pid} failed."
        ;;
    *)  echo "An unknown error has occurred. Haaa-Ha! You Win :)"
        ;;
esac
#bubble up (re-throw)
exit ${_rc}

