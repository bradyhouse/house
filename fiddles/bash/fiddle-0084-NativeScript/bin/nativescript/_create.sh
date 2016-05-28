#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER NATIVESCRIPT CREATE FUNCTION_____________________________________|
#  Entry Point             : nativescriptCreate______________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-nativescript.sh_______________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# ---------------------------------------------------------------------------------------------------|

this=$0;
function nativescriptCreate() {
    fiddle=$1;
    # try
    (
        if [[ -d "${fiddle}" ]]
        then
            rm -rf ${fiddle} || exit 1;
        fi

        $(git clone --depth 1 https://github.com/NathanWalker/angular2-seed-advanced.git ${fiddle};) || exit 2;
        cd ${fiddle};
        rm -rf .github || exit 3;
        rm -rf .git || exit 3;
        rm -rf README.md || exit 4;
        rm -r LICENSE || exit 4;
        rm -rf .editorconfig || exit 4;
        cp -rf ../template/README.md README.md || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
        nvm use 5.0;
        npm install;
    )
    # catch
    rc=$?; case ${rc} in
        0)  echo ""
            ;;
        1)  groupLog "${this}: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  groupLog "${this}: Failed while attempting to clone angular2-seeder repo";
            ;;
        3)  groupLog "${this}: Failed while attempting to remove the \".github\" and \".git\" directories.";
            ;;
        4)  groupLog "${this}: Failed while attempting to remove extraneous files file.";
            ;;
        5)  groupLog "${this}: Failed while attempting to update the README.md file.";
            ;;
        6)  groupLog "${this}: Failed while attempting to run \"npm install\".";
            ;;
        *)  groupLog "${this}: F U B A R ~ Something went wrong."
            ;;
    esac
    # finally
    echo ${rc};
}


