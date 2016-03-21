#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
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
# ---------------------------------------------------------------------------------------------------|
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}';
source _fiddle-func.sh;
#try
(
	if [ "$#" -gt 1 ]; then  exit 86; fi
    case $1 in
        'python' | 'angular' | 'angular2' | 'ant' | 'compass' | 'extjs5' | 'extjs6' | 'jquery' | 'three' | 'php'| 'rxjs' | 'd3' | 'dojo' | 'chrome' | 'node' | 'tween' | 'bash' | 'svg')
            count=$(ls -1 ../fiddles/$1 | grep 'fiddle' | wc -l | sed -e 's/^[[:space:]]*//');
            echo -e "";
            echo -e "--------------------------------------------------------";
            echo -e "$1 Fiddles" | awk '{print toupper($0)}';
            echo -e "--------------------------------------------------------";
            echo -e "";
            ls -1 ../fiddles/$1 | grep 'fiddle';
            if [[ ${count} -eq "0" ]]
            then
                echo -e "N/A";
            fi
            echo -e "";
            echo -e "--------------------------------------------------------";
            echo -e "Total:  ${count}";
            echo -e "";
            ;;
        *)  exit 86;
            ;;
    esac
)
#catch
_rc=$?;
case ${_rc} in
    0)  echo "";
        ;;
    86) echo "";
        echo "Nope ~ Incorrect number of arguments";
        echo "";
        echo "Usage:";
        echo "";
        echo "$0 \"[t]\"";
        echo "";
        echo "[t] - type. Valid types include: ";
        echo "";
        voidEchoFiddleTypes;
        echo "";
        ;;
    *)  echo "fubar! Something went wrong.";
        ;;
esac
#finally
exit ${_rc};
