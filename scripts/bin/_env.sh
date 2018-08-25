#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 04/12/2016______________________________________________________________|
#  Description             : MASTER ENVIRONMENT VARIABLE SOURCE______________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201703100420
# 01/24/2018 - See CHANGELOG @ aurelia-dependencies-update
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# 08/04/2018 - See CHANGELOG @ 006_fiddle_react
# ---------------------------------------------------------------------------------------------------|

export HOME_ROOT=$(mapHomePath;);
export GITHUB_PUBLISH_REPO="bradyhouse.github.io";
export GITHUB_ROOT="${HOME_ROOT}/github";
export GITHUB_ROOT_DIR="house_master";
export GITHUB_REPO="https://github.com/bradyhouse/house";
export GITHUB_PUBLIC_REPO="https://github.com/bradyhouse/bradyhouse.github.io";
export BUILD_NUM="201801240420";
export BASH_PROFILE="${HOME_ROOT}/.bash_profile";
export ZSH_PROFILE="${HOME_ROOT}/.zshrc";
export OS=$(getOS;);
export WEB_SERVER_PORT=1841;
export AUTHOR="bradyhouse@gmail.com";
export NVM_VERSION="v8.9.4";
export NG_TYPESCRIPT_VER="2.7.2";
export ELECTRON_SEEDER_REPO="https://github.com/electron/electron-quick-start";
export __NS_PLATFORM__="ANDROID";
export __NS_ADD_PLATFORM__="false";
export __NS_ANDROID_EMULATOR_PROFILE__=fiddler;
export __NS_ANDROID_EMULATOR_EXE__="${HOME_ROOT}/homebrew/share/android-sdk/emulator/emulator";
# -------------------------------------------------
# NATIVE SCRIPT TEMPLATE TYPE SWITCH
# This variable controls the template used by
# the fiddle.sh when initializing a new nativescript
# fiddle. 2 options are supported:
#   "js"  JavaScript
#   "ng2" Angular2
# --------------------------------------------------
export __NS_TEMPLATE_TYPE__="ng2";



