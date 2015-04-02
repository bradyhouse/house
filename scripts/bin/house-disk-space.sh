#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bedlington.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 04/01/2015______________________________________________________________|
#  Description             : UTILITY USED TO DISPLAY AVAILABLE DISK SPACE GIVEN THE DISK NAME________|
#  Command line Arguments  : $1 = DISK NAME FOR EXAMPLE ON MAC, "disk1"______________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# ---------------------------------------------------------------------------------------------------|
clear
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
freeDiskSpace=''
diskName=$1

#try
(
    if [ "$#" -ne 1 ]; then exit 86; fi
    freeDiskSpace=`df -H | grep ${diskName} | awk '{print $4}'`
    echo "You have ${freeDiskSpace} of available diskspace"
)
#catch
rc=$?
case ${rc} in
    0)  echo ""
        ;;
    86) echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[d]\""
        echo ""
        echo "[d] - name of the disk "
        echo ""
        echo ""
        exit
        ;;
    *)  echo "An unknown error has occurred. Ha! Ha!"
        ;;
esac
#finally
exit ${rc}