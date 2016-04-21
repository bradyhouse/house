#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO START A NODE FILE SERVER FOR A SPECIFIC FIDDLE SUB-_____|
#                            DIRECTORY_______________________________________________________________|
#  Command line Arguments  : $1 = FIDDLE TYPE ~ "DOJO", "EXTJS", "JQUERY", "PHP", "THREE",___________|
#                            "TWEEN", "SVG", OR "ALL"________________________________________________|
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
# ---------------------------------------------------------------------------------------------------|
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
source bin/_utils.sh;
source bin/_types.sh;

_path=$(pwd;)  # Capture Path
_bin="${_path}/bin"
_type=$(echo $1)
_port=$(echo $2) || 8889


function isNodeInstalled() {
    if [[ ! $(which node;) ]]
    then
        echo -1;
    else
        echo 0;
    fi
}

function isLiveServerInstalled() {
    if [[ ! $(which live-server;) ]]
    then
        echo -1;
    else
        echo 0;
    fi
}

function stopLiveServer() {
    _pid=$(lsof -i:${_port} -t || echo '-1')
    if [[ ${_pid} -eq "-1" ]];
    then
        echo 0;
    else
        $(lsof -i:${_port} -t | xargs kill;) || exit 89;
        echo 0;
    fi
}

function startLiveServer() {
    case ${_type} in
        'all')
            cd "../fiddles" || exit 88;
            ;;
        *)
            cd "../fiddles/${_type}" || exit 88;
            ;;
    esac
    nohup live-server --port=${_port} --ignore="/" --quiet &
}
#try
(
    # Validate requisites
    if [ "$#" -lt 1 ]; then  exit 86; fi
    if [ "$#" -gt 1 ]; then _port=$2; fi
    if [[ ! -d bin ]]; then exit 87; fi
    if [[ ! $(isLiveServerInstalled;) ]]
    then
        if [[ ! $(isNodeInstalled;) ]]; then exit 90; fi
        echo -e "[Info]\tlive-server not found."
    else
        stopLiveServer || exit $?;
        startLiveServer || exit $?;
        exit 1;
    fi
)
#catch
rc=$?
case ${rc} in
    0)  case ${_type} in
        'all')
            echo "A Node.js file server has been started for all fiddles."
            ;;
        *)
            echo "A Node.js file server has been started for the \"${_type}\" fiddle collection."
            ;;
        esac
        echo ""
        ;;
    1)  case ${_type} in
        'all')
            echo "live-server has been started from the root fiddles directory on port ${_port}."
            ;;
        *)
            echo "live-server has been started from the \"${_type}\" fiddle directory on port ${_port}."
            ;;
        esac
        echo ""
        ;;
    86) echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[[p]]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        echo -e "\t\"all\"\t\tStartup all Fiddles"
        echo -e "\t\"angular\"\t\tAngular Fiddle"
        echo -e "\t\"angular2\"\t\tAngular 2 Fiddle"
        echo -e "\t\"d3\"\t\tData Driven Document Fiddle"
        echo -e "\t\"dojo\"\t\tDojo Fiddle"
        echo -e "\t\"extjs5\"\t\tExt JS 5 Fiddle"
        echo -e "\t\"extjs6\"\t\tExt JS 6 Fiddle"
        echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
        echo -e "\t\"php\"\t\tPHP Fiddle"
        echo -e "\t\"rxjs\"\t\tRxJS Fiddle"
        echo -e "\t\"three\"\t\tThree.js / WebGl Fiddle"
        echo -e "\t\"tween\"\t\ttween.js Fiddle"
        echo -e "\t\"svg\"\t\tScalar Graphic Vector Fiddle"
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
    *)  echo -e "Fubar\tAn unknown error has occurred. You win -- Ha! Ha!"
        ;;
esac
#finally
exit ${rc}
