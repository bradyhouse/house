#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 09/18/2016______________________________________________________________|
#  Description             : MASTER NATIVESCRIPT FORK FUNCTION_______________________________________|
#  Entry Point             : nativescriptFork________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-fork.sh_______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201609160420
# ---------------------------------------------------------------------------------------------------|

this=$0;
fiddleType="nativeScript";

function initFiddleConfigFile() {
  $(echo "" > "../fiddles/${fiddleType}/$1/.fiddlerc";) || exit 2
  $(echo "export __PROJECT_DIR__=$2;" >>"../fiddles/${fiddleType}/$1/.fiddlerc";) || exit 2
}

function nativeScriptFork() {
  groupLog "nativeScriptFort";
  source=$1;
  target=$2;
  # try
  (
    sourceProjectName=$(toLowerCase $(parseName ${source};);) || exit 1;
    targetProjectName=$(toLowerCase $(parseName ${target};);) || exit 1;
    initFiddleConfigFile "${target}" "${sourceProjectName}" || exit $?;
    updateFile "../../fiddles/${fiddleType}/${target}/README.md" ${target} ${source} || exit 3;
    $(echo  "" >> "../fiddles/${fiddleType}/${target}/README.md";) || exit 3
    $(echo  "" >> "../fiddles/${fiddleType}/${target}/README.md";) || exit 3
    $(echo "### Forked From" >> "../fiddles/${fiddleType}/${target}/README.md";) || exit 3
    $(echo  "" >> "../fiddles/${fiddleType}/${target}/README.md";) || exit 3
    $(echo "[${target}](../${source})" >> "../fiddles/${fiddleType}/${target}/README.md";) || exit 3
  )
  # catch
  rc=$?; case ${rc} in
    0)  exit 0;
      ;;
    1)  groupLog "${this}: Failed while attempting to parse original project name.";
      ;;
    2)  groupLog "${this}: Call to the initFiddleConfigFile function failed.";
      ;;
    3)  groupLog "${this}: failed while trying to append the \"forked from\" section to the README.markdown file."
      ;;
    *)  groupLog "${this}: F U B A R ~ Something went wrong."
      ;;
    esac
  # finally
  echo ${rc};

}
