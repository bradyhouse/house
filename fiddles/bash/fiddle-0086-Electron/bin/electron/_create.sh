#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER ELECTRON CREATE FUNCTION_________________________________________|
#  Entry Point             : electronCreate__________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-electron.sh___________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# ---------------------------------------------------------------------------------------------------|

this=$0;

function stripLine() {
    file=$1
    fileTmp="${file}.~"
    searchCriteria=$2

    if [[ -f "${file}" ]]
    then
       cat "${file}" | grep -v "${searchCriteria}" > "${fileTmp}"
       cat "${fileTmp}" > "${file}"
       rm -f "${fileTmp}"
    fi
}

function electronCreate() {
    groupLog "electronCreate";
    fiddle=$1;
    bornOnDate=$2;
    # try
    (
        if [[ -d "${fiddle}" ]]
        then
            rm -rf ${fiddle} || exit 1;
        fi
        $(git clone --depth 1 https://github.com/electron/electron-quick-start ${fiddle};) || exit 2;
        cd ${fiddle};
        rm -rf .github || exit 3;
        rm -rf .git || exit 3;
        rm -rf README.md || exit 4;
        rm -rf .gitignore || exit 8;
        rm -rf LICENSE.md || exit 9;
        cp -rf ../template/README.md README.md || exit 5;
        $(voidSubstr '{{FiddleName}}' ${fiddle} "README.md";) || exit 5;
        $(voidSubstr '{{BornOnDate}}' ${bornOnDate} "README.md";) || exit 5;
        $(voidSubstr 'https://github.com/electron/electron-quick-start.git' 'https://github.com/bradyhouse/house.git' "package.json";) || exit 7;
        $(voidSubstr 'https://github.com/electron/electron-quick-start/issues' 'https://github.com/bradyhouse/house/issues' "package.json";) || exit 7;
        $(voidSubstr 'https://github.com/electron/electron-quick-start#readme' 'https://github.com/bradyhouse/house/blob/master/fiddles/electron/README.markdown' "package.json";) || exit 7;
        $(voidSubstr 'https://github.com/electron/electron-quick-start#readme' 'https://github.com/bradyhouse/house/blob/master/fiddles/electron/README.markdown' "package.json";) || exit 7;
        $(voidSubstr 'electron-quick-start' ${fiddle} "package.json";) || exit 7;
        $(voidSubstr 'GitHub' 'bradyhouse@gmail.com' "package.json";) || exit 7
        $(voidSubstr 'GitHub' 'bradyhouse@gmail.com' "package.json";) || exit 7
        $(voidSubstr 'CC0-1.0' 'MIT' "package.json";) || exit 7
        $(voidSubstr 'tutorial' 'node' "package.json";) || exit 7
        stripLine "package.json" "quick" || exit 7
        npm install || exit 9;
    )
    # catch
    rc=$?; case ${rc} in
        0)  echo ""
            ;;
        1)  endLog "${this}: Failed while attempting to remove the existing \"${fiddle}\" directory.";
            ;;
        2)  endLog "${this}: Failed while attempting to clone angular2-seeder repo";
            ;;
        3)  endLog "${this}: Failed while attempting to remove the \".github\" and \".git\" directories.";
            ;;
        4)  endLog "${this}: Failed while attempting to remove extraneous files.";
            ;;
        5)  endLog "${this}: Failed while attempting to update the README.md file.";
            ;;
        6)  endLog "${this}: Failed while attempting to run \"npm install\".";
            ;;
        7)  endLog "${this}: Failed while attempting to update \"package.json\"";
            ;;
        8)  endLog "${this}: Failed while attempting to remove \".gitignore\".";
            ;;
        9)  endLog "${this}: Failed while attempting to remove \"LICENSE.md\".";
            ;;
        *)  endLog "${this}: F U B A R ~ Something went wrong."
            ;;
    esac
    # finally
    echo ${rc};
}


