#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 09/22/2016______________________________________________________________|
#  Description             : MASTER C FORK FUNCTION__________________________________________________|
#  Entry Point             : gccFork_________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-fork.sh_______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201611280420
# ---------------------------------------------------------------------------------------------------|

function initForkedConfigFile() {
  groupLog "initFiddleConfigFile";
  $(echo "" > "$1/.fiddlerc";) || exit 2
  $(echo "export __PROJECT_DIR__=$2;" >>"$1/.fiddlerc";) || exit 2
  $(echo "export __SOURCE_FILE__=${__DEFAULT_SOURCE_FILE__};" >>$1/".fiddlerc";) || exit 8
  $(echo "export __COMPILED_FILE__=$2;" >>$1/".fiddlerc";) || exit 8

}

function gccFork() {
  groupLog "cFork";
  this=$0;
  forkSource=$1;
  forkTarget=$2;
  # try
  (
    sourceSuffix=$(parseName ${forkSource};) || exit 1;
    sourceProjectName=$(toLowerCase ${forkSource};) || exit 1;
    targetSuffix=$(parseName ${forkTarget};) || exit 1;
    targetProjectName=$(toLowerCase ${targetSuffix};) || exit 1;
    initForkedConfigFile "${forkTarget}" "${targetProjectName}" || exit $?;
    $(voidSubstr "${forkSource}" ${forkTarget} "${forkTarget}/README.md";) || exit 3;
    $(echo  "" >> "${forkTarget}/README.md";) || exit 3
    $(echo  "" >> "${forkTarget}/README.md";) || exit 3
    $(echo "### Forked From" >> "${forkTarget}/README.md";) || exit 3
    $(echo  "" >> "${forkTarget}/README.md";) || exit 3
    $(echo "[${forkTarget}](../${forkSource})" >> "${forkTarget}/README.md";) || exit 3
  )
  # catch
  rc=$?; case ${rc} in
    0)  groupLog "${forkSource} forked to ${forkTarget}";
      ;;
    1)  groupLog "Failed while attempting to parse original project name.";
      ;;
    2)  groupLog "Call to the initForkedConfigFile function failed.";
      ;;
    3)  groupLog "failed while trying to append the \"forked from\" section to the README.markdown file."
      ;;
    *)  groupLog "F U B A R ~ Something went wrong."
      ;;
    esac
  # finally
  return ${rc};

}
