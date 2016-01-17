#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO "SAFELY" DELETE A FIDDLE SUB-DIRECTORY__________________|
#  Command line Arguments  : $1 = FIDDLE TYPE, $2 = FIDDLE NAME______________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 04/15/2015 - See CHANGELOG @ 201504151810
# 05/01/2015 - See CHANGELOG @ 201505011810
# 05/08/2015 - See CHANGELOG @ 201505061810
# 06/20/2015 - See CHANGELOG @ 201506200420
# 07/05/2015 - See CHANGELOG @ 201506290420
# 07/11/2015 - See CHANGELOG @ 201507110420
# 07/26/2015 - See CHANGELOG @ 201507260420
# 09/10/2015 - See CHANGELOG @ 201508240420
# 09/23/2015 - See CHANGELOG @ 201509220420
# 11/26/2015 - See CHANGELOG @ 201511100420
# 01/17/2016 - See CHANGELOG @ 201601100420
# ---------------------------------------------------------------------------------------------------|
thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'

function listAndCount() {
    cd ../fiddles/${fiddleType}
    echo $(ls -1 | grep ${fiddleCriteria} | wc -l | sed -e 's/^[[:space:]]*//';)
}

function updateChangeLog() {
    changeLogFile=$1
    changeLogFileTmp="${changeLogFile}.~"
    fiddleName=$2
    if [[ -f "${changeLogFile}" ]]
    then
       cat "${changeLogFile}" | grep -v "${fiddleName}" > "${changeLogFileTmp}"
       cat "${changeLogFileTmp}" > "${changeLogFile}"
       rm -f "${changeLogFileTmp}"
    fi
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

fiddleType=$1
fiddleCriteria=$2
fiddleName=$(getFiddle;);
fiddlePath="../fiddles/${fiddleType}/${fiddleName}"
changeLogFile="../CHANGELOG.markdown"

#try
(
	if [ "$#" -ne 2 ]; then  exit 86; fi

    if [[ ! -d "${fiddlePath}" ]]; then exit 89; fi

    case ${fiddleType} in
        'angular' | 'ant' | 'compass' | 'extjs5' | 'extjs6' | 'jquery' | 'three' | 'php' | 'python' | 'dojo' | 'chrome' | 'node' | 'tween' | 'bash' | 'svg' )
        if [[ -d "${fiddlePath}" ]]
        then
            rm -r "${fiddlePath}" || exit 87
        fi
        case ${fiddleType} in
            'angular' | 'compass' | 'extjs5' | 'extjs6' | 'jquery' | 'three' | 'php' | 'dojo' | 'tween' | 'svg' )
                ./fiddle-index.sh ${fiddleType} || exit 88
            ;;
        esac
        ;;
        *)
            exit 86
    esac

    updateChangeLog "${changeLogFile}" "${fiddleName}" || exit 90

)
#catch
_rc=$?
case ${_rc} in
    0)  echo "The \"${fiddleName}\" ${fiddleType} fiddle has been deleted successfully."
        ;;
    86) echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[n]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        echo -e "\t\"angular\"\t\tAngular Fiddle"
        echo -e "\t\"ant\"\t\tAnt Fiddle"
        echo -e "\t\"bash\"\t\tBash Fiddle"
        echo -e "\t\"compass\"\tCompass Fiddle"
        echo -e "\t\"dojo\"\t\tDojo Fiddle"
        echo -e "\t\"extjs5\"\t\tExt JS 5 Fiddle"
        echo -e "\t\"extjs5\"\t\tExt JS 6 Fiddle"
        echo -e "\t\"php\"\t\tPHP Fiddle"
        echo -e "\t\"python\"\tPython Fiddle"
        echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
        echo -e "\t\"three\"\t\tthree.js / WebGl Fiddle"
        echo -e "\t\"chrome\"\tChrome Extension Fiddle"
        echo -e "\t\"node\"\t\tnode.js Fiddle"
        echo -e "\t\"tween\"\t\ttween.js Fiddle"
        echo -e "\t\"svg\"\t\tScalar Vector Graphics Fiddle"
        echo ""
        echo "[n] - fiddle Name.  For example: \"fiddleParabolaSurface\""
        echo ""
        echo ""
        ;;
    87) echo "fubar! failed while attempting to delete \"${fiddlePath}\"."
        ;;
    88) echo "fubar! call to \"fiddle-index.sh\" for \"${fiddleType}\" failed."
        ;;
    89) echo "fubar! the target directory, \"${fiddlePath}\", doesn't exist."
        ;;
    90) echo "fubar! the failed while attempting to update \"${changeLogFile}\"."
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}
