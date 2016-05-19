#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER EMBER CREATE FUNCTION____________________________________________|
#  Entry Point             : emberCreate_____________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-ember.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# ---------------------------------------------------------------------------------------------------|

this=$(pwd;);

function emberCreate() {
    groupLog "emberCreate";
    fiddle=$1;
    bornOnDate=$2;
    # try
    (
        if [[ -e "${fiddle}" ]]
        then
            rm -rf "${fiddle}" || exit 1;
        fi
        ember new $1 || exit 2;
        cd ${fiddle};
        cp -rf ../template/README.markdown README.md || exit 3;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 3;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 3;
    )
    # catch
    rc=$?; case ${rc} in
        0)  echo "";
            ;;
        1)  echo "${this}: attempt to remove the existing directory failed";
            ;;
        2)  echo "${this}: Call to ember CLI \"new\" failed";
            ;;
        3)  echo "${this}: Readme file update failed";
            ;;
        *)  echo "${this}: F U B A R ~ Something went wrong."
            ;;
    esac
    return ${rc};
}
