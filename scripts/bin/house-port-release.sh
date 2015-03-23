#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bedlington.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO STOP A THREAD GIVEN A SPECIFIC PORT NUMBER______________|
#  Command line Arguments  : $1 = PORT NUMBER________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# ---------------------------------------------------------------------------------------------------|
clear
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
portNumber=$(echo $1;)
#try
(
    if [[ $# -ne "1" ]]; then exit 86; fi
    pid=$(lsof -i:${portNumber} -t || echo '-1')  # Capture Process Id
    # Verify pid found
    if [[ "${pid}" -eq "-1" ]]; then exit 0; fi
    # Kill the process
    $(lsof -i:${portNumber} -t | xargs kill;) || exit 87
)
#catch
rc=$?
case ${rc} in
    0)  echo ""
        echo "port number \"${portNumber}\" is free."
        echo ""
        ;;
    86) echo ""
        echo "Port release utility"
        echo ""
        echo "Usage:"
        echo ""
        echo "       $0 [p]"
        echo ""
        echo "       [p] - Port number"
        echo ""
        ;;
    87) echo "Fubar ~ There is no thread attached to port number \"${portNumber}\""
        ;;
    *)  echo "Fubar ~ An unknown error has occurred. Ha! Ha!"
        ;;
esac
#finally
exit ${rc}