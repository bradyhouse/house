#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/19/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/AURELIA DIRECTORY____|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201611280420
# 01/24/2018 - See CHANGELOG @ aurelia-dependencies-update
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

function auCreate() {
    groupLog "auCreate";
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

        mkdir "${fiddle}";
        cd "${fiddle}";
        au new ${appName} --here || exit 2;
        npm link aurelia-cli || exit 2;

        if [[ -e .gitignore ]]
        then
            rm -rf .gitignore;
        fi
        cp -rf ../template/README.md README.md || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
        createTypingsRcFile || exit 6;
        rm -rf favicon.ico || exit 8;
        cp -rf ../template/favicon.ico favicon.ico || exit 8;
        rm -rf index.html || exit 9;
        cp -rf ../template/index.html index.html || exit 9;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "index.html";) || exit 9;
        $(voidSubstr '{{Author}}' ${AUTHOR} "index.html";) || exit 9;
        rm -rf src/main.js || exit 10;
        cp -rf ../template/main.js src || exit 10;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/main.js";) || exit 11;

    )
    # catch
    rc=$?; case ${rc} in
        0)  endLog "";
            ;;
        1)  endLog "auCreate: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  endLog "auCreate: Failed while attempting to \"ng new ${fiddle}\".";
            ;;
        5)  endLog "auCreate: Failed while attempting to update the README.md file.";
            ;;
        6)  endLog "auCreate: Call to createTypingsRcFile failed.";
            ;;
        7)  endLog "auCreate: call to npm install failed.";
            ;;
        8)  endLog "auCreate: Failed while attempting to update favicon.ico file.";
            ;;
        9)  endLog "auCreate: Failed while attempting to update index.html file.";
            ;;
        10)  endLog "auCreate: Failed while attempting to update src/main.js file.";
            ;;
        11)  endLog "auCreate: Failed while attempting to update src/meta.js file.";
            ;;
        *)  endLog "auCreate: F U B A R ~ Something went wrong."
            ;;
    esac
    exit ${rc};
}

function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
            ;;
        1)  endLog "_install.sh: auInstall() failed";
            ;;
        2)  endLog "_create.sh: auCreate() failed";
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

  fiddleSubDir="../fiddles/aurelia/$1";
  fiddleTemplateDir="../fiddles/aurelia/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};

  # try
  (
      if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
      cd ../fiddles/aurelia;
      nvmInstall || exit $?;
      auInstall || exit 1;
      auCreate $1 ${bornOnDate} || exit 2;
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}
