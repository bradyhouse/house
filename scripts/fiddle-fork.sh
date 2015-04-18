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
# ---------------------------------------------------------------------------------------------------|
clear
thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'

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
    echo -e "\t\"dojo\"\t\tDojo Fiddle"
    echo -e "\t\"extjs\"\t\tExt JS Fiddle"
    echo -e "\t\"php\"\t\tPHP Fiddle"
    echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
    echo -e "\t\"three\"\t\tThree.js / WebGl Fiddle"
    echo -e "\t\"chrome\"\t\tChrome Extension Fiddle"
    echo ""
    echo -e "[a] - source fiddle directory name."
    echo ""
    echo -e "[b] - new fiddle directory name."
    echo -e "\tNOTE - the name must include the word \"fiddle\"."
    echo ""
    exit
fi

type=$(echo $1;)
sourceFiddle=$(echo $2;)
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
     if [[ ! -d "../fiddles/${type}/${sourceFiddle}" ]]; then exit 86; fi

     # If the new fiddle directory already exists, then delete it
     if [[ -d "../fiddles/${type}/${targetFiddle}" ]]; then sudo rm -R "../fiddles/${type}/${targetFiddle}" || exit 88; fi

     # Initialize the new fiddle directory based on the source fiddle directory
     cp -rf "../fiddles/${type}/${sourceFiddle}" "../fiddles/${type}/${targetFiddle}" || exit 89

     # Perform the obvious find/replace of the fiddle name
     $(cd bin; ./house-substr.sh ${sourceFiddle} ${targetFiddle} "../../fiddles/${type}/${targetFiddle}/app.js";) || exit 90
     $(cd bin; ./house-substr.sh ${sourceFiddle} ${targetFiddle} "../../fiddles/${type}/${targetFiddle}/index.html";) || exit 91
     $(cd bin; ./house-substr.sh ${sourceFiddle} ${targetFiddle} "../../fiddles/${type}/${targetFiddle}/README.markdown";) || exit 92

     # Add "Forked From" section to the readme file
     $(echo  "" >> "../fiddles/${type}/${targetFiddle}/README.markdown";) || exit 93
     $(echo  "" >> "../fiddles/${type}/${targetFiddle}/README.markdown";) || exit 93
     $(echo "### Forked From" >> "../fiddles/${type}/${targetFiddle}/README.markdown";) || exit 93
     $(echo  "" >> "../fiddles/${type}/${targetFiddle}/README.markdown";) || exit 93
     $(echo "[${sourceFiddle}](../${sourceFiddle})" >> "../fiddles/${type}/${targetFiddle}/README.markdown";) || exit 93

     # If the screenshot photo exists, delete the existing screenshot image
     if [[ -e "../fiddles/${type}/${targetFiddle}/screenshot.png" ]]
     then
         $(sudo rm -R "../fiddles/${type}/${targetFiddle}/screenshot.png";) || exit 94
     fi

     # If not a chrome based fiddle, then re-index parent directory
     if [[ "${type}" != "chrome" ]]
     then
         ./fiddle-index.sh ${type} || exit 95
     fi

     # If chrome fiddle, then replace the manifest file with an updated template version
     if [[ ${type} == "chrome" ]]
     then
        sudo rm -r "../fiddles/${type}/${targetFiddle}/manifest.json"
        $(cp -rf "../fiddles/${fiddleSubDir}/template/manifest.json" "../fiddles/${type}/${targetFiddle}/manifest.json") || exit 96
        $(cd bin; ./house-substr.sh '{{FiddleName}}' $1 "../../fiddles/${fiddleSubDir}/$1/manifest.json";) || exit 96
        $(cd bin; ./house-substr.sh '{{BornOnDate}}' ${bornOnDate} "../../fiddles/${fiddleSubDir}/$1/manifest.json";) || exit 96
     fi
)
#catch
rc=$?
case ${rc} in
    0)  echo "Done. The \"../../fiddles/${type}/${targetFiddle}\" directory has been initialized."
        ;;
    86) echo "fubar! The \"source\" fiddle does not exist."
        ;;
    87) echo "fubar! The \"target\" (or new fiddle must include the word \"fiddle\"."
        ;;
    88) echo "fubar! The \"branch\" fiddle cannot be overwritten."
        ;;
    89) echo "fubar! failed to create the ../fiddles/${type}/${sourceFiddle} directory."
        ;;
    90) echo "fubar! failed trying to update the ../fiddles/${type}/${targetFiddle}/app.js file."
	    if [[ -d "../fiddles/${type}/${targetFiddle}" ]]; then rm -R "../fiddles/${type}/${targetFiddle}"; fi
    	;;
    91) echo "fubar! failed trying to update the ../fiddles/${type}/${targetFiddle}/index.html file."
        if [[ -d "../fiddles/${type}/${targetFiddle}" ]]; then rm -R "../fiddles/${type}/${targetFiddle}"; fi
        ;;
    92) echo "fubar! failed trying to update the ../fiddles/${type}/${targetFiddle}/README.markdown file."
        if [[ -d "../fiddles/${type}/${targetFiddle}" ]]; then rm -R "../fiddles/${type}/${targetFiddle}"; fi
        ;;
    93) echo "fubar! failed while trying to append the \"forked from\" section to the README.markdown file."
        ;;
    94) echo "fubar! failed while attempting to delete the source screenshot image."
        ;;
    95) echo "fubar! call to the fiddle-index.sh script failed."
        ;;
    96) echo "fubar! update of the manifest.json file failed."
        ;;
    *)  echo "fubar! Something went wrong."
        if [[ -d "../fiddles/${type}/${targetFiddle}" ]]; then rm -R "../fiddles/${type}/${targetFiddle}"; fi
        ;;
esac
#finally
exit ${rc}




