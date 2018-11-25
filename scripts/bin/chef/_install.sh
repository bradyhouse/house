#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/22/2018______________________________________________________________|
#  Description             : CHEF INSTALL SETUP______________________________________________________|
#  Entry Point             : install_________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-create.sh_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 262_add_chef_setup
# ---------------------------------------------------------------------------------------------------|


function isChefInstalled() {
    if [[ ! $(which chef;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function chefInstall() {
  groupLog "chefInstall";
  os=$(getOS;);
  ./fiddle.sh "setup" "${os}" "chef";
}

function isKitchenInstalled() {
  if [[ ! $(which kitchen;) ]]
    then
        echo "false";
    else
        echo "true";
  fi
}

function kitchenInit() {
  groupLog "kitchenInit";
  cd $1;
  installed=$(isKitchenInstalled;);
  if [[ "${installed}" == "false" ]]
  then
    chefInstall || exit $?;
    kitchen init --create-gemfile || exit $?;
    bundle install || exit $?l
  fi

}

function updateKitchenYml() {
  groupLog "updateKitchenYml";
  _templateDir=$1;
  _rootDir=$2;
  _templateYml="${_templateDir}/kitchen.yml";
  _rootYml="${_rootDir}/kitchen.yml";
  _isUpdated=$(isIdentical ${_templateYml} ${_rootYml};);
  if [[ "${_isUpdated}" == "false" ]]
  then
    cp -rf ${_templateYml} ${_rootYml};
  fi
}
