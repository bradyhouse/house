#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO "SAFELY" DELETE A FIDDLE SUB-DIRECTORY__________________|
#  Command line Arguments  : $1 = FIDDLE TYPE, $2 = FIDDLE NAME______________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 04/15/2015 - See CHANGELOG @ 201504151810
# 05/01/2015 - See CHANGELOG @ 201505011810
# 05/08/2015 - See CHANGELOG @ 201505061810
# 06/20/2015 - See CHANGELOG @ 201506200420
# 07/05/2015 - See CHANGELOG @ 201506290420
# 07/11/2015 - See CHANGELOG @ 201507110420
# 07/26/2015 - See CHANGELOG @ 201507260420
# 09/10/2015 - See CHANGELOG @ 201508240420
# 09/23/2015 - See CHANGELOG @ 201509220420
# 11/26/2015 - See CHANGELOG @ 201511100420
# 01/17/2016 - See CHANGELOG @ 201601100420
# 02/01/2016 - See CHANGELOG @ 201602010420
# 03/02/2016 - See CHANGELOG @ 201603020420
# 03/10/2016 - See CHANGELOG @ 201603050420
# 04/16/2016 - See CHANGELOG @ 201604160420
# 05/17/2016 - See CHANGELOG @ 201605020420
# 05/18/2015 - See CHANGELOG @ 201605180420
# 09/16/2016 - See CHANGELOG @ 201609160420
# ---------------------------------------------------------------------------------------------------|
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}';
source bin/_utils.sh
source bin/_types.sh

fiddleType=$1
fiddleCriteria=$2
fiddleName=$(getFiddle "${fiddleType}" "${fiddleCriteria}";);
fiddlePath="../fiddles/${fiddleType}/${fiddleName}"
changeLogFile="../CHANGELOG.md"

function prompt() {
  echo -e ""
  echo -e "fiddle type:\t${fiddleType}";
  echo -e "fiddle name:\t${fiddleName}";
  echo -e "";
  read -p "Are you sure you want to delete this fiddle? [Y/n] " CMD;

  if [[ ${CMD} == "n" ]]
  then
      exit 92;
  fi

}

function updateChangeLog() {
    changeLogFile=$1
    changeLogFileTmp="${changeLogFile}.~"
    fiddleName=$2
    searchCriteria="fiddles/${fiddleType}/${fiddleName}";
    if [[ ${fiddleName} != "fiddle-0000-Template" ]]
    then
      if [[ -f "${changeLogFile}" ]]
      then
         cat "${changeLogFile}" | grep -v "${searchCriteria}" > "${changeLogFileTmp}"
         cat "${changeLogFileTmp}" > "${changeLogFile}"
         rm -f "${changeLogFileTmp}"
      fi
    fi
}


#try
(
	if [[ -d "${fiddlePath}" ]]
  then
    if [[ "${fiddleName}" == "NA" ]]; then exit 91; fi
	  if [ "$#" -ne 2 ]; then  exit 86; fi
    prompt || exit $?;
    case ${fiddleType} in
        'angular' | 'angular2' | 'angular2-cli' | 'angular2-seeder' | 'ant' | 'aurelia' | 'compass' | 'docker' | 'electron' | 'ember' | 'extjs5' | 'extjs6' | 'java' | 'jquery' | 'meteor' | 'nativescript' | 'three' | 'php' | 'python' | 'rxjs' | 'd3' | 'dojo' | 'chrome' | 'node' | 'typescript' | 'tween' | 'bash' | 'svg' )
            if [[ -d "${fiddlePath}" ]]
            then
                rm -rf "${fiddlePath}" || exit 87
            fi
            case ${fiddleType} in
                'angular' |'angular2' | 'aurelia'  | 'compass' | 'extjs5' | 'extjs6' | 'jquery' | 'three' | 'rxjs' | 'd3' | 'dojo' | 'tween' | 'svg' )
                    ./fiddle-index.sh ${fiddleType} || exit 88
                ;;
            esac
        ;;
        *)
          exit 86
          ;;
    esac
    updateChangeLog "${changeLogFile}" "${fiddleName}" || exit 90
  else
    exit 92;
  fi
)
#catch
_rc=$?
case ${_rc} in
    0)  echo "The \"${fiddleName}\" ${fiddleType} fiddle has been deleted successfully."
        ;;
    86) echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[n]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        voidEchoFiddleTypes;
        echo ""
        echo "[n] - fiddle Name.  For example: \"fiddleParabolaSurface\""
        echo ""
        echo ""
        ;;
    87) echo "fubar! failed while attempting to delete \"${fiddlePath}\"."
        ;;
    88) echo "fubar! call to \"fiddle-index.sh\" for \"${fiddleType}\" failed."
        ;;
    89) echo "fubar! the target directory, \"${fiddlePath}\", doesn't exist."
        ;;
    90) echo "fubar! the failed while attempting to update \"${changeLogFile}\"."
        ;;
    91) echo "fubar! the specified fiddle criteria,\"${fiddleCriteria}\", doesn't exist."
        ;;
    92) echo "";
        exit 0;
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}
