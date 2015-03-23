#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bedlington.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO "FORK" AN EXISTING EXTJS FIDDLE.  THIS SCRIPT WILL COPY_|
#                            THE SPECIFIED FIDDLE TO THE SPECIFIED TARGET DIRECTORY._________________|
#  Command line Arguments  : $1 = SOURCE FIDDLE DIRECTORY, $2 = TARGET (OR NEW) FIDDLE_______________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# ---------------------------------------------------------------------------------------------------|
if [ "$#" -ne 2 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the names of the \"Source\" and \"Branch\" fiddles."
      echo ""
      echo "Usage:"
      echo ""
      echo "fiddlefork.sh \"<Source fiddle Name>\" \"<Branch fiddle Name>\""
      echo ""
      exit 
fi
#try
(
     if [[ ! -d "../fiddles/extjs/$1" ]]; then exit 1; fi
     if [[ -d "../fiddles/extjs/$2" ]]; then sudo rm -R "../fiddles/extjs/$2" || exit 2; fi
     cp -rf "../fiddles/extjs/$1" "../fiddles/extjs/$2" || exit 3
     $(cd bin; ./house-substr.sh $1 $2 "../../fiddles/extjs/$2/app.js";) || exit 4
     $(cd bin; ./house-substr.sh $1 $2 "../../fiddles/extjs/$2/index.html";) || exit 5
     $(cd bin; ./house-substr.sh $1 $2 "../../fiddles/extjs/$2/README.markdown";) || exit 6
)
#catch
case $? in
    0)  echo "Done. The \"../../fiddles/extjs/$2\" directory has been initialized."
        ;;
    1)  echo "fubar! The "\source\" fiddle does not exist."
        ;;
    2)  echo "fubar! The "\branch\" fiddle cannot be overwritten."
        ;;
    3)  echo "fubar! failed to create the ../fiddles/extjs/$1 directory."
        ;;
    4)  echo "fubar! failed trying to update the ../fiddles/extjs/$2/app.js file."
	if [[ -d "../fiddles/extjs/$2" ]]; then rm -R "../fiddles/extjs/$2"; fi
	;;
    5)  echo "fubar! failed trying to update the ../fiddles/extjs/$2/index.html file."
        if [[ -d "../fiddles/extjs/$2" ]]; then rm -R "../fiddles/extjs/$2"; fi
        ;;
    6)  echo "fubar! failed trying to update the ../fiddles/extjs/$2/README.markdown file."
        if [[ -d "../fiddles/extjs/$2" ]]; then rm -R "../fiddles/extjs/$2"; fi
        ;;
    *)  echo "fubar! Something went wrong." 
        if [[ -d "../fiddles/extjs/$2" ]]; then rm -R "../fiddles/extjs/$1"; fi
        ;;
esac
#finally
    exit $?




