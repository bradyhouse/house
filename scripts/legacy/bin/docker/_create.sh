#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER DOCKER CREATE FUNCTION___________________________________________|
#  Entry Point             : ngCreate________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../../fiddle-docker.sh__________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# 12/11/2016 - See CHANGELOG @ 201611280420
# ---------------------------------------------------------------------------------------------------|

this=$0;

function dockerCreate() {
    groupLog "dockerCreate";
    fiddleSubDir="docker";
    bornOnDate=$2;
    #try
    (
        if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
        $(cp -rf "../fiddles/${fiddleSubDir}/template" "../fiddles/${fiddleSubDir}/$1") || exit 1;
        $(voidSubstr '{{FiddleName}}' $1 "../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 2;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 2;
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
        *)  echo "foo bar! Something went wrong."
            if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
            ;;
    esac
    #finally
    exit ${rc}
}

function catch() {
    case $1 in
        0)  endLog "environment configured";
            ;;
        1)  endLog "${this}: call to brewUpdate failed.";
            ;;
        2)  endLog "${this}: call to brewInstallCask failed.";
            ;;
        3)  endLog "${this}: call to brewInstallVirtualbox failed.";
            ;;
        4)  endLog "${this}: call to brewInstallDocker failed.";
            ;;
        5)  endLog "${this}: call to brewInstallDockerMachine failed.";
            ;;
        6)  endLog "${this}: call to dockerCreate failed.";
            ;;
        *)  endLog "${this}: Something went wrong."
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

  fiddleSubDir="../fiddles/docker/$1";
  fiddleTemplateDir="../fiddles/docker/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};

  # try
  (
      brewUpdate || exit 1;
      brewInstallBrewCask || exit 2;
      brewInstallVirtualbox || exit 3;
      brewInstallDocker || exit 4;
      brewInstallDockerMachine || exit 5;
      dockerCreate "$1" "${bornOnDate}" || exit 6;
  )
  # catch
  rc=$?; catch ${rc};
  # finally
  exit ${rc};

}
