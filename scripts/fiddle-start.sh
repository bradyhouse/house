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
# 12/15/2016 - See CHANGELOG @ 201612120420
# 01/24/2018 - See CHANGELOG @ aurelia-dependencies-update
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# 08/01/2018 - See CHANGELOG @ 006_fiddle_react
# 11/21/2018 - See CHANGELOG @  262_add_chef_setup
# 11/24/2018 - See CHANGELOG @ 265_nativescript_14
# ---------------------------------------------------------------------------------------------------|
source bin/_utils.sh;
source bin/_types.sh;
source bin/_env.sh;

_path=$(pwd;)  # Capture Path
_bin="${_path}/bin";
_type="???";
_fiddleCriteria="???";
_fiddle="???";
_fiddleRoot="???";
_projectName="???";

case "$#" in
  1)
    _type=$(echo $1);
    ;;
  *)
    if [[ "$#" -ge 2 ]]
    then
      _type=$(echo $1);
      _fiddleCriteria=$(echo $2);
      _fiddleSubDir="../fiddles/${_type}";
    fi
    ;;
esac


if [[ -d "${_fiddleSubDir}" ]]
then
  _fiddle=$(getFiddle "${_type}" "${_fiddleCriteria}";);
  _fiddleRoot="${_fiddleSubDir}/${_fiddle}";
  _projectName=${_fiddle};
fi
_port=${WEB_SERVER_PORT};

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
        'c')
            source bin/c/.gccrc;
            source bin/c/_install.sh;
            source bin/c/_start.sh;
            cd ${_fiddleRoot};
            isGccInstalled || exit 112;
            gccStart || exit 113;
            ;;
        'chef')
            source bin/chef/_start.sh;
            source bin/chef/_install.sh;
            _scriptDir=$(pwd;);
            cd ${_fiddleSubDir};
            _chefRootDir=$(pwd;);
            _templateDir="${_chefRootDir}/template";
            cd ${_scriptDir} || exit $?;
            kitchenInit ${_chefRootDir} || exit 120;
            updateKitchenYml ${_templateDir} ${_chefRootDir} || exit 121;
            cd ${_scriptDir} || exit $?;
            cd ${_fiddleRoot} || exit $?;
            chefStart || exit 122;

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
        'javac')
            source bin/javac/.javacrc;
            source bin/javac/_install.sh;
            source bin/javac/_start.sh;
            cd ${_fiddleRoot};
            isJavacInstalled || exit 114;
            isJavaInstalled || exit 115;
            javacStart || exit 116;
            ;;
        'meteor')
            source bin/meteor/_install.sh;
            source bin/meteor/_start.sh;
            cd ${_fiddleRoot};
            meteorStart || exit 94;
            ;;
        'node')
            source bin/node/_start.sh;
            cd ${_fiddleRoot};
            nodeStart || exit 117;
            ;;
        'nativescript')
            source bin/nativescript/_install.sh;
            source bin/nativescript/_start.sh;
            cd ${_fiddleRoot};
            _projectName=$(toLowerCase $(parseName ${_fiddle};);) || exit 107;
            nvmInstall || exit 100;
            nativescriptPreview ${_projectName} ${__NS_TEMPLATE_TYPE__} || exit 103;
            ;;
        'react')
            if [[ -d ${_fiddleRoot} ]]
            then
                source bin/react/_install.sh;
                source bin/react/_start.sh;
                cd ${_fiddleRoot};
                reactStart || exit 119;
            else
                if [[ -d "../fiddles/${_type}/dist" ]]
                then
                  cd "../fiddles/${_type}/dist" || exit 88;
                  live-server --port=${_port} || exit 96;
                else
                  exit 118;
                fi
            fi
            ;;
        'all')
            cd "../fiddles" || exit 88;
            live-server --port=${_port} || exit 95;
            ;;
        *)  if [[ -d "../fiddles/${_type}" ]]
            then
              cd "../fiddles/${_type}" || exit 88;
              live-server --port=${_port} || exit 96;
            else
              exit 118;
            fi
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
    86) clear
       voidShowSlug ${thisFile};
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[[n]]\" \"[[p]]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        voidEchoFiddleTypes "start";
        echo "";
        echo "[[n]] - OPTIONAL fiddle name. When specified the fiddle's path will be used as the root directory."
        echo ""
        echo "[[p]] - OPTIONAL port number. If not specified then port 1841 will be used."
        echo "        Note - If you specify a different port, then to stop the resulting process"
        echo "        using the fiddle-stop.sh script, you will need to supply the same port."
        echo ""
        ;;
    87) echo -e "Fubar\tCannot find the \"${_path}/bin\" directory."
        ;;
    88) echo -e "Fubar\tCall to the \"live-server\" failed."
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
    114) echo -e "Fubar\t\"java\" is not installed or configured correctly.";
        ;;
    115) echo -e "Fubar\t\"javac\" is not installed or configured correctly.";
        ;;
    116) echo -e "Fubar\t\"javacStart\" function call failed for \"${_fiddleSubDir}\".";
        ;;
    117) echo -e "Fubar\t\"nodeStart\" function call failed for \"${_fiddleRoot}\".";
        ;;
    118) echo -e "Fubar\tInvalid fiddle type, \"${_type}\", specified.";
        rc=0;
        ;;
    119) echo -e "Fubar\tthe \"reactStart\" function call failed for \"${_fiddleRoot}\".";
        rc=0;
        ;;
    120) echo -e "Fubar\tthe \"kitchenInit\" function call failed for \"${_fiddleRoot}\".";
        rc=0;
        ;;
    121) echo -e "Fubar\tthe \"updateKitchenYml\" function call failed for \"${_fiddleRoot}\".";
        rc=0;
        ;;
    122) echo -e "Fubar\tthe \"chefStart\" function call failed for \"${_fiddleRoot}\".";
        rc=0;
        ;;
    *)  echo -e "Fubar\tAn unknown error has occurred. You win -- Ha! Ha!"
        ;;
esac
#finally
exit ${rc}
