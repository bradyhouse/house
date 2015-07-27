#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES DIRECTORY____________|
#  Command line Arguments  : $1 = FIDDLE TYPE, $2 = FIDDLE NAME______________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 03/19/2015 - Baseline Ver.
# 04/15/2015 - See CHANGELOG @ 201504151810
# 05/08/2015 - See CHANGELOG @ 201505061810
# 06/20/2015 - See CHANGELOG @ 201506200420
# 06/21/2015 - See CHANGELOG @ 201506210420
# 07/05/2015 - See CHANGELOG @ 201506290420
# 07/11/2015 - See CHANGELOG @ 201507110420
# 07/26/2015 - See CHANGELOG @ 201507260420
# ---------------------------------------------------------------------------------------------------|
thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'
#try
(
	if [ "$#" -ne 2 ]; then  exit 86; fi
    case $1 in
        'compass')
            ./fiddle-compass.sh $2 || exit 87
            ./fiddle-index.sh "compass" || exit 87
            ;;
        'extjs5')
            ./fiddle-extjs-5.sh $2 || exit 87
            ./fiddle-index.sh "extjs5" || exit 87
            ;;
        'extjs6')
            ./fiddle-extjs-6.sh $2 || exit 87
            ./fiddle-index.sh "extjs6" || exit 87
            ;;
        'jquery')
            ./fiddle-jquery.sh $2 || exit 88
            ./fiddle-index.sh "jquery" || exit 88
            ;;
        'three')
            ./fiddle-three.sh $2 || exit 89
            ./fiddle-index.sh "three" || exit 89
            ;;
        'php')
            ./fiddle-php.sh $2 || exit 90
            ./fiddle-index.sh "php" || exit 90
            ;;
        'dojo')
            ./fiddle-dojo.sh $2 || exit 91
            ./fiddle-index.sh "dojo" || exit 91
            ;;
        'chrome')
            ./fiddle-chrome.sh $2 || exit 92
            ;;
        'node')
            ./fiddle-node.sh $2 || exit 93
            ;;
        'tween')
            ./fiddle-tween.sh $2 || exit 94
            ./fiddle-index.sh "tween" || exit 94
            ;;
        'bash')
            ./fiddle-bash.sh $2 || exit 95
            ;;
        'svg')
            ./fiddle-svg.sh $2 || exit 97
            ./fiddle-index.sh "svg" || exit 97
            ;;
        *)  exit 86
            ;;
    esac
    # Update the changelog
    $(echo "* Added [fiddles/$1/$2](fiddles/$1/$2)" >> "../CHANGELOG.markdown") || exit 96
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
        echo -e "\t\"bash\"\t\tBash Fiddle"
        echo -e "\t\"compass\"\tCompass Fiddle"
        echo -e "\t\"dojo\"\t\tDojo Fiddle"
        echo -e "\t\"extjs 5\"\t\tExt JS 5 Fiddle"
        echo -e "\t\"extjs 6\"\t\tExt JS 6 Fiddle"
        echo -e "\t\"php\"\t\tPHP Fiddle"
        echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
        echo -e "\t\"three\"\t\three.js / WebGl Fiddle"
        echo -e "\t\"chrome\"\tChrome Extension Fiddle"
        echo -e "\t\"node\"\t\tNode Fiddle"
        echo -e "\t\"tween\"\t\ttween.js Fiddle"
        echo -e "\t\"svg\"\t\tScalar Vector Graphic Fiddle"
        echo ""
        echo "[n] - fiddle Name.  For example: \"fiddleParabolaSurface\""
        echo ""
        echo ""
        ;;
    87) echo "fubar! extjs fiddle creation failed."
        ;;
    88) echo "fubar! jquery fiddle creation failed."
        ;;
    89) echo "fubar! three fiddle creation failed."
        ;;
    90) echo "fubar! php fiddle creation failed."
        ;;
    91) echo "fubar! dojo fiddle creation failed."
        ;;
    92) echo "fubar! chrome fiddle creation failed."
        ;;
    93) echo "fubar! node fiddle creation failed."
        ;;
    94) echo "fubar! tween fiddle creation failed."
        ;;
    95) echo "fubar! bash fiddle creation failed."
        ;;
    96) echo "fubar! failed while attempting update the CHANGELOG.markdown file"
        ;;
    97) echo "fubar! svg fiddle creation failed."
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}
