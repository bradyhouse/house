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

function ngCreate() {
    groupLog "ngCreate";
    fiddle=$1;
    bornOnDate=$2;
    # try
    (
        if [[ -d "${fiddle}" ]]
        then
            rm -rf ${fiddle} || exit 1;
        fi
        ng new ${fiddle} || exit 2;
        cd ${fiddle};
        cp -rf ../template/README.markdown README.md || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
    )
    # catch
    rc=$?; case ${rc} in
        0)  echo "";
            ;;
        1)  echo "ngCreate: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  echo "ngCreate: Failed while attempting to \"ng new ${fiddle}\".";
            ;;
        5)  echo "ngCreate: Failed while attempting to update the README.md file.";
            ;;
        *)  echo "ngCreate: F U B A R ~ Something went wrong."
            ;;
    esac
    exit ${rc};
}

