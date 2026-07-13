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
# 12/11/2016 - See CHANGELOG @ 201611280420
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

function mvnInstall() {
  groupLog "mvnInstall";
  #try
  (
    cd $1
    mvn install;
  )
  rc=$?; case ${rc} in
    0)  groupLog "maven install - successful."
        ;;
    *)  exit 8;
        ;;
  esac

}

function gradlewCheck() {
  groupLog "gradlewCheck";
  #try
  (
    cd $1
    gradle check;
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
  mvnInstall "${projectName}";
  #gradlewCheck "${projectName}";
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
        8)  groupLog "Failed while attempting command \"mvn install\"";
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
        1)  endLog "java is not installed or configured properly.";
            ;;
        2)  endLog "gradle is not installed or configured properly";
            ;;
        3)  endLog "git is not installed or configured properly";
            ;;
        4)  endLog "call to javaCreate function failed";
            ;;
        5)  endLog "cannot access root java fiddle directory.";
            ;;
        6)  endLog "cannot not parse project name";
            ;;
        7)  endLog "maven is not installed or configured properly";
            ;;
        *)  endLog "fubar! Something went wrong."
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
  fiddleSubDir="../fiddles/java";
  bornOnDate=$(date +"%m-%d-%y";)
  # try
  (
      startLog $(echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}');
      name=$1;
      suffix=$(parseName ${name};);
      projectName=$(toLowerCase ${suffix};);
      groupLog "App Name: \"${projectName}\"";
      cd "${fiddleSubDir}" || exit 5;
      isJavaInstalled || exit 1;
      $(isGradleInstalled;) || exit 2;
      $(isGitInstalled;) || exit 3;
      $(isMvnInstalled;) || exit 7;
      javaCreate $1 ${bornOnDate} ${projectName} ${__SEEDER__} || exit 4;
  )
  rc=$?; catch ${rc};
  # finally
  exit ${rc};
}
