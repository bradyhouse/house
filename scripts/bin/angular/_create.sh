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
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# 09/12/2024 - See CHANGELOG @ 2147-fiddlesh-cleanup-maintenance
# ---------------------------------------------------------------------------------------------------|

function npmInstallDep() {
  groupLog "npmInstallDep";
  npm install || exit 10;
}

function ngCreate() {
    groupLog "ngCreate";
    fiddle=$1;
    rawAppName=$(subDelimStr ${fiddle} "-" "2";);
    appName=$(toLowerCase ${rawAppName};);
    bornOnDate=$2;
    # try
    (
        if [[ -d "${fiddle}" ]]
        then
            rm -r ${fiddle} || exit 1;
        fi

        if [[ "${appName}" == "template" ]]
        then
            appName="fiddle";
        fi

        cp -r template ${fiddle};

        cd ${fiddle};
 
        if [[ -e .gitignore ]]
        then
            rm -r .gitignore;
        fi

        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/index.html";) || exit 5;
        $(voidSubstr '{{Author}}' ${AUTHOR} "src/index.html";) || exit 5;

        $(voidSubstr '{{FiddleName}}' ${fiddle} "package.json";) || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/app/app.component.html";) || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/app/components/top-nav/top-nav.component.ts";) || exit 5;
        
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
 
        npmInstallDep || exit $?;

    )
    # catch
    rc=$?; case ${rc} in
        0)  endLog "";
            ;;
        1)  endLog "vueCreateTs: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  endLog "vueCreateTs: Failed while attempting to \"ng new ${fiddle}\".";
            ;;
        5)  endLog "vueCreateTs: Failed while attempting to update the README.md file.";
            ;;
        6)  endLog "vueCreateTs: Call to createTypingsRcFile failed.";
            ;;
        7)  endLog "vueCreateTs: call to npm install failed.";
            ;;
        8)  endLog "vueCreateTs: Failed while attempting to update favicon.ico file.";
            ;;
        9)  endLog "vueCreateTs: Failed while attempting to update index.html file.";
            ;;
        10) endLog "vueCreateTs: Failed while attempting to install dependencies.";
            ;;
        *)  endLog "vueCreateTs: F U B A R ~ Something went wrong."
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
        2)  endLog "_create.sh: vueCreate() failed";
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
  
  fiddleName="$1";
  fiddleSubDir="../fiddles/angular/$1";
  fiddleTemplateDir="../fiddles/angular/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};

  # try
  (
      nvmInstall || exit $?;
      ngInstall || exit $?;
      if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
      cd ../fiddles/angular;
      ngCreate ${fiddleName} ${bornOnDate} || exit 2;
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};


}

