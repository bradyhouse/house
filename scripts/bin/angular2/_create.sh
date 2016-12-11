#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 12/11/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/ANGULAR DIRECTORY____|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201611280420
# ---------------------------------------------------------------------------------------------------|


function catch() {
    case $1 in
        0)  echo "Done. The \"../fiddles/${fiddleSubDir}/${fiddleName}\" directory has been initialized."
            ;;
        1)  echo "foo bar! failed to create the \"../fiddles/${fiddleSubDir}/${fiddleName}\" directory."
            ;;
        2)  echo "foo bar! failed trying to update the ../fiddles/${fiddleSubDir}/${fiddleName}/index.html file."
            if [[ -d "../fiddles/${fiddleSubDir}/${fiddleName}" ]]; then rm -R "../fiddles/${fiddleSubDir}/${fiddleName}"; fi
            ;;
        3)  echo "foo bar! failed trying to update the ../fiddles/${_fiddleSubDir}/${fiddleName}/README.markdown file."
            if [[ -d "../fiddles/${fiddleSubDir}/${fiddleName}" ]]; then rm -R "../fiddles/${fiddleSubDir}/${fiddleName}"; fi
            ;;
        4)  echo "foo bar! failed trying to update the ../fiddles/${_fiddleSubDir}/${fiddleName}/package.json file."
            if [[ -d "../fiddles/${fiddleSubDir}/${fiddleName}" ]]; then rm -R "../fiddles/${fiddleSubDir}/${fiddleName}"; fi
            ;;
        *)  echo "foo bar! Something went wrong."
            if [[ -d "../fiddles/${fiddleSubDir}/${fiddleName}" ]]; then rm -R "../fiddles/${fiddleSubDir}/${fiddleName}"; fi
            ;;
    esac
    exit $1
}

function create() {
  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit 59
  fi

  clear;
  echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
  echo "Bash version ${BASH_VERSION}..."

  fiddleName=$1;
  fiddleSubDir="angular2";
  fiddleTemplateDir="../fiddles/angular2/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};

  # try
  (
      if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
      $(cp -rf "../fiddles/${fiddleSubDir}/template" "../fiddles/${fiddleSubDir}/$1") || exit 1
      $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/index.html";) || exit 2
      $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/app/meta.ts";) || exit 2
      $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 3
      $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 3
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}
