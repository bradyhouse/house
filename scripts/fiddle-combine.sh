#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 07/26/2015______________________________________________________________|
#  Description             : UTILITY USED TO COMBINE JAVASCRIPTS FILES INTO A SINGLE APP JS FILE_____|
#  Command line Arguments  : $1 = FIDDLE TYPE, $2 = FIDDLE NAME______________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 09/09/2015 - See CHANGELOG @ 201508240420
# 09/23/2015 - See CHANGELOG @ 201509220420
# 12/06/2015 - See CHANGELOG @ 201511100420
# 02/13/2016 - See CHANGELOG @ 201602130420
# 03/02/2016 - See CHANGELOG @ 201603020420
# 04/16/2016 - See CHANGELOG @ 201604160420
# 05/18/2016 - See CHANGELOG @ 201605180420
# ---------------------------------------------------------------------------------------------------|

source bin/_utils.sh
source bin/_types.sh


thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'

fiddleType="??";
fiddleCriteria="??";
appFileName="app.js"
fiddleName=""
fiddlePath=""
appFile=""
srcDir=""
srcFile=""
useClosure=1

if [ "$#" -gt 0 ]; then fiddleType=$1; fi
if [ "$#" -gt 1 ]; then fiddleCriteria="??"; fi
if [ "$#" -gt 2 ]; then appFileName=$3; fi
if [ "$#" -gt 3 ]; then useClosure=$4; fi

function isTscInstalled() {
    if [[ ! $(which tsc;) ]]
    then
        echo -1;
    else
        echo 0;
    fi
}

function whichJsBeautify() {
    which js-beautify
    echo $?
}

function listAndCount() {
    cd ../fiddles/${fiddleType}
    echo $(ls -1 | grep ${fiddleCriteria} | wc -l | sed -e 's/^[[:space:]]*//';)
}

function getFiddle() {
    matches=$(listAndCount;)
    if [[ ${matches} -eq 1 ]]
    then
        cd ../fiddles/${fiddleType};
        echo $(ls -1 | grep ${fiddleCriteria} | sed -e 's/^[[:space:]]*//';);
    else
        echo "";
    fi
}

function listSourceFiles() {
    if [[ -e "src/sequence.conf" ]]
    then
        cat "src/sequence.conf" | sed -e 's/^[[:space:]]*//';
    else
        case $1 in
            'extjs6' | 'extjs5' )
                if [[ -e "src/sequence.conf" ]]
                then
                    cat "src/sequence.conf" | sed -e 's/^[[:space:]]*//';
                else
                    echo $(ls -r1 src | grep -v map | grep -v compiled | grep -v meta | grep -v init | grep -v Application | sort;);
                fi
                ;;
            *)
                echo $(ls -r1 src | grep -v map | grep -v compiled | sort;);
                ;;
        esac
    fi
}

function initAppFile() {

    type=$1;
    appFile=$2;
    closure=$3;

    if [[ -e "${appFile}" ]]
    then
        rm -f "${appFile}";
    fi

    case ${type} in
	    'extjs6' | 'extjs5' )
            if [[ -e "src/meta.js" ]]
            then
                cat "src/meta.js" > "${appFile}";
            fi
            ;;
        *)
            if [[ -e "src/preinit.js" ]]
            then
                cat "src/preinit.js" > "${appFile}";
                echo -e "\n" >> "${appFile}";
                if [[ ${closure} -eq 0 ]]
                then
                    echo "(function (app) {" >> "${appFile}";
                fi
            else
                if [[ ${closure} -eq 0 ]]
                then
                    echo "(function (app) {" > "${appFile}";
                fi
            fi
            if [[ ${closure} -eq 0 ]]
            then
                echo -e "\t\"use strict\";" >> "${appFile}";
            fi
            ;;
    esac
}

