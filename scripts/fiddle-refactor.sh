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
# 09/10/2015 - See CHANGELOG @ 201508240420
# 12/06/2015 - See CHANGELOG @ 201511100420
# 01/17/2016 - See CHANGELOG @ 201601100420
# 02/01/2016 - See CHANGELOG @ 201602010420
# 03/02/2016 - See CHANGELOG @ 201603020420
# 03/10/2016 - See CHANGELOG @ 201603050420
# 04/16/2016 - See CHANGELOG @ 201604160420
# ---------------------------------------------------------------------------------------------------|
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}';
source bin/_utils.sh
source bin/_types.sh


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
        'angular' | 'angular2' | 'compass' | 'extjs5' | 'extjs6' | 'jquery' | 'three' | 'php' | 'rxjs' | 'dojo' | 'chrome' | 'node' | 'tween' | 'typescript' | 'svg' )
        cd bin
        # Update index.html page
        if [[ -f "${newIndexFile}" ]]
        then
            ./house-substr.sh "${fiddleName}" "${newName}" "${newIndexFile}" || exit 91
        fi

        cd ..

        # Re-index directory
        case ${fiddleType} in
            'angular' | 'angular2' | 'compass' | 'extjs5' | 'extjs6' | 'jquery' | 'three' | 'php' | 'rxjs' | 'dojo' | 'd3' | 'tween' | 'svg' )
                ./fiddle-index.sh ${fiddleType} || exit 89
            ;;
        esac
        ;;
    esac
)
#catch
_rc=$?;
case ${_rc} in
    0)  echo "Refactor process completed successfully.";
        echo "\"${fiddleName}\" is now \"${newName}\".";
        ;;
    86) echo "";
        echo "Nope ~ Incorrect number of arguments";
        echo "";
        echo "Usage:";
        echo "";
        echo "$0 \"[t]\" \"[f]\" \"[n]\"";
        echo "";
        echo "[t] - type. Valid types include: ";
        echo "";
        voidEchoFiddleTypes;
        echo "";
        echo "[f] - existing fiddle name.  For example: \"fiddleParabolaSurface\"";
        echo "";
        echo "[n] - new name.";
        echo "";
        ;;
    87) echo "fubar! New name, \"${newFiddlePath}\" is already in use.";
        ;;
    88) echo "fubar! target fiddle, \"${fiddlePath}\" does not exist.";
        ;;
    89) echo "fubar! call to \"fiddle-index.sh\" for \"${fiddleType}\" failed.";
        ;;
    90) echo "fubar! call to \"mv\" failed.";
        ;;
    91) echo "fubar! call to \"house-substr.sh\" failed.";
        ;;
    *)  echo "fubar! Something went wrong.";
        ;;
esac
#finally
exit ${_rc};
