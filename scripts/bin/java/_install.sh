#!/usr/bin/env bash

#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 09/21/2016______________________________________________________________|
#  Description             : JAVA INSTALL SETUP______________________________________________________|
#  Entry Point             : N/A_____________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-java.sh_______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201609160420
# ---------------------------------------------------------------------------------------------------|

function isJavaInstalled() {
  if [[ ! -d "${JAVA_HOME}" ]]
  then
    exit -1;
  fi
}

function isSdkInstalled() {
  if [[ ! -d "${SDKMAN_DIR}" ]]
  then
    exit -1;
  fi
}

function isGitInstalled() {
  installed=$(isInstalled "git";);
  if [[ "${installed}" == "false" ]]
  then
      exit -1;
  fi
}

function isMvnInstalled() {
  installed=$(isInstalled "mvn";);
  if [[ "${installed}" == "false" ]]
  then
      echo -1;
  fi
}

function isBrewInstalled() {
  installed=$(isInstalled "brew";);
  if [[ "${installed}" == "false" ]]
  then
    exit -1;
  fi
}

function isGradleInstalled() {
  installed=$(isInstalled "gradle";);
  if [[ "${installed}" == "false" ]]
  then
   echo -1;
  fi
}
