#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER ANDROID EMULATE FUNCTION_________________________________________|
#  Entry Point             : androidStart____________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-emulate.sh____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201612240420
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
  groupLog "startAndroidEmulator";
  ${__START_ANDROID_EMULATOR_EXE__} -netdelay none -netspeed full -avd "${__START_ANDROID_EMULATOR_PROFILE__}"
}

function emulate() {
    groupLog "emulate";
    startAndroidEmulator || exit $?;
}
