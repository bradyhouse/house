#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 12/11/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/TWEEN DIRECTORY______|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201611280420
# ---------------------------------------------------------------------------------------------------|

function create() {
  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit
  fi

  fiddleSubDir="tween"
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate}

  #try
  (
      if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
      $(cp -rf "../fiddles/${fiddleSubDir}/template" "../fiddles/${fiddleSubDir}/$1") || exit 1
      $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/app.js";) || exit 2
      $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "../fiddles/${fiddleSubDir}/$1/app.js";) || exit 2
      $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/index.html";) || exit 2
      $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "../fiddles/${fiddleSubDir}/$1/index.html";) || exit 2
      $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 3
      $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 3
  )
  #catch
  case $? in
      0)  echo "Done. The \"../fiddles/${fiddleSubDir}/$1\" directory has been initialized."
          ;;
      1)  echo "foo bar! failed to create the ../fiddles/${fiddleSubDir}/$1 directory."
          ;;
      2)  echo "foo bar! failed trying to update the ../fiddles/${fiddleSubDir}/$1/app.js file."
    if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
        ;;
      3)  echo "foo bar! failed trying to update the ../fiddles/extjs/$1/index.html file."
          if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
          ;;
      4)  echo "foo bar! failed trying to update the ../fiddles/extjs/$1/README.markdown file."
          if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
          ;;
      *)  echo "foo bar! Something went wrong."
          if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
          ;;
  esac
  #finally
  exit $?

}
