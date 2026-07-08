#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 12/11/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/BASH DIRECTORY_______|
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

  fiddleSubDir="bash"
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate}

  #try
  (
      if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
      $(cp -rf "../fiddles/${fiddleSubDir}/template" "../fiddles/${fiddleSubDir}/$1") || exit 1;
      $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 2;
      $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 2;
      $(sudo chmod -R 775 "../fiddles/${fiddleSubDir}/$1";) || exit 3;
  )
  #catch
  rc=$?
  case ${rc} in
      0)  endLog "Done. The \"../fiddles/${fiddleSubDir}/$1\" directory has been initialized."
          ;;
      1)  endLog "foo bar! failed to create the \"../fiddles/${fiddleSubDir}/$1\" directory."
          ;;
      2)  endLog "foo bar! failed trying to update the \"../fiddles/${fiddleSubDir}/$1/README.markdown\" file."
        if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
        ;;
    3)  endLog "Failed while trying to set permissions on \"../fiddles/${fiddleSubDir}/$1/\".";
        ;;
      *)  echo "foo bar! Something went wrong."
          if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
          ;;
  esac
  #finally
  exit ${rc}


}
