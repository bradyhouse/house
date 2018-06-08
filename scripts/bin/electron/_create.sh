#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER ELECTRON CREATE FUNCTIONS LIB____________________________________|
#  Entry Point             : create__________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-create.sh_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# 12/11/2016 - See CHANGELOG @ 201611280420
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# ---------------------------------------------------------------------------------------------------|

this=$0;

function npmShrinkWrap() {
  groupLog "npmShrinkWrap";
  npm shrinkwrap;
}

function electronCreate() {
    groupLog "electronCreate";
    fiddle=$1;
    bornOnDate=$2;
    # try
    (
        if [[ -d "${fiddle}" ]]
        then
            rm -rf ${fiddle} || exit 1;
        fi
        $(git clone --depth 1 ${ELECTRON_SEEDER_REPO} ${fiddle};) || exit 2;
        cd ${fiddle};
        rm -rf .github || exit 3;
        rm -rf .git || exit 3;
        rm -rf README.md || exit 4;
        rm -rf .gitignore || exit 8;
        rm -rf LICENSE.md || exit 9;
        cp -rf ../template/README.md README.md || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
        $(voidSubstr 'https://github.com/electron/electron-quick-start.git' 'https://github.com/bradyhouse/house.git' "package.json";) || exit 7;
        $(voidSubstr 'https://github.com/electron/electron-quick-start/issues' 'https://github.com/bradyhouse/house/issues' "package.json";) || exit 7;
        $(voidSubstr 'https://github.com/electron/electron-quick-start#readme' 'https://github.com/bradyhouse/house/blob/master/fiddles/electron/README.markdown' "package.json";) || exit 7;
        $(voidSubstr 'https://github.com/electron/electron-quick-start#readme' 'https://github.com/bradyhouse/house/blob/master/fiddles/electron/README.markdown' "package.json";) || exit 7;
        $(voidSubstr 'electron-quick-start' ${fiddle} "package.json";) || exit 7;
        $(voidSubstr 'GitHub' 'bradyhouse@gmail.com' "package.json";) || exit 7;
        $(voidSubstr 'GitHub' 'bradyhouse@gmail.com' "package.json";) || exit 7;
        $(voidSubstr 'CC0-1.0' 'MIT' "package.json";) || exit 7;
        $(voidSubstr 'tutorial' 'node' "package.json";) || exit 7;
        stripLine "package.json" "quick" || exit 7;
        npm install || exit 9;
        npmShrinkWrap || exit $?;
    )
    # catch
    rc=$?; case ${rc} in
        0)  echo ""
            ;;
        1)  endLog "${this}: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  endLog "${this}: Failed while attempting to clone electron-quick-start repo";
            ;;
        3)  endLog "${this}: Failed while attempting to remove the \".github\" and \".git\" directories.";
            ;;
        4)  endLog "${this}: Failed while attempting to remove extraneous files.";
            ;;
        5)  endLog "${this}: Failed while attempting to update the README.md file.";
            ;;
        6)  endLog "${this}: Failed while attempting to run \"npm install\".";
            ;;
        7)  endLog "${this}: Failed while attempting to update \"package.json\"";
            ;;
        8)  endLog "${this}: Failed while attempting to remove \".gitignore\".";
            ;;
        9)  endLog "${this}: Failed while attempting to remove \"LICENSE.md\".";
            ;;
        *)  endLog "${this}: F U B A R ~ Something went wrong."
            ;;
    esac
    # finally
    echo ${rc};
}

function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
            ;;
        1)  endLog "_install.sh: electronInstall() failed";
            ;;
        2)  endLog "_create.sh: electronCreate() failed";
            ;;
        *)  endLog "fubar! Something went wrong.";
            ;;
    esac
    exit $1
}

function create() {

  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit 59
  fi

  clear;
  echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
  echo "Bash version ${BASH_VERSION}..."

  fiddleSubDir="../fiddles/electron/$1";
  fiddleTemplateDir="../fiddles/electron/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};
  # try
  (
      if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
      nvmInstall || exit $?;
      shrinkWrapInstall || exit $?;
      electronInstall || exit 1;
      cd ../fiddles/electron;
      electronCreate $1 ${bornOnDate} || exit $?;
  )
  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}
