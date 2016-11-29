#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/28/2016______________________________________________________________|
#  Description             : MASTER C CREATE FUNCTION________________________________________________|
#  Entry Point             : cCreate_________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-c.sh__________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201610010420
# ---------------------------------------------------------------------------------------------------|


function initFiddleConfigFile() {
  groupLog "initFiddleConfigFile";
  $(echo "" > ".fiddlerc";) || exit 2
  $(echo "export __PROJECT_DIR__=$1;" >>".fiddlerc";) || exit 8
  $(echo "export __ENTRY_POINT__=main.c;" >>".fiddlerc";) || exit 8
}

function initAndroidProject() {
  groupLog "initAndroidProject";
  appName=$(capitalize $1;);
  #try
  (
    android create project -a ${appName} -k ${__CREATE_PROJECT_PACKAGE__} -t ${__CREATE_PROJECT_TARGET__} -g -v ${__CREATE_GRADLE_VERSION__} -p $1
  )
  #catch
  rc=$?; case ${rc} in
    0)  groupLog "android project, \"$1\", created"
        ;;
    *)  exit 4;
        ;;
  esac
}

function initGradle() {
  groupLog "initGradle";
  #try
  (
    cd $1
    ./gradlew check;
  )
  #catch
  rc=$?; case ${rc} in
    0)  groupLog "gradlew check - successful."
        ;;
    *)  exit 5;
        ;;
  esac
}

function initGradleConfig() {
  groupLog "initGradleConfig";
  #try
  (
    cd gradleCfg;
    $(voidSubstr '{{{androidVersion}}}' ${__CREATE_ANDROID_VERSION__} "build.gradle";)
    $(voidSubstr '{{{androidGradlePluginVersion}}}' ${__CREATE_ANDROID_GRADLE_VERSION__} "build.gradle";)
    $(voidSubstr '{{{GoogleApiVersion}}}' ${__CREATE_GOOGLE_API_VERSION__} "build.gradle";)
    $(voidSubstr '{{{gradleVersion}}}' ${__CREATE_GRADLE_VERSION__} "gradle-wrapper.properties";)
    cd ..;
    cp -rf gradleCfg/build.gradle $1;
    cp -rf gradleCfg/gradle-wrapper.properties "$1/gradle/wrapper/gradle-wrapper.properties";
    rm -rf gradleCfg;
  )
  #catch
  rc=$?; case ${rc} in
    0)  groupLog "gradlew check - successful."
        ;;
    *)  exit 6;
        ;;
  esac

}


function initFiddleDirectory() {
  groupLog "initFiddleDirectory";
  local fiddle=$1;
  local bornOnDate=$2;
  local projectName=$3;

  $(cp -rf "template" "${fiddle}") || exit 1;
  cd "${fiddle}";
  initFiddleConfigFile ${projectName} || exit $?;
  $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 3;
  $(voidSubstr '{{Title}}' ${projectName} "README.md";) || exit 3;
  $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 3;
  initAndroidProject ${projectName} || exit $?;
  initGradleConfig ${projectName} || exit $?;
  initGradle "${projectName}"
}

function cCreate() {
    groupLog "cCreate";
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
        4)  groupLog "Failed while calling android create project.";
            ;;
        5)  groupLog "Failed while attempting command \"gradlew check\"";
            ;;
        *)  groupLog "F U B A R ~ Something went wrong."
            ;;
    esac
    # finally
    return ${rc};
}


