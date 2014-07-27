#!/bin/bash
echo "$0"
#
## VERIFY THE INPUT ARGUMENTS
#
if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo " "
      exit 
fi
cd ~/github/house/fiddles
cp -rf template $1
cd $1
cp ../fiddleGMap/README.markdown README.markdown
echo "boiler plate pieces for the \"$1\" fiddle have been added to the ~/github/house/fiddles directory."



