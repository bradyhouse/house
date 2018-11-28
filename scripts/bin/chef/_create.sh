#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/21/2018______________________________________________________________|
#  Description             : MASTER CHEF CREATE FUNCTION_____________________________________________|
#  Entry Point             : create__________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-create.sh_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 262_add_chef_setup
# ---------------------------------------------------------------------------------------------------|

source _install.sh;


function chefCreate() {
    groupLog "chefCreate";
    _fiddleDir=$1;
    _rawAppName=$(subDelimStr ${_fiddleDir} "-" "2";);
    _appName=$(toLowerCase ${_rawAppName};);
    _bornOnDate=$2;
    # try
    (
        chef generate cookbook "${_fiddleDir}" || exit $?;

        if [[ -d "${_fiddleDir}" ]]
        then
          cd "${_fiddleDir}";
          cp -rf ../template/.kitchen.yml .kitchen.yml || exit $?;
          $(voidSubstr '{{FiddleName}}' ${_fiddleDir} ".kitchen.yml";) || exit $?;
          $(voidSubstr '{{DriverName}}' ${__CHEF_KITCHEN_DRIVER_NAME} ".kitchen.yml";) || exit $?;
          $(voidSubstr '{{PlatformName}}' ${__CHEF_KITCHEN_PLATFORM_NAME} ".kitchen.yml";) || exit $?;
          $(voidSubstr '{{PlatformDriverBox}}' ${__CHEF_KITCHEN_PLATFORM_DRIVER_BOX} ".kitchen.yml";) || exit $?;
          $(voidSubstr '{{PlatformDriverBoxUrl}}' ${__CHEF_KITCHEN_PLATFORM_DRIVER_BOX_URL} ".kitchen.yml";) || exit $?;

          if [[ "${__CHEF_COOKBOOK_IS_LOGIN_SPLASH}" == "true" ]]
          then
            chef generate file motd || exit $?;
            cp -rf ../template/motd files/default || exit $?;
            $(voidSubstr '{{FiddleName}}' ${_fiddleDir} "files/default/motd";) || exit $?;
            cp -rf ../template/default.rb "recipes/default.rb" || exit $?;
            $(voidSubstr '{{AuthorName}}' "${AUTHOR_NAME}" "recipes/default.rb";) || exit $?;
            $(voidSubstr '{{FiddleName}}' ${_fiddleDir} "recipes/default.rb";) || exit $?;
            _YEAR=$(date +%Y);
            $(voidSubstr '{{Year}}' "${_YEAR}" "recipes/default.rb";) || exit $?;
          fi

          cp -rf ../template/README.md . || exit $?;
          $(voidSubstr '{{FiddleName}}' $1 "README.md";) || exit $?
          $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit $?
          $(voidSubstr '{{DriverName}}' ${__CHEF_KITCHEN_DRIVER_NAME} "README.md";) || exit $?;
          $(voidSubstr '{{PlatformName}}' ${__CHEF_KITCHEN_PLATFORM_NAME} "README.md";) || exit $?;

          cp -rf ../template/LICENSE . || exit $?;
          $(voidSubstr '{{AuthorName}}' "${AUTHOR_NAME}" "LICENSE";) || exit $?;


        fi

    )
    # catch
    rc=$?; case ${rc} in
        0)  endLog "";
            ;;
        *)  endLog "chefCreate: F U B A R ~ Something went wrong."
            ;;
    esac
    exit ${rc};
}

function catch() {
    case $1 in
        0)  endLog "\"${fiddleSubDir}\" created.";
            ;;
        *)  endLog "fubar! Something went wrong.";
            ;;
    esac
    exit $1
}

function create() {
  if [[ "$#" -ne 1 ]]
  then
        echo "Incorrect number of arguments"
        echo "Please specify the name of the new fiddle"
        exit 59
  fi

  clear;
  echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
  echo "Bash version ${BASH_VERSION}..."

  fiddleSubDir="../fiddles/chef/$1";
  fiddleTemplateDir="../fiddles/chef/template";
  bornOnDate=$(date +"%m-%d-%y";)
  echo ${bornOnDate};

  # try
  (
      if [[ -d "${fiddleSubDir}" ]]; then rm -R "${fiddleSubDir}"; fi
      cd ../fiddles/chef;
       _rootDir=$(pwd;);
       _templateDir="${_rootDir}/template";
      kitchenInit ${_rootDir} || exit $?;
      updateKitchenYml ${_templateDir} ${_rootDir} || exit $?;
      chefCreate $1 ${bornOnDate} || exit $?;
  )
  # catch
  rc=$?; catch ${rc};

  #finally
  exit ${rc};

}

