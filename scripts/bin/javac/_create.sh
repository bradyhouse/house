#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 12/14/2016______________________________________________________________|
#  Description             : MASTER JAVAC CREATE FUNCTION____________________________________________|
#  Entry Point             : javacCreate_____________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-create.sh_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201612120420
# ---------------------------------------------------------------------------------------------------|

function initFiddleConfigFile() {
  groupLog "initFiddleConfigFile";
  $(echo "" > ".fiddlerc";) || exit 2
  $(echo "export __PROJECT_DIR__=$1;" >>".fiddlerc";) || exit 8
  $(echo "export __TARGET_DIR__=${__DEFAULT_TARGET_DIR__};" >>".fiddlerc";) || exit 8
  $(echo "export __SOURCE_FILE__=${__DEFAULT_SOURCE_FILE__};" >>".fiddlerc";) || exit 8
  $(echo "export __COMPILED_CLASS__=${__DEFAULT_COMPILED_CLASS__};" >>".fiddlerc";) || exit 8

  if [[ "x${CLASSPATH}" = "x" ]]
  then
     $(echo "export __CLASS_PATH__=${__DEFAULT_CLASSPATH__};" >> ".fiddlerc";) || exit 8
  else
     $(echo "export __CLASS_PATH__=${CLASSPATH}:${__DEFAULT_CLASSPATH__};" >> ".fiddlerc";) || exit 8
  fi

  $(echo "export __SOURCE_PATH__=${__DEFAULT_SOURCEPATH__};" >> ".fiddlerc";) || exit 8

}

function initFiddleDirectory() {
  groupLog "initFiddleDirectory";
  local fiddle=$1;
  local bornOnDate=$2;
  local projectName=$3;

  $(cp -rf "template" "${fiddle}") || exit 1;
  cd "${fiddle}";
  initFiddleConfigFile "${projectName}" || exit $?;
  $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 3;
  $(voidSubstr '{{Title}}' ${projectName} "README.md";) || exit 3;
  $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 3;
  $(voidSubstr '{{projectName}}' ${projectName} "Fiddle.java";) || exit 3;
  mkdir "${projectName}";
  mkdir "${projectName}/src";
  mv "Fiddle.java" "${projectName}/src";

}

function javacCreate() {
    groupLog "javacCreate";
    local fiddle=$1;
    local bornOnDate=$2;
    local projectName=$3;
    # try
    (
      if [[ -d "${fiddle}" ]]
      then
        rm -rf "${fiddle}";
      fi
      initFiddleDirectory "${fiddle}" "${bornOnDate}" "${projectName}" || exit $?;
    )
    # catch
    rc=$?; case ${rc} in
        0)  groupLog "\"${fiddle}\" created.";
            ;;
        1)  groupLog "Failed while attempting to initialize \"${fiddle}\" directory.";
            ;;
        2)  groupLog "Failed while attempting to create \".fiddlerc\" file.";
            ;;
        3)  groupLog "Failed while attempting to update the README.md file.";
            ;;
        *)  groupLog "F U B A R ~ Something went wrong."
            ;;
    esac
    # finally
    return ${rc};
}

function catch() {
    case $1 in
        0)  endLog "${this}";
            ;;
        1)  endLog "javac is not installed or configured properly.";
            ;;
        2)  endLog "call to javacCreate function failed";
            ;;
        3)  endLog "cannot access root javac fiddle directory.";
            ;;
        *)  endLog "fubar! Something went wrong."
            ;;
    esac
    exit $1
}

function create() {
  clear;
  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit 59
  fi
  fiddleSubDir="../fiddles/javac";
  bornOnDate=$(date +"%m-%d-%y";)
  # try
  (
      startLog $(echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}');
      name=$1;
      suffix=$(parseName ${name};);
      projectName=$(toLowerCase ${suffix};);
      groupLog "App Name: ";
      echo "\"${projectName}\"";
      cd "${fiddleSubDir}" || exit 3;
      isJavacInstalled || exit 1;
      javacCreate $1 ${bornOnDate} ${projectName} || exit 2;
  )
  rc=$?; catch ${rc};
  # finally
  exit ${rc};

}

