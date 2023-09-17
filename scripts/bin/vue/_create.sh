#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/30/2023______________________________________________________________|
#  Description             : MASTER VUE CREATE FUNCTION______________________________________________|
#  Entry Point             : create__________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-create.sh_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 723-add-vuejs-support
# ---------------------------------------------------------------------------------------------------|


function npmInstallDep() {
  groupLog "npmInstallDep";
  npm install --save bootstrap jquery popper.js || exit 10;
}

function toSuffix() {
    case $1 in
        'ts')
            echo "Ts"
            ;;    
        *)            
            echo "Js"
            ;;
    esac
}

function vueCreateJs() {
    groupLog "vueCreateJs";
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

        if [[ "${appName}" == "templateJs" ]]
        then
            appName="fiddle";
        fi
        cp -r template/js ${fiddle};
        cd ${fiddle};

        if [[ -e .gitignore ]]
        then
            rm -r .gitignore;
        fi
        
        $(voidSubstr '{{FiddleName}}' ${fiddle} "index.html";) || exit 5;
        $(voidSubstr '{{Author}}' ${AUTHOR} "index.html";) || exit 5;

        $(voidSubstr '{{FiddleName}}' ${fiddle} "vite.config.js";) || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "package.json";) || exit 5;

        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/App.vue";) || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/components/TopNav.vue";) || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/router/index.js";) || exit 5;
        
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;

        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/assets/README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "src/assets/README.md";) || exit 5;
 
       

        npmInstallDep || exit $?;
    )
    # catch
    rc=$?; case ${rc} in
        0)  endLog "";
            ;;
        1)  endLog "vueCreateJs: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  endLog "vueCreateJs: Failed while attempting to \"ng new ${fiddle}\".";
            ;;
        5)  endLog "vueCreateJs: Failed while attempting to update the README.md file.";
            ;;
        6)  endLog "vueCreateJs: Call to createTypingsRcFile failed.";
            ;;
        7)  endLog "vueCreateJs: call to npm install failed.";
            ;;
        8)  endLog "vueCreateJs: Failed while attempting to update favicon.ico file.";
            ;;
        9)  endLog "vueCreateJs: Failed while attempting to update index.html file.";
            ;;
        10) endLog "vueCreateJs: Failed while attempting to install dependencies.";
            ;;
        *)  endLog "vueCreateJs: F U B A R ~ Something went wrong."
            ;;
    esac
    exit ${rc};
}

function vueCreateTs() {
    groupLog "vueCreateTs";
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

        if [[ "${appName}" == "templateTs" ]]
        then
            appName="fiddle";
        fi

        cp -r template/ts ${fiddle};

        cd ${fiddle};
 
        if [[ -e .gitignore ]]
        then
            rm -r .gitignore;
        fi

        $(voidSubstr '{{FiddleName}}' ${fiddle} "index.html";) || exit 5;
        $(voidSubstr '{{Author}}' ${AUTHOR} "index.html";) || exit 5;

        $(voidSubstr '{{FiddleName}}' ${fiddle} "vite.config.ts";) || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "package.json";) || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/App.vue";) || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/components/TopNav.vue";) || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/router/index.ts";) || exit 5;
        
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;

        $(voidSubstr '{{FiddleName}}' ${fiddle} "src/assets/README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "src/assets/README.md";) || exit 5;
 
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
  if [ "$#" -ne 2 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name and type (js or ts) of the new fiddle"
        exit 59
  fi

  clear;
  echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
  echo "Bash version ${BASH_VERSION}..."

  type=$(toLowerCase "$2";);
  suffix=$(toSuffix "${type}");  
  fiddleName="$1${suffix}";
  fiddleSubDir="../fiddles/vue/${fiddleName}";
  fiddleTemplateDir="../fiddles/vue/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};
  if [[ $1 != "fiddle-0000-Template" ]]
  then
      $(echo "* Added [fiddles/vue/${fiddleName}](fiddles/vue/${fiddleName})" >> "../${CHANGE_LOG}") || exit 96
  fi

  # try
  (
    nvmInstall || exit $?;
    cd ../fiddles/vue;
    if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
    case ${type} in
        'ts')
            vueCreateTs ${fiddleName} ${bornOnDate} || exit 2;
            ;;    
        *)            
            vueCreateJs ${fiddleName} ${bornOnDate} || exit 2;
            ;;
    esac  
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}

