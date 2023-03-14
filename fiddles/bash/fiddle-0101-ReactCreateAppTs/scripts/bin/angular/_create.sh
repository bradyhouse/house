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


function create() {
  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit 59
  fi
  fiddleSubDir="../fiddles/android";
  bornOnDate=$(date +"%m-%d-%y";)

  function catch() {
      case $1 in
          0)  endLog "${this}";
              ;;
          1)  endLog "android is not installed or configured properly.";
              ;;
          2)  endLog "gradle is not installed or configured properly";
              ;;
          3)  endLog "call to javaCreate function failed";
              ;;
          4)  endLog "cannot access root android fiddle directory.";
              ;;
          *)  endLog "fubar! Something went wrong."
              ;;
      esac
      exit $1
  }
  # try
  (
      startLog $(echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}');
      name=$1;
      suffix=$(parseName ${name};);
      projectName=$(toLowerCase ${suffix};);
      groupLog "App Name: ";
      echo "\"${projectName}\"";
      cd "${fiddleSubDir}" || exit 4;
      $(isAndroidInstalled) || exit 1;
      $(isGradleInstalled) || exit 2;
      androidCreate $1 ${bornOnDate} ${projectName} || exit 3;
  )
  rc=$?; catch ${rc};
  # finally
  exit ${rc};

}
