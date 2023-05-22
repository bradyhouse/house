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
# 11/21/2018 - See CHANGELOG @ 262_add_chef_setup
# 11/24/2018 - See CHANGELOG @ 265_nativescript_14
# 09/26/2019 - See CHANGELOG @ 313_angularCli_27
# 10/03/2019 - See CHANGELOG @ 313_node_31to40
# 10/17/2021 - See CHANGELOG @ 358_react_16-25
# ---------------------------------------------------------------------------------------------------|

export HOME_ROOT=$(mapHomePath;);
export GITHUB_PUBLISH_REPO="bradyhouse.github.io";
export GITHUB_ROOT="${HOME_ROOT}/git";
export GITHUB_ROOT_DIR="house";
export GITHUB_REPO="https://github.com/bradyhouse/house";
export GITHUB_PUBLIC_REPO="https://github.com/bradyhouse/bradyhouse.github.io";
export BUILD_NUM="202001010000";
export BASH_PROFILE="${HOME_ROOT}/.bash_profile";
export ZSH_PROFILE="${HOME_ROOT}/.zshrc";
export OS=$(getOS;);
export WEB_SERVER_PORT=1841;
export AUTHOR="bradyhouse@gmail.com";
export AUTHOR_NAME="brady house";
export NVM_VERSION="v16.11.1";
export CHANGE_LOG="CHANGELOG.md";

# =================================================
# ANGULAR CLI |||||||||||||||||||||||||||||||||||||
#
export NG_TYPESCRIPT_VER="2.7.2";

# =================================================
# ELECTRON ||||||||||||||||||||||||||||||||||||||||
#
export ELECTRON_SEEDER_REPO="https://github.com/electron/electron-quick-start";

# =================================================
# NATIVE SCRIPT |||||||||||||||||||||||||||||||||||
#
export __NS_PLATFORM__="ANDROID";
export __NS_ADD_PLATFORM__="false";
export __NS_ANDROID_EMULATOR_PROFILE__=fiddler;
export __NS_ANDROID_EMULATOR_EXE__="${HOME_ROOT}/homebrew/share/android-sdk/emulator/emulator";

# NS TEMPLATE TYPE SWITCH
#
# This variable controls the template used by
# fiddle.sh when initializing a new nativescript
# fiddle. 2 options are supported:
#
#   "js"  JavaScript
#   "ng2" Angular2
# --------------------------------------------------
export __NS_TEMPLATE_TYPE__="js";

# =================================================
# CHEF ||||||||||||||||||||||||||||||||||||||||||||
#

# KITCHEN YML SWITCHES
#
# Parameters defining the default
# driver and platforms used when generating
# a new chef cookbook fiddle. The values
# are used to update the .kitchen.yml
# included in the root directory of each
# chef fiddle.

# NOTE - If you change these parameters, then
# you should re-run the `fiddle.sh "setup" "mac" "chef"`
# command inorder to update the chef collection's
# root "kitchen.yml" file.
# -------------------------------------------------

export __CHEF_KITCHEN_DRIVER_NAME="vagrant";
export __CHEF_KITCHEN_PLATFORM_NAME="centos65";
export __CHEF_KITCHEN_PLATFORM_DRIVER_BOX="learningchef/centos65";
export __CHEF_KITCHEN_PLATFORM_DRIVER_BOX_URL="learningchef/centos65";

# -------------------------------------------------
# NODE LOGIN SPLASH SWITCH
#
# Parameter used to enable/disable the /etc/motd
# customization. When enabled, new cookbook
# fiddles include a cookbook_file stanza that
# overwrites the default /etc/motd file on new
# fiddle nodes. This file defines what is displayed
# when a user logs into the running node instance.
# The updated version of the file displays the
# fiddle.sh ASCII logo followed by the name
# of the fiddle.
# -------------------------------------------------

export __CHEF_COOKBOOK_IS_LOGIN_SPLASH="true";



