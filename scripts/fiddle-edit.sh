#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 12/12/2016______________________________________________________________|
#  Description             : UTILITY USED TO EDIT FIDDLES USING THE JOE TEXT EDITOR__________________|
#  Command line Arguments  : $1 = FIDDLE TYPE________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 12/12/2016 - Baseline Ver ~ See CHANGELOG @ 201612120420
# 12/15/2016 - See CHANGELOG @ 201612120420
# 10/17/2021 - See CHANGELOG @ 358_react_16-25
# ---------------------------------------------------------------------------------------------------|
source bin/_utils.sh
source bin/_types.sh
clear;
this=$(echo "$0" | sed 's/\.\///g');
_path=$(pwd;)  # Capture Path
_bin="${_path}/bin"
_type=$(echo $1);
_fiddleCriteria=$(echo $2);
_fiddle=$(getFiddle "${_type}" "${_fiddleCriteria}";);
_fiddleSubDir="../fiddles/${_type}";
_fiddleRoot="${_fiddleSubDir}/${_fiddle}";
_projectName=${_fiddle};
_port=1841;

function isJoeInstalled() {
    if [[ ! $(which joe;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function installJoeEditor() {
    path=$1;
    installed=$(isJoeInstalled;);
    if [[ "${installed}" == "false" ]]
    then
        echo -e ""
        echo -e "In order to use the edit you must install \"Joe's Own Editor\"";
        echo -e "";
        if [[ "${OSTYPE}" -ne "cygwin" ]]
        then
            read -p "Do you want to install it now? [Y/n] " CMD;
            if [[ ${CMD} == "n" ]]; then exit 0; fi
            brew install joe || exit $?;
        else
            echo -e "Please visit \"http://joe-editor.sourceforge.net/\" for instructions on how to install the editor.";
            startTerminal ${path};
            exit 0;
        fi
    fi
}

function startTerminal() {
  echo -e "Starting secondary terminal @ $1";
  open -a Terminal $1;
}

function editFiddle() {
    case $1 in
        'c')
            installJoeEditor ${_fiddleRoot} || exit $?;
            source bin/c/.gccrc;
            source bin/c/_edit.sh;
            cd ${_fiddleRoot};
            gccEdit
            ;;
        'javac')
            installJoeEditor ${_fiddleRoot} || exit $?;
            source bin/javac/.javacrc;
            source bin/javac/_edit.sh;
            cd ${_fiddleRoot};
            javacEdit
            ;;
        *)  startTerminal ${_fiddleRoot};
            ;;
    esac
}

function catch() {
    case $1 in
        0)  endLog "${this}";
            ;;
        86) clear
            voidShowTitle ${thisFile};
            echo "";
            echo "Nope ~ Incorrect number of arguments";
            echo "";
            echo "Usage:";
            echo "";
            echo "$0 \"[t]\"";
            echo "";
            echo "[t] - type. Valid types include: ";
            echo "";
            voidEchoFiddleTypes "edit";
            echo "";
            ;;
        *)  endLog "fubar! Something went wrong."
            ;;
    esac
    exit $1
}


#try
(
    if [[ "$#" -ne 2 ]]
    then
        exit 86;
    fi
    editFiddle ${_type} || exit $?;
)
rc=$?; catch ${rc};
# finally
exit ${rc};

