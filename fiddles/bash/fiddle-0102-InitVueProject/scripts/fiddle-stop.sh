#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/30/2018______________________________________________________________|
#  Description             : MASTER FIDDLE STOP FUNCTION SCRIPT______________________________________|
#  Command line Arguments  : $1 = FIDDLE TYPE________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver ~ 272_add_fiddle_stop
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

function stopFiddle() {
    groupLog "stopFiddle";
    case ${_type} in
        'chef')
            source bin/chef/_stop.sh;
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
            chefStop ${_fiddle} || exit 122;

            ;;
        *)
            ;;
    esac
}
#try
(
    if [ "$#" -lt 1 ]; then  exit 86; fi
    stopFiddle || exit $?;
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
        echo "$0 \"[t]\" \"[n]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        voidEchoFiddleTypes "stop";
        echo "";
        echo "[n] -   Fiddle name."
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
