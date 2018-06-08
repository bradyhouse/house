#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER ANGULAR2 CREATE FUNCTION_________________________________________|
#  Entry Point             : ngCreate________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-angular2-cli.sh_______________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605020420
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


function createTypingsRcFile() {
    groupLog "createTypingsRcFile";
    touch .typingsrc
    echo "{" >> .typingsrc
    echo -e "   \"rejectUnauthorized\": false" >> .typingsrc
    echo "}" >> .typingsrc
}

function npmShrinkWrap() {
  groupLog "npmShrinkWrap";
  npm shrinkwrap;
}

function ngCreate() {
    groupLog "ngCreate";
    fiddle=$1;
    appName=$(subDelimStr ${fiddle} "-" "2";);
    bornOnDate=$2;
    # try
    (
        if [[ -d "${fiddle}" ]]
        then
            rm -rf ${fiddle} || exit 1;
        fi

        if [[ "${appName}" == "Template" ]]
        then
            appName="fiddle";
        fi

        ng new ${appName} --directory ${fiddle} || exit 2;
        cd ${fiddle};

        if [[ -e .gitignore ]]
        then
            rm -rf .gitignore;
        fi
        cp -rf ../template/README.markdown README.md || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
        createTypingsRcFile || exit 6;
        rm -rf src/favicon.ico || exit 8;
        cp -rf ../template/favicon.ico src/favicon.ico || exit 8;
        rm -rf src/index.html || exit 9;
        cp -rf ../template/index.html src/index.html || exit 9;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/index.html";) || exit 9;
        # npm install || exit 7;
        npmShrinkWrap || exit $?;

    )
    # catch
    rc=$?; case ${rc} in
        0)  endLog "";
            ;;
        1)  endLog "ngCreate: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  endLog "ngCreate: Failed while attempting to \"ng new ${fiddle}\".";
            ;;
        5)  endLog "ngCreate: Failed while attempting to update the README.md file.";
            ;;
        6)  endLog "ngCreate: Call to createTypingsRcFile failed.";
            ;;
        7)  endLog "ngCreate: call to npm install failed.";
            ;;
        8)  endLog "ngCreate: Failed while attempting to update favicon.ico file.";
            ;;
        9)  endLog "ngCreate: Failed while attempting to update index.html file.";
            ;;
        *)  endLog "ngCreate: F U B A R ~ Something went wrong."
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
        2)  endLog "_create.sh: ngCreate() failed";
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

  fiddleSubDir="../fiddles/angular2-cli/$1";
  fiddleTemplateDir="../fiddles/angular2-cli/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};

  # try
  (
      nvmInstall || exit $?;
      ngInstall || exit $?;
      shrinkWrapInstall || exit $?;
      if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
      cd ../fiddles/angular2-cli;
      ngCreate $1 ${bornOnDate} || exit 2;
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}
