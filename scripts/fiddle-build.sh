#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 04/11/2017______________________________________________________________|
#  Description             : UTILITY USED TO BUILD OR "PACKAGE" CERTAIN FIDDLE TYPES_________________|
#  Command line Arguments  : $1 = FIDDLE TYPE, $2 = FIDDLE NAME______________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 03/10/2017 - Baseline Ver.
# ---------------------------------------------------------------------------------------------------|

this=$0;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}';
source bin/_utils.sh;
source bin/_types.sh;
source bin/_env.sh;

#try
(

    if [ "$#" -ne 2 ]; then  exit 86; fi

    case $1 in
        'angular2-seeder')
            source bin/angular2-seeder/_build.sh;
            build $2 || exit 87;
            ;;
        *)  exit 86
            ;;
    esac

)
#catch
_rc=$?
case ${_rc} in
    0)  echo "$2"
        ;;
    86) clear
        voidShowTitle ${this};
        echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[n]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        voidEchoFiddleTypes "build";
        echo ""
        echo "[n] - fiddle Name.  For example: \"0001\""
        echo ""
        echo ""
        ;;
    87) echo "fubar! fiddle build failed."
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}
