#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 08/01/2018______________________________________________________________|
#  Description             : MASTER REACT BUILD FUNCTION_____________________________________________|
#  Entry Point             : build___________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-build.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 006_fiddle_react
# 04/11/2019 - See CHANGELOG @ 300_react_15
# ---------------------------------------------------------------------------------------------------|

function nvmInstall() {
  groupLog "nvmInstall";

  if [[ -d ${NVM_DIR} ]]
  then
    source ${NVM_DIR}/nvm.sh;
    nvm install ${NVM_VERSION};
  else
    return 3;
  fi
}

function catch() {
    case $1 in
        0)  endLog "Build complete.";
            ;;
        *)  endLog "fubar! Something went wrong.";
            ;;
    esac
    return $1
}

function reactBuild() {
    groupLog "reactBuild";
    fiddle=$1;
    # try
    (
        cd ${fiddle};
        if [[ ! -d "node_modules" ]]
        then
          npm install || exit 1;
        fi

        npm run build || exit 1;
        cd "../dist";
        if [[ -d "${fiddle}" ]]
        then
          rm -rf "${fiddle}";
        fi
        mkdir "${fiddle}";
        cd "../${fiddle}";
        $(voidSubstr 'href="/manifest.json"' 'href="manifest.json"' "build/index.html";) || exit 1;
        $(voidSubstr 'href="/favicon.ico"' 'href="favicon.ico"' "build/index.html";) || exit 1;
        $(voidSubstr 'href="/static' 'href="static' "build/index.html";) || exit 1;
        $(voidSubstr 'src="/static' 'src="static' "build/index.html";) || exit 1;

        cp -rf build/* "../dist/${fiddle}";
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
    return ${rc};
}


function build() {
  groupLog "build";

  if [[ "$#" -ne 1 ]]
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
      cd ../fiddles/react;

      if [[ ! -d "dist" ]]
      then
        mkdir dist;
      else
         if [[ -d "dist/$1" ]]; then rm -R "dist/$1"; fi
      fi
      nvmInstall || exit $?;
      reactBuild $1 || exit $?;
  )

  # catch
  rc=$?; catch ${rc};

  #finally
  return ${rc};

}
