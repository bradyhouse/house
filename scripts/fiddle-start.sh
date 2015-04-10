#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO START A NODE FILE SERVER FOR A SPECIFIC FIDDLE SUB-_____|
#                            DIRECTORY_______________________________________________________________|
#  Command line Arguments  : $1 = FIDDLE TYPE ~ "DOJO", "EXTJS", "JQUERY", "PHP", "THREE", OR "ALL"__|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# 04/09/2015 - CHANGELOG.MARKDOWN ~ 201504091810
# ---------------------------------------------------------------------------------------------------|
clear
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
_path=$(pwd;)  # Capture Path
_bin="${_path}/bin"
_type=$(echo $1)
_port=8889
#try
(
    # Validate requisites
    if [ "$#" -lt 1 ]; then  exit 86; fi
    if [ "$#" -gt 1 ]; then _port=$2; fi
    if [[ ! -d bin ]]; then exit 87; fi

    cd bin

    case ${_type} in
        'all')
            ./house-node-fs-start.sh "../../fiddles" "${_port}" || exit 88
            ;;
        'extjs')
            ./house-node-fs-start.sh "../../fiddles/extjs" "${_port}" || exit 88
            ;;
        'jquery')
            ./house-node-fs-start.sh "../../fiddles/jquery" "${_port}" || exit 88
            ;;
        'three')
            ./house-node-fs-start.sh "../../fiddles/three" "${_port}" || exit 88
            ;;
        'php')
            ./house-node-fs-start.sh "../../fiddles/php" "${_port}" || exit 88
            ;;
        'dojo')
            ./house-node-fs-start.sh "../../fiddles/dojo" "${_port}" || exit 88
            ;;
        *)  exit 86
            ;;
    esac
 
)
#catch
rc=$?
case ${rc} in
    0)  case ${_type} in
        'all')
            echo "A Node.js file server has been started for all fiddles."
            ;;
        'extjs' | 'jquery' | 'three' | 'php' | 'dojo')
            echo "A Node.js file server has been started for the \"${_type}\" fiddle collection."
            ;;
        esac
        echo ""
        ;;
    86) echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[[p]]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        echo -e "\t\"all\"\t\tStartup all Fiddles"
        echo -e "\t\"dojo\"\t\tDojo Fiddle"
        echo -e "\t\"extjs\"\t\tExt JS Fiddle"
        echo -e "\t\"php\"\t\tPHP Fiddle"
        echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
        echo -e "\t\"three\"\t\tThree.js / WebGl Fiddle"
        echo ""
        echo "[[p]] - OPTIONAL port number. If not specified then port 8889 will be used."
        echo "        Note - If you specify a different port, then to stop the resulting process"
        echo "        using the fiddle-stop.sh script, you will need to supply the same port."
        echo ""
        ;;
    87) echo -e "Fubar\tCannot find the \"${_path}/bin\" directory."
        ;;
    88) echo -e "Fubar\tCall to the \"${_path}/bin/house-node-fs-start.sh\" failed."
        ;;
    *)  echo -e "Fubar\tAn unknown error has occurred. You win -- Ha! Ha!"
        ;;
esac
#finally
exit ${rc}