#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER METEOR CREATE FUNCTION___________________________________________|
#  Entry Point             : ngCreate________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-create.sh_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605020420
# 12/11/2016 - See CHANGELOG @ 201611280420
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# ---------------------------------------------------------------------------------------------------|

function meteorCreate() {
    groupLog "meteorCreate";
    fiddle=$1;
    bornOnDate=$2;
    # try
    (
        if [[ -d "${fiddle}" ]]
        then
            rm -rf ${fiddle} || exit 1;
        fi
        meteor create --full $1 || exit 2;
        cd ${fiddle};
        cp -rf ../template/README.markdown README.md || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
    )
    # catch
    rc=$?; case ${rc} in
        0)  echo "";
            ;;
        1)  echo "meteorCreate: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  echo "meteorCreate: Failed while attempting to \"ng new ${fiddle}\".";
            ;;
        5)  echo "meteorCreate: Failed while attempting to update the README.md file.";
            ;;
        *)  echo "meteorCreate: F U B A R ~ Something went wrong."
            ;;
    esac
    exit ${rc};
}

function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
            ;;
        1)  echo "_install.sh: meteorInstall() failed";
            ;;
        2)  echo "_create.sh: meteorCreate() failed";
            ;;
        *)  echo "fubar! Something went wrong."
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

  echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
  echo "Bash version ${BASH_VERSION}..."

  fiddleSubDir="../fiddles/meteor/$1";
  fiddleTemplateDir="../fiddles/meteor/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};

  # try
  (
      nvmInstall || exit $?;
      shrinkWrapInstall || exit $?;
      meteorInstall || exit 1;
      if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
      cd ../fiddles/meteor;
      meteorCreate $1 ${bornOnDate} || exit 2;
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}
