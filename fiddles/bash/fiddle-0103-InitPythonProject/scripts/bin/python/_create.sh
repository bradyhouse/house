#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 12/11/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/PYTHON DIRECTORY_____|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 201611280420
# 07/09/2024 - See CHANGELOG @ 1901_python_init
# ---------------------------------------------------------------------------------------------------|


function initPy() {
    mkdir .venv
    export PIPENV_VENV_IN_PROJECT=1

    # Install and set the Python version
    pipenv --python $PYTHON_VERSION

    # Load base packages
    pipenv install pytest --dev
    pipenv install jupyter

    # Create project structure
    mkdir -p config source test utils
    touch config/__init__.py source/__init__.py test/__init__.py utils/__init__.py

}

function create() {
  if [ "$#" -ne 1 ]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit
  fi

  fiddleSubDir="python"
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate}

  #try
  (
      # Check if pyenv is installed
    if ! command -v pipenv &> /dev/null
    then
        exit 3
    fi

    if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
    $(cp -rf "../fiddles/${fiddleSubDir}/template" "../fiddles/${fiddleSubDir}/$1") || exit 1
    $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/README.md";) || exit 2
    $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "../fiddles/${fiddleSubDir}/$1/README.md";) || exit 2
    
    
    cd "../fiddles/${fiddleSubDir}/$1"
    
    initPy || exit 4
  )
  #catch
  rc=$?
  case ${rc} in
    0)  echo "Done. The \"../fiddles/${fiddleSubDir}/$1\" directory has been initialized."
        ;;
    1)  echo "foo bar! failed to create the \"../fiddles/${fiddleSubDir}/$1\" directory."
        ;;
    2)  echo "foo bar! failed trying to update the \"../fiddles/${fiddleSubDir}/$1/app.js\" file."
        if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
        ;;
    3)  echo "pipenv could not be found. Please install pipenv first."
        ;;
    4)  echo "initPy: project initialization failed."
        cd "../../../scripts/"
        if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
        ;;
    *)  echo "foo bar! Something went wrong."
        if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
        ;;
  esac
  #finally
  exit ${rc}
}
