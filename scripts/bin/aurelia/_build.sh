#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 01/24/2018______________________________________________________________|
#  Description             : MASTER AURELIA BUILD FUNCTION___________________________________________|
#  Entry Point             : build___________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-build.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MD @ aurelia-dependencies-update
# ---------------------------------------------------------------------------------------------------|

function nvmInstall() {
  groupLog "nvmInstall";

  if [[ -d ${NVM_DIR} ]]
  then
    source ${NVM_DIR}/nvm.sh;
    nvm install ${NVM_VERSION};
  else
    exit 3;
  fi
}

function auBuildProd() {
  groupLog "auBuildProd";
  pwd;
  au build --env prod;
}

function catch() {
    case $1 in
        0)  endLog "Build complete.";
            ;;
        *)  endLog "fubar! Something went wrong.";
            ;;
    esac
    exit $1
}

function auBuild() {
    groupLog "auBuild";
    fiddle=$1;
    # try
    (
        cd ${fiddle};
        auBuildProd || exit 1;
        cd "../dist";
        if [[ -d "${fiddle}" ]]
        then
          rm -rf "${fiddle}";
        fi
        mkdir "${fiddle}";
        cd "../${fiddle}";
        if [[ -e "data.json" ]]
        then
          cp -rf data.json "../dist/${fiddle}";
        fi
        cp -rf scripts "../dist/${fiddle}";
        cp -rf index.html "../dist/${fiddle}";

    )
    # catch
    rc=$?; case ${rc} in
        0)  echo ""
            ;;
        1)  endLog "build: Failed while attempting to install node version ${NVM_VERSION}";
            ;;
        2)  endLog "build: Failed while attempting to build \"${fiddle}\".";
            ;;
        *)  endLog "build: F U B A R ~ Something went wrong."
            ;;
    esac
    exit ${rc};
}


function build() {
  groupLog "build";

  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the fiddle"
        exit 59
  fi

  clear;
  echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
  echo "Bash version ${BASH_VERSION}..."

  # try
  (
      cd ../fiddles/aurelia;

      if [[ ! -d "dist" ]]
      then
        mkdir dist;
      else
         if [[ -d "dist/$1" ]]; then rm -R "dist/$1"; fi
      fi
      # nvmInstall || exit 1;
      auBuild $1 || exit 2;
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}
