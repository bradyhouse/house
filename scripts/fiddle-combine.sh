#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
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
# ---------------------------------------------------------------------------------------------------|


thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'

fiddleType=$1
fiddleCriteria=$2
appFileName="app.js"
fiddleName=""
fiddlePath=""
appFile=""
srcDir=""
srcFile=""
useClosure=1

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
            echo -e "\t\"angular\"\tAngular Fiddle"
            echo -e "\t\"angular2\"\tAngular 2 Fiddle"
            echo -e "\t\"extjs5\"\tExt JS 5 Fiddle"
            echo -e "\t\"extjs6\"\tExt JS 6 Fiddle"
            echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
            echo -e "\t\"three\"\t\tthree.js / WebGl Fiddle"
            echo -e "\t\"svg\"\t\tScalar Vector Graphic Fiddle"
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
    # Verify parameter count is 2
    if [ "$#" -lt 2 ]; then  exit 86; fi
    # Verify the fiddle exists
    if [[ ! -d "${fiddlePath}" ]]; then exit 87; fi
    # Verify type parameter
	case ${fiddleType} in
	    'angular2' )
	        if [[ ! $(isTscInstalled;) ]]; then exit 92; fi
            cd ${fiddlePath};
            tsc || exit 93;
	        ;;
	    'extjs5' | 'extjs6' | 'svg' | 'jquery' | 'three' )
	        # Verify the src directory exists
            if [[ ! -d "${srcDir}" ]]; then exit 87; fi
            cd ${fiddlePath};
            createAppFile "${fiddleType}" "${appFileName}" "${useClosure}" || exit $?;
            ;;
        *)
            exit 86
            ;;
    esac
)
catch $?

#finally
exit $?





