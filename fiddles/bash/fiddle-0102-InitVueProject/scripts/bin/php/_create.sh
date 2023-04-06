#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 12/11/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/PHP DIRECTORY________|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201611280420
# ---------------------------------------------------------------------------------------------------|

function create() {
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
       $(voidSubstr '{{FiddleName}}' $1 "../fiddles/php/$1/index.php";) || exit 2
       $(voidSubstr '{{FiddleName}}' $1 "../fiddles/php/$1/README.markdown";) || exit 3
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
}
