#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER EMBER CREATE FUNCTION____________________________________________|
#  Entry Point             : emberCreate_____________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-ember.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# 12/11/2016 - See CHANGELOG @ 201611280420
# ---------------------------------------------------------------------------------------------------|

this=$(pwd;);


function emberCreate() {
    groupLog "emberCreate";
    fiddle=$1;
    bornOnDate=$2;
    # try
    (
        if [[ -e "${fiddle}" ]]
        then
            rm -rf "${fiddle}" || exit 1;
        fi
        ember new $1 -sb || exit 2;
        cd ${fiddle};
        cp -rf ../template/README.markdown README.md || exit 3;
        cp -rf ../template/.bowerrc .bowerrc || exit 4;
        bower install || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 3;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 3;
    )
    # catch
    rc=$?; case ${rc} in
        0)  echo "";
            ;;
        1)  echo "${this}: attempt to remove the existing directory failed";
            ;;
        2)  echo "${this}: Call to ember CLI \"new\" failed";
            ;;
        3)  echo "${this}: Readme file update failed";
            ;;
        4)  echo "${this}: \".bowerrc\" file update failed";
            ;;
        5)  echo "${this}: \"bower install\" failed";
            ;;
        *)  echo "${this}: F U B A R ~ Something went wrong."
            ;;
    esac
    return ${rc};
}

function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
            ;;
        1)  echo "_install.sh: emberInstall() failed";
            ;;
        2)  echo "_create.sh: emberCreate() failed";
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

  clear;
  echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
  echo "Bash version ${BASH_VERSION}..."

  fiddleSubDir="../fiddles/ember/$1";
  fiddleTemplateDir="../fiddles/ember/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};

  # try
  (
      if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
      cd ../fiddles/ember;
      emberInstall || exit 1;
      emberCreate $1 ${bornOnDate} || exit 2;
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}
