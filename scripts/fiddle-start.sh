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
# 04/09/2015 - See CHANGELOG @ 201504091810
# 05/08/2015 - See CHANGELOG @ 201505061810
# 07/05/2015 - See CHANGELOG @ 201506290420
# 07/11/2015 - See CHANGELOG @ 201507110420
# 07/26/2015 - See CHANGELOG @ 201507260420
# 12/06/2015 - See CHANGELOG @ 201511100420
# 02/13/2016 - See CHANGELOG @ 201602130420
# 03/02/2016 - See CHANGELOG @ 201603020420
# 03/10/2016 - See CHANGELOG @ 201603050420
# 04/16/2016 - See CHANGELOG @ 201604160420
# 05/17/2016 - See CHANGELOG @ 201605020420
# 05/18/2015 - See CHANGELOG @ 201605180420
# 09/16/2016 - See CHANGELOG @ 201609160420
# 10/01/2016 - See CHANGELOG @ 201610010420
# 11/30/2016 - See CHANGELOG @ 201611280420
# ---------------------------------------------------------------------------------------------------|
source bin/_utils.sh;
source bin/_types.sh;

_path=$(pwd;)  # Capture Path
_bin="${_path}/bin"
_type=$(echo $1);
_fiddleCriteria=$(echo $2);
_fiddle=$(getFiddle "${_type}" "${_fiddleCriteria}";);
_fiddleSubDir="../fiddles/${_type}";
_fiddleRoot="${_fiddleSubDir}/${_fiddle}";
_projectName=${_fiddle};

_port=1841
if [ "$#" -gt 2 ]; then _port=$3; fi
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

function isLiveServerInstalled() {
    if [[ ! $(which live-server;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function startServer() {
    groupLog "startServer";
    case ${_type} in
        'android')
            source bin/android/.androidrc;
            source bin/android/_install.sh;
            source bin/android/_start.sh;
            cd ${_fiddleRoot};
            isGradleInstalled || exit 108;
            isAndroidInstalled || exit 110;
            androidStart || exit 111;
            ;;
        'angular2-cli')
            source bin/angular2-cli/_install.sh;
            source bin/angular2-cli/_start.sh;
            cd ${_fiddleRoot};
            installed=$(isNgInstalled;);
            if [[ "${installed}" == "false" ]]; then exit 97; fi
            ngInstall || exit 91;
            ngStart || exit 92;
            ;;
        'angular2-seeder')
            source bin/angular2-seeder/_start.sh;
            cd ${_fiddleRoot};
            seederStart || exit 104;
            ;;
        'c')
            source bin/c/.gccrc;
            source bin/c/_install.sh;
            source bin/c/_start.sh;
            cd ${_fiddleRoot};
            isGccInstalled || exit 112;
            gccStart || exit 113;
            ;;
        'ember')
            source bin/ember/_install.sh;
            source bin/ember/_start.sh;
            cd ${_fiddleRoot};
            emberInstall || exit 97;
            emberStart || exit 98;
            ;;
        'electron')
            source bin/electron/_install.sh;
            source bin/electron/_start.sh;
            cd ${_fiddleRoot};
            electronInstall || exit 105;
            electronStart || exit 106;
            ;;
        'java')
            source bin/java/.javarc;
            source bin/java/_install.sh;
            source bin/java/_start.sh;
            cd ${_fiddleRoot};
            isGradleInstalled || exit 108;
            javaStart || exit 109;
            ;;
        'meteor')
            source bin/meteor/_install.sh;
            source bin/meteor/_start.sh;
            cd ${_fiddleRoot};
            meteorInstall || exit 93;
            meteorStart || exit 94;
            ;;
        'node')
            cd ${_fiddleRoot};
            npm install;
            npm start;
            ;;
        'nativescript')
            source bin/nativescript/.nativescriptrc;
            source bin/nativescript/_install.sh;
            source bin/nativescript/_start.sh;
            cd ${_fiddleRoot};
            _projectName=$(toLowerCase $(parseName ${_fiddle};);) || exit 107;
            nvmInstall || exit 100;
            adbInstall || exit 101;
            nvmUseNodeVer || exit 102;
            nativescriptAndroidStart ${_projectName} ${__TEMPLATE_TYPE__} || exit 103;
            ;;
        'all')
            cd "../fiddles" || exit 88;
            live-server --port=${_port} || exit 95;
            ;;
        *)  cd "../fiddles/${_type}" || exit 88;
            live-server --port=${_port} || exit 96;
            ;;
    esac
}
#try
(
    if [ "$#" -lt 1 ]; then  exit 86; fi
    startServer || exit $?;
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
    100) echo -e "Fubar\t\"nvmInstall\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    101) echo -e "Fubar\t\"abdInstall\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    102) echo -e "Fubar\t\"nvmUseNodeVer426\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    103) echo -e "Fubar\t\"nativescriptAndroidStart\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    104) echo -e "Fubar\t\"seederStart\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    105) echo -e "Fubar\t\"electronInstall\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    106) echo -e "Fubar\t\"electronStart\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    107) echo -e "Fubar\t\Failed while attempting to determine nativescript projectName.";
        ;;
    108) echo -e "Fubar\tGradle is not installed or configured properly";
        ;;
    109) echo -e "Fubar\t\"javaStart\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    110) echo -e "Fubar\tAndroid is not installed or configured properly";
        ;;
    111) echo -e "Fubar\t\"androidStart\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    112) echo -e "Fubar\t\"GNU C Compiler, GCC\" is not installed or configured properly";
        ;;
    113) echo -e "Fubar\t\"gccStart\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    *)  echo -e "Fubar\tAn unknown error has occurred. You win -- Ha! Ha!"
        ;;
esac
#finally
exit ${rc}
