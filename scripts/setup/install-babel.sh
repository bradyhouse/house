#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 10/29/2015______________________________________________________________|
#  Description             : UTILITY THAT CAN BE USED TO INSTALL THE BABEL COMMAND LINE TOOL_________|
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

function isBabelInstalled() {
    which babel || exit -1
    return 0
}


function installBabel() {
    sudo npm install -g babel-cli || exit 1000
    sudo npm install -g babel || exit 1000
    return 0
}

#try
(
    if [[ $(isBabelInstalled;) ]]
    then
        exit 86
    fi
    if [[ ! $(isNpmInstalled;) ]]
    then
        exit 87
    fi

    installBabel;
)
#catch
_rc=$?
case ${_rc} in
    0)
        echo "Babel was successfully installed."
        ;;
    86)
        echo "Babel is already installed."
        ;;
    87)
        echo "Fubar: npm is not installed. Please install npm first."
        ;;
    *)
        echo "Fubar: an unknown error has occurred. The Babel install failed."
        ;;
esac





