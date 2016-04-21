#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO "FORK" AN EXISTING EXTJS FIDDLE.  THIS SCRIPT WILL COPY_|
#                            THE SPECIFIED FIDDLE TO THE SPECIFIED TARGET DIRECTORY._________________|
#  Command line Arguments  : $1 = TYPE, $2 = SOURCE FIDDLE DIRECTORY, $3 = TARGET (OR NEW) FIDDLE____|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 03/23/2015 - Baseline Ver.
# 04/03/2015 - (1) Added support for all fiddle types; (2) Added call to the fiddle-index script.
# 04/15/2015 - See CHANGELOG @ 201504151810
# 05/01/2015 - See CHANGELOG @ 201505011810
# 05/08/2015 - See CHANGELOG @ 201505061810
# 06/20/2015 - See CHANGELOG @ 201506200420
# 07/05/2015 - See CHANGELOG @ 201506290420
# 07/06/2015 - See CHANGELOG @ 201507060420
# 07/26/2015 - See CHANGELOG @ 201507260420
# 09/10/2015 - See CHANGELOG @ 201508240420
# 09/23/2015 - See CHANGELOG @ 201509220420
# 01/19/2016 - See CHANGELOG @ 201601190420
# 02/01/2016 - See CHANGELOG @ 201602010420
# 02/13/2016 - See CHANGELOG @ 201602130420
# 03/02/2016 - See CHANGELOG @ 201603020420
# 03/10/2016 - See CHANGELOG @ 201603050420
# 04/16/2016 - See CHANGELOG @ 201604160420
# ---------------------------------------------------------------------------------------------------|

echo $(echo "$0" | sed 's/\.\///g') | awk '{print toupper($0)}';
source bin/_utils.sh
source bin/_types.sh


if [ "$#" -ne 3 ]
then
    echo ""
    echo "Incorrect number of arguments"
    echo ""
    echo "Usage:"
    echo ""
    echo "$0 \"[t]\" \"[a]\" \"[b]\""
    echo ""
    echo -e "[t] - type. Valid types include: "
    echo ""
    voidEchoFiddleTypes;
    echo ""
    echo -e "[a] - source fiddle directory name."
    echo ""
    echo -e "[b] - new fiddle directory name."
    echo -e "\tNOTE - the name must include the word \"fiddle\"."
    echo ""
    exit
fi

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

function updateFile() {
    file=$1
    fiddleName=$2
    targetFiddle=$3
    if [[ -e "${file}" ]]
    then
        $(cd bin; ./house-substr.sh ${fiddleName} ${targetFiddle} "${file}";) || exit 90
    fi
}
fiddleType=$1
fiddleCriteria=$2
fiddleName=$(getFiddle;);
targetFiddle=$(echo $3;)
forkedOnDate=$(date +"%m-%d-%y";)

