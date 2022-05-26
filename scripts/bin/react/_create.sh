#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 08/01/2018______________________________________________________________|
#  Description             : MASTER REACT CREATE FUNCTION____________________________________________|
#  Entry Point             : reactCreate_____________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-create.sh_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 006_fiddle_react
# 10/17/2021 - See CHANGELOG @ 358_react_16-25
# ---------------------------------------------------------------------------------------------------|


function npmInstallDep() {
  groupLog "npmInstallDep";
  npm install --save bootstrap jquery popper.js;
}

function npmShrinkWrap() {
  groupLog "npmShrinkWrap";
  npm shrinkwrap;
}

function reactCreate() {
    groupLog "reactCreate";
    fiddle=$1;
    rawAppName=$(subDelimStr ${fiddle} "-" "2";);
    appName=$(toLowerCase ${rawAppName};);
    bornOnDate=$2;
    # try
    (
        if [[ -d "${fiddle}" ]]
        then
            rm -rf ${fiddle} || exit 1;
        fi

        if [[ "${appName}" == "template" ]]
        then
            appName="fiddle";
        fi
        #npm uninstall -g create-react-app && npm i -g npm@latest && npm cache clean -f && npx create-react-app my-app
        npx create-react-app ${appName} || exit 2;
        mv ${appName} ${fiddle};
        cd ${fiddle};

        if [[ -e .gitignore ]]
        then
            rm -rf .gitignore;
        fi
        rm -rf public/index.html || exit $?;
        rm -rf public/favicon.ico || exit $?;
        cp -rf ../template/index.html public/index.html || exit $?;
        cp -rf ../template/favicon.ico public/favicon.ico || exit $?;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "public/index.html";) || exit 5;
        $(voidSubstr '{{Author}}' ${AUTHOR} "public/index.html";) || exit 5;
        cp -rf ../template/README.md README.md || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
        npmShrinkWrap || exit $?;
        npmInstallDep || exit $?;
        cp -rf ../template/index.js src/index.js || exit 5;

    )
    # catch
    rc=$?; case ${rc} in
        0)  endLog "";
            ;;
        1)  endLog "reactCreate: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  endLog "reactCreate: Failed while attempting to \"ng new ${fiddle}\".";
            ;;
        5)  endLog "reactCreate: Failed while attempting to update the README.md file.";
            ;;
        6)  endLog "reactCreate: Call to createTypingsRcFile failed.";
            ;;
        7)  endLog "reactCreate: call to npm install failed.";
            ;;
        8)  endLog "reactCreate: Failed while attempting to update favicon.ico file.";
            ;;
        9)  endLog "reactCreate: Failed while attempting to update index.html file.";
            ;;
        *)  endLog "reactCreate: F U B A R ~ Something went wrong."
            ;;
    esac
    exit ${rc};
}

function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
            ;;
        1)  endLog "_install.sh: ngInstall() failed";
            ;;
        2)  endLog "_create.sh: reactCreate() failed";
            ;;
        3)  endLog "nvmInstall: call to nvm install ${NVM_VERSION} failed.";
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

  fiddleSubDir="../fiddles/react/$1";
  fiddleTemplateDir="../fiddles/react/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};

  # try
  (
      nvmInstall || exit $?;
      #shrinkWrapInstall || exit $?;
      if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
      cd ../fiddles/react;
      reactCreate $1 ${bornOnDate} || exit 2;
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}

