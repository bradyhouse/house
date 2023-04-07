#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 04/11/2017______________________________________________________________|
#  Description             : UTILITY USED TO BUILD OR "PACKAGE" CERTAIN FIDDLE TYPES_________________|
#  Command line Arguments  : $1 = FIDDLE TYPE, $2 = FIDDLE NAME______________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 03/10/2017 - Baseline Ver.
# 01/24/2018 - See CHANGELOG @ aurelia-dependencies-update
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# 08/01/2018 - See CHANGELOG @ 006_fiddle_react
# 04/11/2019 - See CHANGELOG @ 300_react_15
# 03/30/2023 - See CHANGELOG @ 723-add-vuejs-support
# ---------------------------------------------------------------------------------------------------|

this=$0;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}';
source bin/_utils.sh;
source bin/_types.sh;
source bin/_env.sh;


function buildFiddle() {
  groupLog "buildFiddle";
  _location=$(pwd;)
  _type=$1
  _fiddleCriteria=$2
  _fiddlesDir=$(cd ..; cd "fiddles/${_type}"; pwd;)
  _fiddleName=$(getFiddle "${_type}" "${_fiddleCriteria}";);
  case ${_type} in
        'angular2-cli')
            source bin/angular2-cli/_build.sh;
            build ${_fiddleName} || exit $?;
            ;;
        'react')
            source bin/react/_build.sh;
            build ${_fiddleName} || exit $?;
            ;;
        'vue')
            source bin/vue/_build.sh;
            build ${_fiddleName} || exit $?;
            ;;
        *)  exit 86
            ;;
  esac
  cd ${_location};
}

function buildFiddles() {
  groupLog "buildFiddles";
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
     groupLog "building ${_fiddleNamesI} ...";
     buildFiddle "${_type}" "${_fiddleNamesI}";
  done

}

#try
(
    case "$#" in
      1)
          buildFiddles $1 || exit $?;
          ;;
      2)
          buildFiddle $1 $2 || exit $?;
          ;;
      *)
           exit 86;
          ;;
    esac
)
#catch
_rc=$?
case ${_rc} in
    0)  echo "$2"
        ;;
    86) clear
        voidShowTitle ${this};
        echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[n]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        voidEchoFiddleTypes "build";
        echo ""
        echo "[n] - fiddle Name.  For example: \"0001\""
        echo ""
        echo ""
        ;;
    87) echo "fubar! fiddle build failed."
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}