#try
(
    # Verify the new fiddle name contains the word "Fiddle" or "fiddle"
    if [[ ${targetFiddle} != *"fiddle"* ]]
    then
        if [[ ${targetFiddle} != *"Fiddle"* ]]
        then
            exit 87;
        fi
    fi

    # Verify that the source fiddle directory exists
    if [[ ! -d "../fiddles/${fiddleType}/${fiddleName}" ]]; then exit 86; fi

    # If the new fiddle directory already exists, then delete it
    if [[ -d "../fiddles/${fiddleType}/${targetFiddle}" ]]; then sudo rm -R "../fiddles/${fiddleType}/${targetFiddle}" || exit 88; fi

    # Initialize the new fiddle directory based on the source fiddle directory
    cp -rf "../fiddles/${fiddleType}/${fiddleName}" "../fiddles/${fiddleType}/${targetFiddle}" || exit 89

    case ${fiddleType} in
        'angular'|'angular2'|'compass'|'extjs5'|'extjs6'|'php'|'jquery'|'three'|'rxjs'|'d3'|'dojo'|'node'|'tween'|'chrome')
            updateFile "../../fiddles/${fiddleType}/${targetFiddle}/index.html"  ${fiddleName} ${targetFiddle} || exit $?
            updateFile "../../fiddles/${fiddleType}/${targetFiddle}/app.js" ${fiddleName} ${targetFiddle} || exit $?
            updateFile "../../fiddles/${fiddleType}/${targetFiddle}/README.markdown" ${fiddleName} ${targetFiddle} || exit $?
            ;;
        'svg')
           updateFile "../../fiddles/${fiddleType}/${targetFiddle}/index.html"  ${fiddleName} ${targetFiddle} || exit $?
           updateFile "../../fiddles/${fiddleType}/${targetFiddle}/README.markdown" ${fiddleName} ${targetFiddle} || exit $?
            ;;
        'ant'|'bash'|'python')
            if [[ -e "../fiddles/${fiddleType}/${targetFiddle}/README.markdown" ]]
            then
                rm -r "../fiddles/${fiddleType}/${targetFiddle}/README.markdown" || exit 92
            fi
            $(cp -rf "../fiddles/${fiddleType}/template/README.markdown" "../fiddles/${fiddleType}/${targetFiddle}/README.markdown") || exit 92
            $(cd bin; ./house-substr.sh '{{FiddleName}}' ${targetFiddle} "../../fiddles/${fiddleType}/${targetFiddle}/README.markdown";) || exit 92
            $(cd bin; ./house-substr.sh '{{BornOnDate}}' ${forkedOnDate} "../../fiddles/${fiddleType}/${targetFiddle}/README.markdown";) || exit 92
            ;;
    esac

    # Add "Forked From" section to the readme file
    $(echo  "" >> "../fiddles/${fiddleType}/${targetFiddle}/README.markdown";) || exit 93
    $(echo  "" >> "../fiddles/${fiddleType}/${targetFiddle}/README.markdown";) || exit 93
    $(echo "### Forked From" >> "../fiddles/${fiddleType}/${targetFiddle}/README.markdown";) || exit 93
    $(echo  "" >> "../fiddles/${fiddleType}/${targetFiddle}/README.markdown";) || exit 93
    $(echo "[${fiddleName}](../${fiddleName})" >> "../fiddles/${fiddleType}/${targetFiddle}/README.markdown";) || exit 93

    # If the screenshot photo exists, delete the existing screenshot image
    if [[ -e "../fiddles/${fiddleType}/${targetFiddle}/screenshot.png" ]]
    then
        $(rm -R "../fiddles/${fiddleType}/${targetFiddle}/screenshot.png";) || exit 94
    fi

    case ${fiddleType} in
        'angular'|'angular2'|'compass'|'extjs5'|'extjs6'|'php'|'jquery'|'three'|'dojo'|'d3'|'rxjs'|'node'|'tween'|'svg')
            ./fiddle-index.sh ${fiddleType} || exit 95;
            ;;
        'chrome')
            rm -r "../fiddles/${fiddleType}/${targetFiddle}/manifest.json"
            $(cp -rf "../fiddles/${fiddleType}/template/manifest.json" "../fiddles/${fiddleType}/${targetFiddle}/manifest.json") || exit 96
            $(cd bin; ./house-substr.sh '{{FiddleName}}' ${targetFiddle} "../../fiddles/${fiddleType}/${targetFiddle}/manifest.json";) || exit 96
            $(cd bin; ./house-substr.sh '{{BornOnDate}}' ${forkedOnDate} "../../fiddles/${fiddleType}/${targetFiddle}/manifest.json";) || exit 96
            ;;
    esac

    # Update the changelog
    $(echo "* Added [fiddles/${fiddleType}/${targetFiddle}](fiddles/${fiddleType}/${targetFiddle})" >> "../CHANGELOG.markdown") || exit 97

)
#catch
rc=$?
case ${rc} in
    0)  echo "Done. The \"../../fiddles/${fiddleType}/${targetFiddle}\" directory has been initialized."
        ;;
    86) echo "fubar! The \"source\" fiddle does not exist."
        ;;
    87) echo "fubar! The \"target\" (or new fiddle must include the word \"fiddle\"."
        ;;
    88) echo "fubar! The \"branch\" fiddle cannot be overwritten."
        ;;
    89) echo "fubar! failed to create the ../fiddles/${fiddleType}/${fiddleName} directory."
        ;;
    90) echo "fubar! failed trying to update the ../fiddles/${fiddleType}/${targetFiddle}/app.js file."
	    if [[ -d "../fiddles/${fiddleType}/${targetFiddle}" ]]; then rm -R "../fiddles/${fiddleType}/${targetFiddle}"; fi
    	;;
    91) echo "fubar! failed trying to update the ../fiddles/${fiddleType}/${targetFiddle}/index.html file."
        if [[ -d "../fiddles/${fiddleType}/${targetFiddle}" ]]; then rm -R "../fiddles/${fiddleType}/${targetFiddle}"; fi
        ;;
    92) echo "fubar! failed trying to update the ../fiddles/${fiddleType}/${targetFiddle}/README.markdown file."
        if [[ -d "../fiddles/${fiddleType}/${targetFiddle}" ]]; then rm -R "../fiddles/${fiddleType}/${targetFiddle}"; fi
        ;;
    93) echo "fubar! failed while trying to append the \"forked from\" section to the README.markdown file."
        ;;
    94) echo "fubar! failed while attempting to delete the source screenshot image."
        ;;
    95) echo "fubar! call to the fiddle-index.sh script failed."
        ;;
    96) echo "fubar! update of the manifest.json file failed."
        ;;
    97) echo "fubar! failed while attempting update the CHANGELOG.markdown file"
        ;;
    *)  echo "fubar! Something went wrong."
        if [[ -d "../fiddles/${fiddleType}/${targetFiddle}" ]]; then rm -R "../fiddles/${fiddleType}/${targetFiddle}"; fi
        ;;
esac
#finally
exit ${rc}




