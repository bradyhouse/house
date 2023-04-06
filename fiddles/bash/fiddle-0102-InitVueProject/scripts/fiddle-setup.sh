#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : UTILITY USED TO SETUP SPECIFIC TOOLS AND FRAMEWORKS_____________________|
#  Command line Arguments  : $1 = FIDDLE TYPE________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 02/11/2017 - Baseline Ver ~ See CHANGELOG @ 201702110420
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# ---------------------------------------------------------------------------------------------------|
source bin/_utils.sh;
source bin/_types.sh;
source bin/_env.sh;
source bin/setup/_setup.sh;

_os=$(echo $1);
_app=$(echo $2);



#try
(
    if [ "$#" -lt 2 ]; then  exit 86; fi
    setup "${_os}" "${_app}" || exit 87;
)
#catch
rc=$?
case ${rc} in
    0)  echo "";
        ;;
    86) clear
        voidShowSlug ${thisFile};
        echo "";
        echo "Nope ~ Incorrect number of arguments";
        echo "";
        echo "Usage:";
        echo "";
        echo "$0 \"[o]\" \"[a]\"";
        echo "";
        echo "[o] - operating system. Valid operating systems include: mac";
        echo "";
        echo "[a] - application. Valid applications include:";
        echo "";
        voidEchoFiddleTypes "setup";
        echo "";
        ;;
    87) groupLog "Fubar\t\"setup\" of \"${_app}\" for \"${_os}\" failed.";
        ;;
    *)  groupLog "fubar! Something went wrong.";
        ;;
esac
#finally
echo ${rc}

