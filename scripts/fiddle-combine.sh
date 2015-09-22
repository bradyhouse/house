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
# 09/09/2015 - Baseline ~ See CHANGELOG.markdown @ 201508240420
# ---------------------------------------------------------------------------------------------------|


thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'


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
    if [[ -e "app.js" ]]
    then
        sudo rm -f "app.js";
    fi

    case $1 in
	    'extjs6' | 'extjs5' )
            if [[ -e "src/meta.js" ]]
            then
                cat "src/meta.js" > "app.js";
            fi
            ;;
        *)
            echo "(function (app) {" > "app.js";
            echo -e "\t\"use strict\";" >> "app.js";
            ;;
    esac
}

function addAppFileBody() {
    for file in $(listSourceFiles $1)
    do
        filePath="src/${file}"
        if [[ -e "${filePath}" ]]
        then
            #echo -e "\n" >> "app.js"
            cat "${filePath}" | grep -v -e '^$' >> "app.js"
        fi
    done
}
function completeAppFile() {
    case $1 in
	    'extjs6' | 'extjs5' )
            if [[ -e "src/init.js" ]]
            then
                cat "src/init.js" >> "app.js"
            else
                if [[ -e "src/Application.js" ]]
                then
                    cat "src/Application.js" >> "app.js"
                fi
            fi
            ;;
        *)
            echo "})(window.app = window.app || {})" >> "app.js";
            ;;
    esac

}

function createAppFile() {
    initAppFile "${fiddleType}" || exit 89
    addAppFileBody "${fiddleType}" || exit 90
    completeAppFile "${fiddleType}" || exit 91
}

fiddleType=$1
fiddleCriteria=$2
fiddleName=$(getFiddle;);
fiddlePath="../fiddles/${fiddleType}/${fiddleName}"
appFile="${fiddlePath}/app.js"
srcDir="${fiddlePath}/src"
srcFile=""

#try
(
	# Verify parameter count is 2
	if [ "$#" -ne 2 ]; then  exit 86; fi

    # Verify type parameter
	case ${fiddleType} in
	    'extjs6' | 'svg' | 'jquery' | 'three' )
	        # Verify the fiddle exists
            if [[ ! -d "${fiddlePath}" ]]; then exit 87; fi

            # Verify the src directory exists
            if [[ ! -d "${srcDir}" ]]; then exit 87; fi
            cd ${fiddlePath};
            createAppFile || exit $?;
            ;;
        *)
            exit 86
            ;;

    esac
)
#catch
_rc=$?
case ${_rc} in
    0)  echo "Combine Source process completed successfully."
        echo "The app.js file for \"${fiddleName}\" has been updated."
        ;;
    86) echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[f]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        echo -e "\t\"extjs5\"\tExt JS 5 Fiddle"
        echo -e "\t\"extjs6\"\tExt JS 6 Fiddle"
        echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
        echo -e "\t\"three\"\t\tthree.js / WebGl Fiddle"
        echo -e "\t\"svg\"\t\tScalar Vector Graphic Fiddle"
        echo ""
        echo "[f] - existing fiddle name.  For example: \"fiddleParabolaSurface\""
        echo ""
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
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}





