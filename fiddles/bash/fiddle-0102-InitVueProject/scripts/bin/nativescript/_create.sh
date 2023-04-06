#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER NATIVESCRIPT CREATE FUNCTION_____________________________________|
#  Entry Point             : nativescriptCreate______________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-nativescript.sh_______________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# 09/16/2016 - See CHANGELOG @ 201609160420
# 11/26/2016 - See CHANGELOG @ 201610010420
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# 11/24/2018 - See CHANGELOG @ 265_nativescript_14
# ---------------------------------------------------------------------------------------------------|

this=$0;

function npmShrinkWrap() {
  groupLog "npmShrinkWrap";

  if [[ -e "npm-shrinkwrap.json" ]]
  then
    rm -rf "npm-shrinkwrap.json";
  fi
  npm shrinkwrap;
}

function createTypingsRcFile() {
    groupLog "createTypingsRcFile";
    touch .typingsrc
    echo "{" >> .typingsrc
    echo -e "   \"rejectUnauthorized\": false" >> .typingsrc
    echo "}" >> .typingsrc
}

function initFiddleConfigFile() {
  groupLog "initFiddleConfigFile";
  $(echo "" > ".fiddlerc";) || exit 2
  $(echo "export __PROJECT_DIR__=$1;" >>".fiddlerc";) || exit 8
  $(echo "export __PROJECT_TYPE__=${__NS_TEMPLATE_TYPE__};" >>".fiddlerc";) || exit 8
}

function initJsProject() {
  groupLog "initJsProject";
  fiddle=$1;
  bornOnDate=$2;
  projectName=$3;
  type=$4;
  $(cp -rf "template" "${fiddle}") || exit 1;
  cd ${fiddle};
  initFiddleConfigFile ${projectName} ${type} || exit $?;
  $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
  $(voidSubstr '{{Title}}' ${projectName} "README.md";) || exit 5;
  $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
  nativescript create ${projectName} --js || exit 7;
  cd ${projectName};
  if [[ "${__NS_ADD_PLATFORM__}" == "true" ]]
  then
    nativescript platform add android || exit 9;
  fi
  npmShrinkWrap || exit $?;
}

function npmInstall() {
  groupLog "npmInstall";
  npm install;
}


function initNg2Project() {
  groupLog "initNg2ProjectDirectory";
  fiddle=$1;
  bornOnDate=$2;
  projectName=$3;
  type=$4;
  $(cp -rf "template" "${fiddle}") || exit 1;
  cd "${fiddle}";
  initFiddleConfigFile ${projectName} ${type} || exit $?;
  $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
  $(voidSubstr '{{Title}}' ${projectName} "README.md";) || exit 5;
  $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;

  nativescript create ${projectName} --ng || exit 7;
  cd ${projectName};

  if [[ "${__NS_ADD_PLATFORM__}" == "true" ]]
  then
    nativescript platform add android || exit 9;
  fi
  createTypingsRcFile || exit $?;
  npmShrinkWrap || exit $?;
}

function nativescriptCreate() {
    groupLog "nativescriptCreate";
    fiddle=$1;
    bornOnDate=$2;
    projectName=$3;
    type=$4;
    # try
    (
      case ${type} in
        'js') # javascript
            initJsProject "${fiddle}" "${bornOnDate}" "${projectName}" || exit $?;
          ;;
        'ng2') # angular 2
            initNg2Project "${fiddle}" "${bornOnDate}" "${projectName}" || exit $?;
          ;;
      esac
   )
    # catch
    rc=$?; case ${rc} in
        0)  exit 0;
            ;;
        1)  groupLog "${this}: Failed while attempting to initialize \"${fiddle}\" directory.";
            ;;
        2)  groupLog "${this}: Failed while attempting to clone angular2-seeder repo";
            ;;
        3)  groupLog "${this}: Failed while attempting to remove the \".github\" and \".git\" directories.";
            ;;
        4)  groupLog "${this}: Failed while attempting to remove extraneous files file.";
            ;;
        5)  groupLog "${this}: Failed while attempting to update the README.md file.";
            ;;
        6)  groupLog "${this}: Failed while attempting to run \"npm install\".";
            ;;
        7)  groupLog "${this}: command \"nativescript create ${projectName}\" failed.";
            ;;
        8)  groupLog "${this}: Call to the initFiddleConfigFile function failed.";
            ;;
        9)  groupLog "${this}: command \"nativescript platform add android\" failed.";
            ;;
        10) groupLog "${this}: command \"nativescript platform add ios\" failed.";
            ;;
        11) groupLog "${this}: command \"npm install\" failed.";
            ;;
        *)  groupLog "${this}: F U B A R ~ Something went wrong."
            ;;
    esac
    # finally
    echo ${rc};
}

function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
            ;;
        1)  endLog "typescriptInstall failed.";
            ;;
        2)  endLog "nativescriptInstall failed";
            ;;
        3)  endLog "nvmInstall failed";
            ;;
        4)  endLog "nvmUseVer5 failed";
            ;;
        5)  endLog "nativescriptCreate failed";
            ;;
        6)  endLog "nvmVer42 failed";
            ;;
        7)  endLog "nativescriptStart failed";
            ;;
        8)  endLog "adbInstall failed";
            ;;
        9)  endLog "Invalid name please use the format \"fiddle-####-[Name]\"."
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}

function create() {
  clear;
  echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
  echo "Bash version ${BASH_VERSION}..."

  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit 59
  fi
  fiddleSubDir="../fiddles/nativescript/$1";
  bornOnDate=$(date +"%m-%d-%y";)

  # try
  (
      nvmInstall || exit $?;
      shrinkWrapInstall || exit $?;
      typescriptInstall || exit 1;
      nativescriptInstall || exit 2;
      adbInstall || exit 8;
      projectName=$(toLowerCase $(parseName $1;);) || exit 9;
      groupLog "App Name: ";
      echo "\"${projectName}\"";
      cd ../fiddles/nativescript;

      nativescriptCreate $1 ${bornOnDate} ${projectName} ${__NS_TEMPLATE_TYPE__} || exit 5;
  )
  rc=$?; catch ${rc};
  # finally
  exit ${rc};

}
