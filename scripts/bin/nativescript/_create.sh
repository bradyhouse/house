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
# ---------------------------------------------------------------------------------------------------|

this=$0;

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
  $(echo "export __PROJECT_TYPE__=$2;" >>".fiddlerc";) || exit 8
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
  nativescript create ${projectName} || exit 7;
  cd ${projectName};
  nativescript platform add android || exit 9;
}

function npmInstall() {
  groupLog "npmInstall";
  npm install;
}

function gitNg2SeederClone() {
  groupLog "gitClone";
  $(git clone --depth 1 ${__NG2_SEEDER__} ${projectName};) || exit 2;
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
  cd ${projectName};
  createTypingsRcFile || exit $?;
  gitNg2SeederClone || exit $?;
  rm -rf .github || exit 3;
  rm -rf .git || exit 3;
  rm -rf README.md || exit 4;
  rm -r LICENSE || exit 4;
  rm -rf .editorconfig || exit 4;
  npmInstall;
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


