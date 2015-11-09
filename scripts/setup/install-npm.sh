#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 10/29/2015______________________________________________________________|
#  Description             : UTILITY THAT CAN BE USED TO INSTALL NPM USING CURL______________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver. ~ See CHANGELOG @ 2015011060420
# ---------------------------------------------------------------------------------------------------|
clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isNpmInstalled() {
    which npm || exit -1
    return 0
}

function isCurlInstalled() {
    which curl || exit -1
    return 0
}
function installNpm() {
    sudo curl -L https://npmjs.com/install.sh -o tmp.sh

    if [[ -e tmp.sh ]]
    then
        sudo chmod 777 tmp.sh || exit 88
        sudo ./tmp.sh || exit 88
        sudo rm -rf tmp.sh || exit 89
    else
        exit 87
    fi

    return 0
}

#try
(
    if [[ ! $(isCurlInstalled;) ]]
    then
        exit 87
    fi

    installNpm;
)
#catch
_rc=$?
case ${_rc} in
    0)
        echo "Npm was successfully installed."
        ;;
    86)
        echo "Browserify is already installed."
        ;;
    87)
        echo "Fubar: Failed trying to download npm install script."
        ;;
    88)
        echo "Fubar: Failed trying to run npm install script."
        ;;
    89)
        echo "Fubar: Failed trying to clean-up the install process."
        ;;
    *)
        echo "Fubar: an unknown error has occurred. The install failed."
        ;;
esac





