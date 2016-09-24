#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER JAVA CREATE FUNCTION_____________________________________________|
#  Entry Point             : javaCreate______________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-java.sh_______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201609160420
# ---------------------------------------------------------------------------------------------------|

function initFiddleConfigFile() {
  groupLog "initFiddleConfigFile";
  $(echo "" > ".fiddlerc";) || exit 2
  $(echo "export __PROJECT_DIR__=$1;" >>".fiddlerc";) || exit 8
}

function gitCloneSeeder() {
  groupLog "gitCloneSeeder";
  #try
  (
    git clone $1 $2
  )
  rc=$?; case ${rc} in
    0)  groupLog "$1 cloned to $2."
        ;;
    *)  exit 3;
        ;;
  esac
}

function gradlewCheck() {
  groupLog "gradlewCheck";
  #try
  (
    cd $1
    ./gradlew check;
  )
  rc=$?; case ${rc} in
    0)  groupLog "gradlew check - successful."
        ;;
    *)  exit 7;
        ;;
  esac
}

function initJavaProject() {
  groupLog "initJavaProject";
  local fiddle=$1;
  local bornOnDate=$2;
  local projectName=$3;
  local seeder=$4;
  $(cp -rf "template" "${fiddle}") || exit 1;
  cd "${fiddle}";
  initFiddleConfigFile ${projectName} || exit $?;
  $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
  $(voidSubstr '{{Title}}' ${projectName} "README.md";) || exit 5;
  $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
  gitCloneSeeder ${seeder} "tmp" || exit $?;
  cp -rf tmp/complete "${projectName}";
  rm -rf tmp;
  gradlewCheck "${projectName}";
}

function javaCreate() {
    groupLog "javaCreate";
    local fiddle=$1;
    local bornOnDate=$2;
    local projectName=$3;
    local seeder=$4;
    # try
    (
      if [[ -d "${fiddle}" ]]
      then
        rm -rf "${fiddle}";
      fi
      initJavaProject "${fiddle}" "${bornOnDate}" "${projectName}" "${seeder}" || exit $?;
    )
    # catch
    rc=$?; case ${rc} in
        0)  groupLog "\"$3\" created.";
            ;;
        1)  groupLog "Failed while attempting to initialize \"${fiddle}\" directory.";
            ;;
        2)  groupLog "Failed while attempting to create \".fiddlerc\" file.";
            ;;
        3)  groupLog "Failed while attempting to clone seeder.";
            ;;
        4)  groupLog "Failed while attempting to create project directory based on seeder.";
            ;;
        5)  groupLog "Failed while attempting to update the README.md file.";
            ;;
        6)  groupLog "Failed while attempting delete tmp directory.";
            ;;
        7)  groupLog "Failed while attempting command \"gradlew check\"";
            ;;
        *)  groupLog "F U B A R ~ Something went wrong."
            ;;
    esac
    # finally
    return ${rc};
}


