#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create dat=e             : 01/24/2017_____________________________________________________________|
#  Description             : MASTER AURELIA CLI INSTALL SCRIPT FOR MAC MACHINES______________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ aurelia-dependencies-update
# ---------------------------------------------------------------------------------------------------|


function cloneRepo() {
  groupLog "cloneRepo";
  cd ${HOME_ROOT};
  if [[ -d "aurelia-cli" ]]
  then
    rm -rf aurelia-cli;
  fi
  git clone https://github.com/aurelia/cli.git "aurelia-cli";
}

function npmInstall() {
  groupLog "npmInstall";
  cd "${HOME_ROOT}/aurelia-cli";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install;
  else
    return 1;
  fi
}

function npmLink() {
  groupLog "npmLink";
  cd "${HOME_ROOT}/aurelia-cli";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm link;
  else
    return 1;
  fi
}

function npmInstallGulp() {
  groupLog "npmInstallGulp";
  cd "${HOME_ROOT}/aurelia-cli";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install git+https://git@github.com/gulpjs/gulp.git#4.0;
  else
    return 1;
  fi
}

function npmInstallBabel() {
  groupLog "npmInstallBabel";
  cd "${HOME_ROOT}/aurelia-cli";
  installed=$(isInstalled "npm";);
  if [[ "${installed}" == "true" ]]
  then
    npm install babel-polyfill babel-register typescript;
  else
    return 1;
  fi
}

function install() {
  groupLog "install";
  #try
  (
    cloneRepo || exit $?;
    npmInstall || exit $?;
    npmLink || exit $?;
    npmInstallGulp || exit $?;
    npmInstallBabel || exit $?;
  )
  #catch
  _rc=$?
  case ${_rc} in
    0) endLog "Done.";
       echo -e "Aurelia CLI installed successfully.";
        ;;
    *) endLog "foo-bar! Something went wrong."
        ;;
  esac
  #finally
  exit ${_rc}
}

