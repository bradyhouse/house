#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/31/2015______________________________________________________________|
#  Description             : UTILITY USED TO "SAFELY" RENAME (REFACTOR) A FIDDLE SUB-DIRECTORY_______|
#  Command line Arguments  : $1 = FIDDLE TYPE, $2 = FIDDLE NAME, $3 = NEW NAME_______________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 05/31/2015 - Baseline ~ See CHANGELOG @ 201505310420
# 06/20/2015 - See CHANGELOG @ 201506200420
# 07/05/2015 - See CHANGELOG @ 201506290420
# 07/11/2015 - See CHANGELOG @ 201507110420
# 07/26/2015 - See CHANGELOG @ 201507260420
# ---------------------------------------------------------------------------------------------------|
thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'
fiddleType=$1
fiddleName=$2
newName=$3
fiddlePath="../fiddles/${fiddleType}/${fiddleName}"
newFiddlePath="../fiddles/${fiddleType}/${newName}"
newIndexFile="../../fiddles/${fiddleType}/${newName}/index.html"
newReadmeFile="../../fiddles/${fiddleType}/${newName}/README.markdown"
changeLogFile="../../CHANGELOG.markdown"
#try
(
	# Verify parameter count is 3
	if [ "$#" -ne 3 ]; then  exit 86; fi

    # Verify the new fiddle name is not already in use
    if [[ -d "${newFiddlePath}" ]]; then exit 87; fi

    # Verify the fiddle exists
    if [[ ! -d "${fiddlePath}" ]]; then exit 88; fi

    sudo mv "${fiddlePath}" "${newFiddlePath}" || exit 90

    cd bin

    # Update readme.markdown
    if [[ -f "${newReadmeFile}" ]]
    then
        ./house-substr.sh "${fiddleName}" "${newName}" "${newReadmeFile}" || exit 91
    fi

    # Update CHANGELOG.markdown
    if [[ -f "${changeLogFile}" ]]
    then
        ./house-substr.sh "${fiddleName}" "${newName}" "${changeLogFile}" || exit 91
    fi

    cd ..

    # Verify type parameter
	case ${fiddleType} in
        'compass' | 'extjs5' | 'extjs6' | 'jquery' | 'three' | 'php' | 'dojo' | 'chrome' | 'node' | 'tween' | 'svg' )
        cd bin
        # Update index.html page
        if [[ -f "${newIndexFile}" ]]
        then
            ./house-substr.sh "${fiddleName}" "${newName}" "${newIndexFile}" || exit 91
        fi

        cd ..

        # Re-index directory
        case ${fiddleType} in
            'compass' | 'extjs5' | 'extjs6' | 'jquery' | 'three' | 'php' | 'dojo' | 'tween' | 'svg' )
                ./fiddle-index.sh ${fiddleType} || exit 89
            ;;
        esac
        ;;
    esac
)
#catch
_rc=$?
case ${_rc} in
    0)  echo "Refactor process completed successfully."
        echo "\"${fiddleName}\" is now \"${newName}\"."
        ;;
    86) echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[f]\" \"[n]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        echo -e "\t\"compass\"\tCompass Fiddle"
        echo -e "\t\"dojo\"\t\tDojo Fiddle"
        echo -e "\t\"extjs5\"\t\tExt JS 5 Fiddle"
        echo -e "\t\"extjs6\"\t\tExt JS 6 Fiddle"
        echo -e "\t\"php\"\t\tPHP Fiddle"
        echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
        echo -e "\t\"three\"\t\tthree.js / WebGl Fiddle"
        echo -e "\t\"chrome\"\tChrome Extension Fiddle"
        echo -e "\t\"node\"\t\tnode.js Fiddle"
        echo -e "\t\"tween\"\t\ttween.js Fiddle"
        echo -e "\t\"svg\"\t\tScalar Vector Graphic Fiddle"
        echo ""
        echo "[f] - existing fiddle name.  For example: \"fiddleParabolaSurface\""
        echo ""
        echo "[n] - new name."
        echo ""
        ;;
    87) echo "fubar! New name, \"${newFiddlePath}\" is already in use."
        ;;
    88) echo "fubar! target fiddle, \"${fiddlePath}\" does not exist."
        ;;
    89) echo "fubar! call to \"fiddle-index.sh\" for \"${fiddleType}\" failed."
        ;;
    90) echo "fubar! call to \"mv\" failed."
        ;;
    91) echo "fubar! call to \"house-substr.sh\" failed."
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}
