#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : MASTER AURELIA CREATE FUNCTION__________________________________________|
#  Entry Point             : aureliaCreate___________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-aurelia.sh____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605180420
# ---------------------------------------------------------------------------------------------------|


function downloadKit() {
    groupLog "downloadKit";
    if [[ -e "kit-es2016.zip" ]]
    then
        rm -rf kit-es2016.zip;
    fi
    curl "http://aurelia.io/downloads/kit-es2016.zip" -o kit-es2016.zip
}

function unzipKit() {
    groupLog "unzipKit";
    if [[ -d "$1" ]]; then rm -rf "$1"; fi
    if [[ -e "kit-es2016.zip" ]]
    then
        unzip kit-es2016.zip -d $1 || exit $?;
    else
        exit -1;
    fi
}

function addReadme() {
    groupLog "addReadme";
    cp -rf ../template/README.markdown README.md || exit $?;
    $(voidSubstr '{{FiddleName}}' $1 "README.md";) || exit $?;
    $(voidSubstr '{{BornOnDate}}' $2 "README.md";) || exit $?;
}

function addIndex() {
    groupLog "addIndex";
    cp -rf ../template/index.html index.html || exit $?;
    $(voidSubstr '{{FiddleName}}' $1 "index.html";) || exit $?;
}

function addFavicon() {
    groupLog "addFavicon";
    cp -rf ../template/favicon.ico favicon.ico || exit $?;
}

function removeKit() {
    groupLog "removeKit";
    if [[ -e "kit-es2016.zip" ]]
    then
        rm -rf "kit-es2016.zip" || exit $?;
    fi
}
function cleanup() {
    groupLog "cleanup";
    if [[ -d "index.html" ]]; then rm -rf "index.html"; fi
    if [[ -d "__MACOSX" ]]; then rm -rf "__MACOSX"; fi
    if [[ -e "favicon.ico" ]]; then rm -rf "favicon.ico"; fi
}

function aureliaCreate() {
    groupLog "aureliaCreate";
    fiddle=$1;
    bornOnDate=$2;
    # try
    (
        downloadKit  || exit 1;
        unzipKit "${fiddle}" || exit 2;
        removeKit || exit 3;
        cleanup "${fiddle}" || exit 4;
        cd ${fiddle};
        addReadme "${fiddle}" "${bornOnDate}" || exit 5;
        addIndex "${fiddle}" || exit 6;
        addFavicon || exit 7;
        npm install || exit 8;
    )
    # catch
    rc=$?; case ${rc} in
        0)  echo "";
            ;;
        1)  echo "aureliaCreate: Failed while attempting to download http://aurelia.io/downloads/kit-es2016.zip.";
            ;;
        2)  echo "aureliaCreate: Failed while attempting to unzip the \"kit-es2016.zip\" file.";
            ;;
        3)  echo "aureliaCreate: call to the \"deleteKit()\" function failed.";
            ;;
        4)  echo "aureliaCreate: call to the \"cleanup()\" function failed.";
            ;;
        5)  echo "aureliaCreate: call to the \"addReadme()\" function failed.";
            ;;
        6)  echo "aureliaCreate: call to the \"addFavicon()\" function failed.";
            ;;
        7)  echo "aureliaCreate: call to the \"addIndex()\" function failed.";
            ;;
        8)  echo "aureliaCreate: command \"npm install\" failed.";
            ;;
        9)  echo "aureliaCreate: call to the \"aureliaDevInstall()\" function failed.";
            ;;
        *)  echo "aureliaCreate: F U B A R ~ Something went wrong."
            ;;
    esac
    return ${rc};
}