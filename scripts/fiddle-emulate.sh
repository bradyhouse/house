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
# 07/12/2015 - Baseline Ver ~ See CHANGELOG @ 201507110420
# 07/26/2015 - See CHANGELOG @ 201507260420
# 09/10/2015 - See CHANGELOG @ 201508240420
# 12/06/2015 - See CHANGELOG @ 201511100420
# 01/16/2015 - See CHANGELOG @ 201601100420
# 02/01/2016 - See CHANGELOG @ 201602010420
# 03/02/2016 - See CHANGELOG @ 201603020420
# 03/10/2016 - See CHANGELOG @ 201603050420
# 04/16/2016 - See CHANGELOG @ 201604160420
# 05/17/2016 - See CHANGELOG @ 201605020420
# 05/18/2015 - See CHANGELOG @ 201605180420
# 09/16/2016 - See CHANGELOG @ 201609160420
# 10/01/2016 - See CHANGELOG @ 201610010420
# 11/30/2016 - See CHANGELOG @ 201611280420
# 12/15/2016 - See CHANGELOG @ 201612120420
# ---------------------------------------------------------------------------------------------------|
source bin/_utils.sh;
source bin/_types.sh;

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