function addAppFileBody() {
    type=$1;
    appFile=$2;

    for file in $(listSourceFiles ${type})
    do
        filePath="src/${file}"
        if [[ -e "${filePath}" ]]
        then
            echo -e "\n" >> "${appFile}"
            cat "${filePath}" | grep -v -e '^$' >> "${appFile}"
        fi
    done
}
function completeAppFile() {
    type=$1;
    appFile=$2;
    closure=$3;
    case ${type} in
	    'extjs6' | 'extjs5' )
            if [[ -e "src/init.js" ]]
            then
                cat "src/init.js" >> "${appFile}"
            else
                if [[ -e "src/Application.js" ]]
                then
                    cat "src/Application.js" >> "${appFile}"
                fi
            fi
            ;;
        *)
            if [[ ${closure} -eq 0 ]]
            then
                echo "})(window.app = window.app || {})" >> "${appFile}";
            fi
            ;;
    esac

}

function createAppFile() {
    type=$1;
    appFile=$2;
    closure=$3;

    initAppFile "${type}" "${appFile}" "${closure}" || exit 89
    addAppFileBody "${type}" "${appFile}" || exit 90
    completeAppFile "${type}" "${appFile}" "${closure}" || exit 91
    if [[ $(whichJsBeautify;) ]]
    then
        beautifyAppFile "${appFile}" || exit 92
    else
        echo "warning: js-beautify not installed."
    fi
}

function beautifyAppFile() {
    js-beautify "$1" > "$1~"
    cat "$1~" > "$1"
    rm -r "$1~"
}

function catch() {
    case $1 in
        0)  echo "Combine Source process completed successfully."
            echo "The ${appFileName} file for \"${fiddleName}\" has been updated."
            ;;
        86) echo ""
            echo "Nope ~ Incorrect number of arguments"
            echo ""
            echo "Usage:"
            echo ""
            echo "$0 \"[t]\" \"[f]\" \"[a]\" \"[c]\""
            echo ""
            echo "[t] - type. Valid types include: "
            echo ""
            voidEchoFiddleTypes "combine";
            echo ""
            echo "[f] - existing fiddle name.  For example: \"fiddleParabolaSurface\""
            echo ""
            echo "[a] - (optional) target file name. Defaults to \"app.js\""
            echo ""
            echo "[c] - (optional) disable closure. Defaults to \"1\" (false)"
            echo ""
            ;;
        87) echo "fubar! target fiddle, \"${fiddlePath}\" does not exist."
            ;;
        88) echo "fubar! target fiddle, \"${fiddlePath}\" does not contain a src directory."
            ;;
        89) echo "fubar! initAppFile call failed"
            ;;
        90) echo "fubar! addAppFileBody call failed"
            ;;
        91) echo "fubar! completeAppFile call failed"
            ;;
        92) echo "fubar! Tsc is not installed."
            ;;
        93) echo "fubar! call to \"tsc\" failed."
            ;;
        95) echo "fubar! \"combine\" is not yet supported for the \"${fiddleType}\" type."
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}

fiddleName=$(getFiddle;);
fiddlePath="../fiddles/${fiddleType}/${fiddleName}"
appFile="${fiddlePath}/${appFileName}"
srcDir="${fiddlePath}/src"


#try
(
    if [ "$#" -lt 2 ]; then  exit 86; fi
    if [[ ! -d "${fiddlePath}" ]]; then exit 87; fi
    case ${fiddleType} in
	    'angular2' )
            cd ${fiddlePath};
            createAppFile "${fiddleType}" "${appFileName}" "${useClosure}" || exit $?;
            if [[ ! $(isTscInstalled;) ]]; then exit 92; fi
            tsc -t ES5 --experimentalDecorators --sourceMap --allowJs --allowUnreachableCode --allowSyntheticDefaultImports --suppressImplicitAnyIndexErrors app.ts;
            appFileName=app.js;
            exit 0;
	        ;;
	    'aurelia' | 'd3' | 'extjs5' | 'extjs6' | 'svg' | 'jquery' | 'three' )
	        if [[ ! -d "${srcDir}" ]]; then exit 87; fi
            cd ${fiddlePath};
            createAppFile "${fiddleType}" "${appFileName}" "${useClosure}" || exit $?;
            ;;
        *)
            exit 95
            ;;
    esac
)
#catch
rc=$?; catch ${rc}
#finally
exit ${rc}
