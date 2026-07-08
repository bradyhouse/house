#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW NODE FIDDLE TO THE ../FIDDLES/NODE DIRECTORY__|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201611280420
# 10/03/2019 - See CHANGELOG @ 313_node_31to40 
# ---------------------------------------------------------------------------------------------------|

function create() {
  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit 59
  fi

  fiddleSubDir="node"
  bornOnDate=$(date +"%m-%d-%y";)

  echo ${bornOnDate}

   nvmInstall || exit $?;
   shrinkWrapInstall || exit $?;

  #try
  (
      fiddleTitle=$(parseName $1;);
      groupLog "fiddle = ${fiddleTitle}";
      if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
      $(cp -rf "../fiddles/${fiddleSubDir}/template" "../fiddles/${fiddleSubDir}/$1") || exit 1;
      # Update package.json
      $(voidSubstr '{{fiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/package.json";) || exit 2;
      $(voidSubstr '{{author}}' ${AUTHOR} "../fiddles/${fiddleSubDir}/$1/package.json";) || exit 2;
      $(voidSubstr '{{githubRepo}}' ${GITHUB_REPO} "../fiddles/${fiddleSubDir}/$1/package.json";) || exit 2;
      $(voidSubstr '{{fiddleTitle}}' ${fiddleTitle} "../fiddles/${fiddleSubDir}/$1/package.json";) || exit 2;
      # Update README.md
      $(voidSubstr '{{fiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/README.md";) || exit 3;
      $(voidSubstr '{{fiddleTitle}}' ${fiddleTitle} "../fiddles/${fiddleSubDir}/$1/README.md";) || exit 3;
      $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "../fiddles/${fiddleSubDir}/$1/README.md";) || exit 3;
      $(voidSubstr '{{author}}' ${AUTHOR} "../fiddles/${fiddleSubDir}/$1/README.md";) || exit 3;
      cd "../fiddles/${fiddleSubDir}/$1"
      npm install || exit 4;
      npm shrinkwrap;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "fiddles/${fiddleSubDir}/$1 initialized."
          ;;
      1)  endLog "foo bar! failed to create the \"../fiddles/${fiddleSubDir}/$1\" directory."
          ;;
      2)  endLog "foo bar! failed trying to update the ../fiddles/${fiddleSubDir}/$1/package.json file."
          ;;
      3)  endLog "foo bar! failed trying to update the ../fiddles/${_fiddleSubDir}/$1/README.md file."
          ;;
      4)  endLog "foo bar! failed trying to run npm install."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}
