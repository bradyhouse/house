#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/26/2018______________________________________________________________|
#  Description             : UTILITY USED TO NPM-CHECK-UPDATES AGAINST A FIDDLE OR COLLECTION________|
#  Command line Arguments  : $1 = FIDDLE TYPE $2 = FIDDLE NAME (OPTIONAL)____________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 05/26/2018 - Baseline ~ See CHANGELOG @ 230_update_and_shrinkwrap
# ---------------------------------------------------------------------------------------------------|
source bin/_utils.sh;
source bin/_types.sh;
source bin/_env.sh;

_os=$(echo $1);
_app=$(echo $2);

# if the name parameter is specified -- then simply update the target fiddle
# otherwise, loop through all fiddles of the specified type and update each fiddle

function updateFiddle() {
  groupLog "updateFiddle";
  _location=$(pwd;)
  _type=$1
  _fiddleCriteria=$2
  _fiddlesDir=$(cd ..; cd "fiddles/${_type}"; pwd;)
  _fiddleName=$(getFiddle "${_type}" "${_fiddleCriteria}";);
  _fiddleDir="${_fiddlesDir}/${_fiddleName}";

  case ${_type} in
        'angular2-cli')
            source bin/angular2-cli/_update.sh;
            update ${_fiddleDir};
            ;;
        'electron')
            source bin/electron/_update.sh;
            update ${_fiddleDir};
            ;;
        'meteor')
            source bin/meteor/_update.sh;
            update ${_fiddleDir};
            ;;
        'node')
            source bin/node/_update.sh;
            update ${_fiddleDir};
            ;;
        *)  exit 86
            ;;
  esac
  cd ${_location};

}

function updateFiddles() {
  groupLog "updateFiddles";
  _location=$(pwd;)
  _type=$1
  _fiddlesDir=$(cd ..; cd "fiddles/${_type}"; pwd;)
  cd ${_fiddlesDir};
  _fiddleNamesStr="";
  for _fiddleDir in */ .*/
  do
    _fiddleName=${_fiddleDir%*/};
    case "${_fiddleName}" in
      *fiddle*)
        if [[ "${_fiddleNamesStr}" == "" ]]
        then
          _fiddleNamesStr="${_fiddleName}";
        else
          _fiddleNamesStr="${_fiddleNamesStr}, ${_fiddleName}";
        fi
      ;;
    esac
  done
  cd ${_location};
  IFS=', ' read -r -a _fiddleNames <<< "${_fiddleNamesStr}";
  for _fiddleNamesI in "${_fiddleNames[@]}"
  do
     groupLog "updating ${_fiddleNamesI} ...";
     updateFiddle "${_type}" "${_fiddleNamesI}";
  done

}

#try
(

    case "$#" in
      1)
          updateFiddles $1 || exit $?;
          ;;
      2)
          updateFiddle $1 $2 || exit $?;
          ;;
      *)
           exit 86;
          ;;
    esac
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
        echo "$0 \"[t]\" \"[n]\"";
        echo "";
        echo "[t] - fiddle type";
        echo "";
        voidEchoFiddleTypes "update";
        echo "";
        echo "[n] - name (optional)";
        echo "";
        echo "";
        ;;
    87) groupLog "Fubar\t\"update\" failed.";
        ;;
    *)  groupLog "fubar! Something went wrong.";
        ;;
esac
#finally
exit ${rc}

