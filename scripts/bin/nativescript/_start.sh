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
#  Initial Consumer        : ../fiddle-start.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# 09/16/2016 - See CHANGELOG @ 201609160420
# 11/26/2016 - See CHANGELOG @ 201610010420
# 01/21/2017 - See CHANGELOG @ 201701180420
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# 11/24/2018 - See CHANGELOG @ 265_nativescript_14
# ---------------------------------------------------------------------------------------------------|


function nativeScriptRunAndroid() {
  groupLog "nativeScriptRunAndroid";
  nativescript build android;
  tns run android;
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
    nohup ${__NS_ANDROID_EMULATOR_EXE__} -netdelay none -netspeed full -avd "${__NS_ANDROID_EMULATOR_PROFILE__}" &
    sleep 30;
  else
    groupLog "emulator is already running";
  fi
}


function nativescriptPreview() {
    groupLog "nativescriptPreview";
    type=$2;
    if [[ -d $1 ]]
    then
      if [[ -e ".fiddlerc" ]]
      then
        source ".fiddlerc";
        type=${__PROJECT_TYPE__};
        cd ${__PROJECT_DIR__};

        if [[ -d hooks ]]
        then
          rm -rf hooks;
        fi

        if [[ -d node_modules ]]
        then
          rm -rf node_modules;
        fi

        if [[ -d platforms ]]
        then
            rm -rf platforms;
        fi

        tns preview;
      else
        exit -1;
      fi
    else
      cd $1;
    fi
    exit 0;
}
