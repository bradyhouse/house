#!/usr/bin/env bash
clear
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

function cog() {
    queue=$1
    archive=$2
    type=$3

    echo " hello $1"
}

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


clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

function controlFunction() {
    echo " hello $1"
}

function valueFunction() {
    z=`expr $1 + 3`;
    echo ${z};
}
controlFunction;
controlFunction $(whoami;);
rc=$(valueFunction 2;);
echo "2 + 3 = ${rc}";
