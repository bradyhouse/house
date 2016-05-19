#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO START A NODE FILE SERVER FOR A SPECIFIC FIDDLE SUB-_____|
#                            DIRECTORY_______________________________________________________________|
#  Command line Arguments  : $1 = FIDDLE TYPE________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# 04/09/2015 - See CHANGELOG.MARKDOWN @ 201504091810
# 05/08/2015 - See CHANGELOG.MARKDOWN @ 201505061810
# 07/05/2015 - See CHANGELOG.MARKDOWN @ 201506290420
# 07/11/2015 - See CHANGELOG.MARKDOWN @ 201507110420
# 07/26/2015 - See CHANGELOG.MARKDOWN @ 201507260420
# 12/06/2015 - See CHANGELOG.MARKDOWN @ 201511100420
# 02/13/2016 - See CHANGELOG.MARKDOWN @ 201602130420
# 03/02/2016 - See CHANGELOG.MARKDOWN @ 201603020420
# 03/10/2016 - See CHANGELOG.MARKDOWN @ 201603050420
# 04/16/2016 - See CHANGELOG.MARKDOWN @ 201604160420
# 05/17/2016 - See CHANGELOG.MARKDOWN @ 201605020420
# 05/18/2015 - See CHANGELOG.MARKDOWN @ 201605180420
# ---------------------------------------------------------------------------------------------------|
source bin/_utils.sh;
source bin/_types.sh;
source bin/angular2/_install.sh;
source bin/angular2/_start.sh;
source bin/meteor/_install.sh;
source bin/meteor/_start.sh;
source bin/ember/_install.sh;
source bin/ember/_start.sh;

_path=$(pwd;)  # Capture Path
_bin="${_path}/bin"
_type=$(echo $1)
_fiddleSubDir="../fiddles/${_type}/$2"
_port=$(echo $3) || 8889

echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

function isLiveServerInstalled() {
    if [[ ! $(which live-server;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function startLiveServer() {
    case ${_type} in
        'all')
            cd "../fiddles" || exit 88;
            ;;
        'angular2')
            cd ${_fiddleSubDir};
            ngInstall || exit 91;
            ngStart || exit 92;
            ;;
        'aurelia')
            cd ${_fiddleSubDir};
            live-server || exit 99;
            ;;
        'ember')
            cd ${_fiddleSubDir};
            emberInstall || exit 97;
            emberStart || exit 98;
            ;;
        'meteor')
            cd ${_fiddleSubDir};
            meteorInstall || exit 93;
            meteorStart || exit 94;
            ;;
        'all')
            cd "../fiddles" || exit 88;
            live-server || exit 95;
            ;;
        *)  cd "../fiddles/${_type}" || exit 88;
            live-server || exit 96;
            ;;
    esac
}
#try
(
    if [ "$#" -lt 1 ]; then  exit 86; fi
    if [ "$#" -gt 2 ]; then _port=$3; fi
    if [[ ! -d bin ]]; then exit 87; fi
    installed=$(isNgInstalled;);
    if [[ "${installed}" == "false" ]]; then exit 97; fi
    startLiveServer;
)
#catch
rc=$?
case ${rc} in
    0)  echo ""
        ;;
    86) echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[[n]]\" \"[[p]]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        echo "[t] - type. Valid types include: "
        echo -e "";
        echo -e "\t\"all\"\t\tStartup all Fiddles";
        voidEchoFiddleTypes;
        echo ""
        echo "[[n]] - OPTIONAL fiddle name. When specified the fiddle's path will be used as the root directory."
        echo ""
        echo "[[p]] - OPTIONAL port number. If not specified then port 8889 will be used."
        echo "        Note - If you specify a different port, then to stop the resulting process"
        echo "        using the fiddle-stop.sh script, you will need to supply the same port."
        echo ""
        ;;
    87) echo -e "Fubar\tCannot find the \"${_path}/bin\" directory."
        ;;
    88) echo -e "Fubar\tCall to the \"${_path}/bin/house-node-fs-start.sh\" failed."
        ;;
    89) echo -e "Fubar\tAttempt to stop live-server failed."
        ;;
    90) echo -e "Fubar\tNode is not installed."
        ;;
    91) echo -e "Fubar\t\"ngInstall\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    92) echo -e "Fubar\t\"ngStart\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    93) echo -e "Fubar\t\"meteorInstall\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    94) echo -e "Fubar\t\"meteorStart\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    95) echo -e "Fubar\t\"live-server\" function call failed.";
        ;;
    96) echo -e "[Fubar]\t\"live-server\" not found."
        ;;
    97) echo -e "Fubar\t\"emberInstall\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    98) echo -e "Fubar\t\"emberStart\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    99) echo -e "Fubar\t\"live-server\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    *)  echo -e "Fubar\tAn unknown error has occurred. You win -- Ha! Ha!"
        ;;
esac
#finally
exit ${rc}
