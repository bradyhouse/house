#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER ANDROID STARTUP FUNCTION_________________________________________|
#  Entry Point             : androidStart____________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-start.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201610010420
# ---------------------------------------------------------------------------------------------------|


function isEmulatorRunning() {
  isRunning=$(lsof -i -P | grep :5554 | awk '{print $2}' | wc -l | xargs);
  if [[ ${isRunning} == "1" ]]
  then
    echo "true";
  else
    echo "false";
  fi
}

function startAndroidEmulator() {
  groupLog "startEmulator";

  if [[ $(isEmulatorRunning;) == "false" ]]
  then
    nohup ${__START_ANDROID_EMULATOR_EXE__} -netdelay none -netspeed full -avd "${__START_ANDROID_EMULATOR_PROFILE__}" &
    sleep 30;
  else
    groupLog "emulator is already running";
  fi
}

function gradlewInstallDebug() {
  groupLog "gradlewInstallDebug";
  cd $1;
  #try
  (
    ./gradlew installDebug;
  )
  rc=$?; case ${rc} in
    0)  groupLog "gradlew run - successful."
        ;;
    *)  exit -1;
        ;;
  esac

}

function androidStart() {
  groupLog "androidStart";
  if [[ ! -e ".fiddlerc" ]]; then exit -1; fi
  source ".fiddlerc";
  startAndroidEmulator;
  gradlewInstallDebug ${__PROJECT_DIR__};
}
