#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/31/2015______________________________________________________________|
#  Description             : UTILITY USED TO "SAFELY" RENAME (REFACTOR) A FIDDLE SUB-DIRECTORY_______|
#  Command line Arguments  : $1 = FIDDLE TYPE, $2 = FIDDLE NAME, $3 = NEW NAME_______________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 05/31/2015 - Baseline ~ See CHANGELOG @ 201505310420
# 06/20/2015 - See CHANGELOG @ 201506200420
# 07/05/2015 - See CHANGELOG @ 201506290420
# 07/11/2015 - See CHANGELOG @ 201507110420
# 07/26/2015 - See CHANGELOG @ 201507260420
# 09/10/2015 - See CHANGELOG @ 201508240420
# 12/06/2015 - See CHANGELOG @ 201511100420
# 01/17/2016 - See CHANGELOG @ 201601100420
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
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}';
source bin/_utils.sh
source bin/_types.sh

fiddleType=$1;
fiddleCriteria=$(echo $2);
fiddleName=$(getFiddle "${fiddleType}" "${fiddleCriteria}";);
newName=$3;
fiddlePath="../fiddles/${fiddleType}/${fiddleName}";
newFiddlePath="../fiddles/${fiddleType}/${newName}";
newIndexFile="../fiddles/${fiddleType}/${newName}/index.html";
newReadmeFile="../fiddles/${fiddleType}/${newName}/README.markdown";
altNewReadmeFile="../fiddles/${fiddleType}/${newName}/README.md";
changeLogFile="../CHANGELOG.md";
#try
(
	if [ "$#" -ne 3 ]; then  exit 86; fi
  if [[ -d "${newFiddlePath}" ]]; then exit 87; fi
  if [[ ! -d "${fiddlePath}" ]]; then exit 88; fi

  sudo mv "${fiddlePath}" "${newFiddlePath}" || exit 90;

  if [[ "${fiddleName}" != "fiddle-0000-Template" ]]
  then
    if [[ -f "${changeLogFile}" ]]
    then
        $(voidSubstr "${fiddleName}" "${newName}" "${changeLogFile}";) || exit 91;
    fi
  fi

  case ${fiddleType} in
    'android' | 'angular2-cli' | 'angular2-seeder' | 'c' | 'ember' | 'electron' | 'java' | 'javac' | 'meteor' | 'nativescript' )
        if [[ -f "${altNewReadmeFile}" ]]
        then
            $(voidSubstr "${fiddleName}" "${newName}" "${altNewReadmeFile}";) || exit 91;
        fi
        ;;
    'angular' | 'angular2' | 'aurelia' | 'compass' | 'docker' | 'extjs5' | 'extjs6' | 'jquery' | 'meteor' | 'three' | 'php' | 'rxjs' | 'dojo' | 'chrome' | 'node' | 'tween' | 'typescript' | 'svg' )
        if [[ -f "${newIndexFile}" ]]
        then
            $(voidSubstr "${fiddleName}" "${newName}" "${newIndexFile}";) || exit 91;
        fi
        case ${fiddleType} in
            'angular' | 'angular2' | 'aurelia' | 'compass' | 'extjs5' | 'extjs6' | 'jquery' | 'three' | 'php' | 'rxjs' | 'dojo' | 'd3' | 'tween' | 'svg' )
                ./fiddle-index.sh ${fiddleType} || exit 89;
            ;;
        esac
        ;;
    *)
        if [[ -f "${newReadmeFile}" ]]
        then
            $(voidSubstr "${fiddleName}" "${newName}" "${newReadmeFile}";) || exit 91;
        fi
    ;;
  esac
)
#catch
_rc=$?;
case ${_rc} in
    0)  echo "Refactor process completed successfully.";
        echo "\"${fiddleName}\" is now \"${newName}\".";
        ;;
    86) echo "";
        echo "Nope ~ Incorrect number of arguments";
        echo "";
        echo "Usage:";
        echo "";
        echo "$0 \"[t]\" \"[f]\" \"[n]\"";
        echo "";
        echo "[t] - type. Valid types include: ";
        echo "";
        voidEchoFiddleTypes;
        echo "";
        echo "[f] - existing fiddle name.  For example: \"fiddleParabolaSurface\"";
        echo "";
        echo "[n] - new name.";
        echo "";
        ;;
    87) echo "fubar! New name, \"${newFiddlePath}\" is already in use.";
        ;;
    88) echo "fubar! target fiddle, \"${fiddlePath}\" does not exist.";
        ;;
    89) echo "fubar! call to \"fiddle-index.sh\" for \"${fiddleType}\" failed.";
        ;;
    90) echo "fubar! call to \"mv\" failed.";
        ;;
    91) echo "fubar! call to \"house-substr.sh\" failed.";
        ;;
    *)  echo "fubar! Something went wrong.";
        ;;
esac
#finally
exit ${_rc};
