#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/PHP DIRECTORY________|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# ---------------------------------------------------------------------------------------------------|
thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'

if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 
fi
#try
(
     if [[ -d "../fiddles/php/$1" ]]; then rm -R "../fiddles/php/$1"; fi
     cp -rf "../fiddles/php/template" "../fiddles/php/$1" || exit 1
     $(cd bin; ./house-substr.sh '{{FiddleName}}' $1 "../../fiddles/php/$1/index.php" > app.tmp; mv app.tmp "../../fiddles/php/$1/index.php") || exit 2
     $(cd bin; ./house-substr.sh '{{FiddleName}}' $1 "../../fiddles/php/$1/README.markdown" > README.tmp; mv README.tmp "../../fiddles/php/$1/README.markdown") || exit 3
)
#catch
rc=$?
case ${rc} in
    0)  echo "Done. The \"../fiddles/php/$1\" directory has been initialized."
        ;;
    1)  echo "fubar! failed to create the ../fiddles/php/$1 directory."
        ;;
    2)  echo "fubar! failed trying to update the ../fiddles/php/$1/index.php file."
	if [[ -d "../fiddles/php/$1" ]]; then rm -R "../fiddles/php/$1"; fi
	    ;;
    3)  echo "fubar! failed trying to update the ../fiddles/php/$1/README.markdown file."
        if [[ -d "../fiddles/php/$1" ]]; then rm -R "../fiddles/php/$1"; fi
        ;;
    *)  echo "fubar! Something went wrong."
        if [[ -d "../fiddles/php/$1" ]]; then rm -R "../fiddles/php/$1"; fi
        ;;
esac
#finally
exit ${rc}




