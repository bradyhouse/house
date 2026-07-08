#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 12/11/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/COMPASS DIRECTORY____|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201611280420
# ---------------------------------------------------------------------------------------------------|

function isCompassInstalled() {
  installed=$(isInstalled "compass";);
  if [[ "${installed}" == "false" ]]
  then
      exit -1;
  fi
}

function create() {
  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit
  fi

  fiddleSubDir="compass"
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate}

  #try
  (
      isCompassInstalled || exit 5;
      $(cp -rf "../fiddles/${fiddleSubDir}/template" "../fiddles/${fiddleSubDir}/$1") || exit 1
      $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/index.html";) || exit 2
      $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "../fiddles/${fiddleSubDir}/$1/index.html";) || exit 2
      $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 3
      $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 3
      cd "../fiddles/${fiddleSubDir}/$1"
      mkdir resources
      compass create --sass-dir "sass" --css-dir "css" --javascripts-dir "js" --images-dir "img"
  )
  #catch
  rc=$?
  case ${rc} in
      0)  echo "Done. The \"../fiddles/${fiddleSubDir}/$1\" directory has been initialized."
          ;;
      1)  echo "foo bar! failed to create the \"../fiddles/${fiddleSubDir}/$1\" directory."
          ;;
      2)  echo "foo bar! failed trying to update the \"../fiddles/${fiddleSubDir}/$1/app.js\" file."
          if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
          ;;
      3)  echo "foo bar! failed trying to update the \"../fiddles/${fiddleSubDir}/$1/index.html\" file."
          if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
          ;;
      4)  echo "foo bar! failed trying to update the \"../fiddles/${fiddleSubDir}/$1/README.markdown\" file."
          if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
          ;;
      5)  echo "foo bar! compass is not installed. Run the command \"sudo gem install compass\" and try again.";
          ;;
      *)  echo "foo bar! Something went wrong."
          if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
          ;;
  esac
  #finally
  exit ${rc}

}


