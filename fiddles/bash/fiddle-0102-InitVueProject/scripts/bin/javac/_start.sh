#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 12/14/2016______________________________________________________________|
#  Description             : MASTER JAVAC STARTUP FUNCTION___________________________________________|
#  Entry Point             : javacStart______________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-start.sh______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG @ 201612120420
# ---------------------------------------------------------------------------------------------------|



function javacBuild() {
    groupLog "javacBuild";

    if [[ -e ${__TARGET_DIR__} ]]
    then
        rm -rf ${__TARGET_DIR__};
    fi
    mkdir ${__TARGET_DIR__};
    echo -e "${__JAVA_COMPILER__} -sourcepath ${__SOURCE_PATH__} -classpath ${__CLASS_PATH__} ${__SOURCE_FILE__} -d ${__TARGET_DIR__}";
    echo -e "\n";
    ${__JAVA_COMPILER__} -sourcepath ${__SOURCE_PATH__} -classpath ${__CLASS_PATH__} ${__SOURCE_FILE__} -d ${__TARGET_DIR__};
}

function javaStart() {
    groupLog "javaStart";
    cd ${__TARGET_DIR__};
    echo -e "${__JAVA_RUNTIME__} ${__COMPILED_CLASS__};";
    echo -e "\n";
    ${__JAVA_RUNTIME__} ${__COMPILED_CLASS__};
}

function javacStart() {
  groupLog "javacStart";
  if [[ ! -e ".fiddlerc" ]]; then exit -1; fi
  source ".fiddlerc";
  if [[ -d "${__PROJECT_DIR__}" ]]
  then
    cd ${__PROJECT_DIR__};
    javacBuild || exit $?;
    if [[ ! -e "${__TARGET_DIR__}/${__COMPILED_CLASS__}.class" ]]
    then
        exit -1;
    fi
    groupLog "Invoking executable";
    javaStart;
  fi
}
