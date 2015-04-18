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
# ---------------------------------------------------------------------------------------------------|
clear
thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'
fiddleType=$1
fiddleName=$2
fiddlePath="../fiddles/${fiddleType}/${fiddleName}"

#try
(
	# Verify parameter count is 2
	if [ "$#" -ne 2 ]; then  exit 86; fi


    # Verify type parameter
	case ${fiddleType} in
        'extjs' | 'jquery' | 'three' | 'php' | 'dojo' | 'chrome')
        if [[ -d "${fiddlePath}" ]]
        then
            sudo rm -r "${fiddlePath}" || exit 87
        fi
        case ${fiddleType} in
            'extjs' | 'jquery' | 'three' | 'php' | 'dojo')
                ./fiddle-index.sh ${fiddleType} || exit 88
            ;;
        esac
        ;;
        *)
            exit 86
    esac
)
#catch
_rc=$?
case ${_rc} in
    0)  echo ""
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
        echo -e "\t\"dojo\"\t\tDojo Fiddle"
        echo -e "\t\"extjs\"\t\tExt JS Fiddle"
        echo -e "\t\"php\"\t\tPHP Fiddle"
        echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
        echo -e "\t\"three\"\t\tThree.js / WebGl Fiddle"
        echo -e "\t\"chrome\"\tChrome Extension Fiddle"
        echo ""
        echo "[n] - fiddle Name.  For example: \"fiddleParabolaSurface\""
        echo ""
        echo ""
        ;;
    87) echo "fubar! failed while attempting to delete \"${fiddlePath}\"."
        ;;
    88) echo "fubar! call to \"fiddle-index.sh\" for \"${fiddleType}\" failed."
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}
