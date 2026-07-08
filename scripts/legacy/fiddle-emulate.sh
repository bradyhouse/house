#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO LIST THE FIDDLES DEFINED FOR A SPECIFIC TYPE____________|
#  Command line Arguments  : $1 = FIDDLE TYPE________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 09/16/2016 - Baseline Ver ~ See CHANGELOG @ 201609160420
# 10/01/2016 - See CHANGELOG @ 201610010420
# 11/30/2016 - See CHANGELOG @ 201611280420
# 12/15/2016 - See CHANGELOG @ 201612120420
# ---------------------------------------------------------------------------------------------------|
source bin/_utils.sh;
source bin/_types.sh;
source bin/_env.sh;

_type=$(echo $1);

function emulate() {
    groupLog "emulate";
    case ${_type} in
        'android')
            source bin/android/.androidrc;
            source bin/android/_emulate.sh;
            emulate || exit 87;
            ;;
        'nativescript')
            source bin/nativescript/.nativescriptrc;
            source bin/nativescript/_emulate.sh;
            startAndroidEmulator || exit 87;
            ;;
        *)  exit 86;
            ;;
    esac
}
#try
(
    if [ "$#" -lt 1 ]; then  exit 86; fi
    emulate || exit $?;
)
#catch
rc=$?
case ${rc} in
    0)  echo "";
        ;;
    86) clear
        voidShowTitle ${thisFile};
        echo "";
        echo "Nope ~ Incorrect number of arguments";
        echo "";
        echo "Usage:";
        echo "";
        echo "$0 \"[t]\"";
        echo "";
        echo "[t] - type. Valid types include: ";
        echo "";
        voidEchoFiddleTypes "emulate";
        echo "";
        ;;
    87) echo -e "Fubar\t\"emulate\" failed for \"${_type}\".";
        ;;
    *)  echo "fubar! Something went wrong.";
        ;;
esac
#finally
exit ${rc}

