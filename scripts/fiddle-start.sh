#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bedlington.io___________________________________________________________|
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
# ---------------------------------------------------------------------------------------------------|
clear
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
_path=$(pwd;)  # Capture Path
_bin="${_path}/bin"
_type=$(echo $1)
#try
(
    # Validate requisites
    if [ "$#" -ne 1 ]; then  exit 86; fi
    if [[ ! -d bin ]]; then exit 87; fi

    cd bin

    case ${_type} in
        'all')
            ./house-node-fs-start.sh "../../fiddles" || exit 88
            ;;
        'extjs')
            ./house-node-fs-start.sh "../../fiddles/extjs" || exit 88
            ;;
        'jquery')
            ./house-node-fs-start.sh "../../fiddles/jquery" || exit 88
            ;;
        'three')
            ./house-node-fs-start.sh "../../fiddles/three" || exit 88
            ;;
        'php')
            ./house-node-fs-start.sh "../../fiddles/php" || exit 88
            ;;
        'dojo')
            ./house-node-fs-start.sh "../../fiddles/dojo" || exit 88
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
        echo "$0 \"[t]\""
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
        echo ""
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