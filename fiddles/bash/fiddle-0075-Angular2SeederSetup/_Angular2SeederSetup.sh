#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function seedAngular2Fiddle() {
    fiddle=$1;
    # try
    (
        if [[ -d "${fiddle}" ]]
        then
            rm -rf ${fiddle} || exit 1;
        fi

        $(git clone --depth 1 https://github.com/mgechev/angular2-seed.git ${fiddle};) || exit 2;
        cd ${fiddle};
        rm -rf .github || exit 3;
        rm -rf .git || exit 3;
        rm -rf README.md || exit 4;
        rm -r LICENSE || exit 4;
        rm -rf .editorconfig || exit 4;

        npm install || exit 5;
    )
    # catch
    rc=$1; case ${rc} in
        0)  echo ""
            ;;
        1)  echo "seedAngular2Fiddle: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  echo "seedAngular2Fiddle: Failed while attempting to clone angular2-seeder repo";
            ;;
        3)  echo "seedAngular2Fiddle: Failed while attempting to remove the \".github\" and \".git\" directories.";
            ;;
        4)  echo "seedAngular2Fiddle: Failed while attempting to remove extraneous files file.";
            ;;
        5)  echo "seedAngular2Fiddle: Failed while attempting to run \"npm install\".";
            ;;
        *)  echo "seedAngular2Fiddle: F U B A R ~ Something went wrong."
            ;;
    esac
    exit ${rc};
}
