#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER NATIVESCRIPT STARTUP FUNCTION____________________________________|
#  Entry Point             : nativescriptAndroidStart________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-nativescript.sh_______________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# 09/16/2016 - See CHANGELOG @ 201609160420
# ---------------------------------------------------------------------------------------------------|


function nativeScriptRunAndroid() {
  groupLog "nativeScriptRunAndroid";
  nativescript livesync --watch;
}

function npmRunStartAndroid() {
  groupLog "npmRunStartAndroid";
   npm run start.android;
}

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
    nohup ${__ANDROID_EMULATOR_EXE__} -netdelay none -netspeed full -avd "${__ANDROID_EMULATOR_PROFILE__}" &
    sleep 30;
  else
    groupLog "emulator is already running";
  fi
}

function nativescriptAndroidStart() {
    groupLog "nativescriptAndroidStart";
    type=$2;
    if [[ ! -d $1 ]]
    then
      if [[ -e ".fiddlerc" ]]
      then
        source ".fiddlerc";
        type=${__PROJECT_TYPE__};
        cd ${__PROJECT_DIR__};
      else
        exit -1;
      fi
    else
      cd $1;
    fi

    case ${type} in
        'js') # javascript
          startAndroidEmulator;
          nativeScriptRunAndroid;
          ;;
        'ng2') # angular 2
          npmRunStartAndroid;
          ;;
    esac
    exit 0;
}
