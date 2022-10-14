#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : ENTRY POINT FOR ALL FIDDLE-*.SH SCRIPTS_________________________________|
#  Command line Arguments  : $1 = COMMAND TYPE - "create", $2, $3 ..  = REQUIRED ARGUMENTS___________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# 05/01/2015 - See CHANGELOG @ 201505011810
# 05/03/2015 - See CHANGELOG @ 201505310420
# 06/21/2015 - See CHANGELOG @ 201506210420
# 09/10/2015 - See CHANGELOG @ 201508240420
# 09/23/2015 - See CHANGELOG @ 201509220420
# 03/12/2015 - See CHANGELOG @ 201603100420
# 05/02/2015 - See CHANGELOG @ 201605020420
# 02/11/2017 - See CHANGELOG @ 201702110420
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# 08/04/2018 - See CHANGELOG @ 006_fiddle_react
# 11/30/2018 - See CHANGELOG @ 272_add_fiddle_stop
# 04/11/2019 - See CHANGELOG @ 300_react_15
# ---------------------------------------------------------------------------------------------------|
clear;
source bin/_utils.sh;
source bin/_types.sh;

port=1841;
#thisFile=$(echo "$0" | sed 's/\.\///g');

function fiddleIndex() {
    ./fiddle-index.sh $1 || exit $?;
}

function fiddleIndexAll() {
    fiddleIndex 'angular' || exit $?;
    fiddleIndex 'aurelia' || exit $?;
    fiddleIndex 'compass' || exit $?;
    fiddleIndex 'd3' || exit $?;
    fiddleIndex 'dojo' || exit $?;
    fiddleIndex 'extjs5' || exit $?;
    fiddleIndex 'extjs6' || exit $?;
    fiddleIndex 'jquery' || exit $?;
    fiddleIndex 'rxjs' || exit $?;
    fiddleIndex 'react' || exit $?;
    fiddleIndex 'svg' || exit $?;
    fiddleIndex 'three' || exit $?;
    fiddleIndex 'tween' || exit $?;
}


#try
(

    voidShowSlug ${thisFile};

    if [ "$#" -lt 1 ]; then  exit 86; fi
    case $1 in
        'build')
            case "$#" in
                2)
                    ./fiddle-build.sh $2;
                    ./fiddle-index.sh $2;
                    ;;
                3)
                    ./fiddle-build.sh $2 $3;
                    ./fiddle-index.sh $2;
                    ;;
                *)
                    ./fiddle-build.sh;
                    ;;
            esac
            exit 0;
          ;;
        'combine')
            case "$#" in
                1 | 2)
                    ./fiddle-combine.sh; exit 0;
                    ;;
                3)
                    ./fiddle-combine.sh $2 $3;
                    ;;
                4)
                    ./fiddle-combine.sh $2 $3 $4;
                    ;;
                *)
                    ./fiddle-combine.sh $2 $3 $4 $5;
                    ;;
            esac
            ;;
        'create')
            if [ "$#" -lt 3 ]; then ./fiddle-create.sh; exit 0; fi
            
            if [ "$#" -eq 4 ]
            then
                fiddleName="$3$4"
                ./fiddle-delete.sh $2 ${fiddleName} || exit 0;
                ./fiddle-create.sh $2 $3 $4 || exit $?;
            else
                ./fiddle-create.sh $2 $3 || exit $?;
            fi
            ./fiddle-index.sh $2 || exit $?;
            ;;
        'edit')
            if [ "$#" -lt 3 ]; then  ./fiddle-edit.sh;  exit 0; fi
            ./fiddle-edit.sh $2 $3;
            ;;
        'fork')
            if [ "$#" -lt 4 ]; then  ./fiddle-fork.sh;  exit 0; fi
            ./fiddle-fork.sh $2 $3 $4;
            ./fiddle-index.sh $2;
            ;;
        'index')
            if [ "$#" -lt 2 ]; then  ./fiddle-index.sh;  exit 0; fi

            if [[ "$2" == "all" ]]
            then
                fiddleIndexAll || exit $?;
            else
                ./fiddle-index.sh $2 || exit $?;
            fi
            ;;
        'start')
            if [ "$#" -lt 2 ]; then  ./fiddle-start.sh;  exit 0; fi
            if [ "$#" -eq 4 ]; then port=$4; fi
            ./fiddle-start.sh  $2 $3 ${port}
            ;;
        'stop')
            if [ "$#" -lt 2 ]; then  ./fiddle-stop.sh;  exit 0; fi
            ./fiddle-stop.sh  $2 $3;
            ;;
        'emulate')
            if [ "$#" -lt 2 ]; then  ./fiddle-emulate.sh;  exit 0; fi
            ./fiddle-emulate.sh $2;
            ;;
        'delete')
            if [ "$#" -lt 3 ]; then  ./fiddle-delete.sh;  exit 0; fi
            ./fiddle-stop.sh $2 $3;
            ./fiddle-delete.sh $2 $3;
            ./fiddle-index.sh $2;
            ;;
         'list')
            if [ "$#" -lt 2 ]; then  ./fiddle-list.sh;  exit 0; fi
            ./fiddle-list.sh $2;
            ;;
         'publish')
          if [ "$#" -lt 2 ]; then  ./fiddle-publish.sh;  exit 0; fi
            ./fiddle-publish.sh $2;
            ;;
        'refactor')
            if [ "$#" -lt 4 ]; then  ./fiddle-refactor.sh;  exit 0; fi
            ./fiddle-refactor.sh $2 $3 $4;
            ;;
        'test')
            case "$#" in
                2)
                    ./fiddle-test.sh $2;
                    ;;
                3)
                    ./fiddle-test.sh $2 $3;
                    ;;
                *)
                    ./fiddle-test.sh;
                    ;;
            esac
            exit 0;
            ;;
         'update')
            case "$#" in
                2)
                    ./fiddle-update.sh $2;
                    ;;
                3)
                    ./fiddle-update.sh $2 $3;
                    ;;
                *)
                    ./fiddle-update.sh;
                    ;;
            esac
            exit 0;
            ;;
         'setup')
            if [ "$#" -lt 3 ]; then  ./fiddle-setup.sh;  exit 0; fi
            ./fiddle-setup.sh $2 $3;
            ;;
        *)  exit 86
            ;;
    esac
)
#catch
_rc=$?
case ${_rc} in
    0)  echo ""
        ;;
    86) clear
        voidShowTitle ${thisFile};
        echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[c]\" \"[a1]\" \"[a2]\" \"[aN]\""
        echo ""
        echo -e "[c]\tcommand. Valid types include: "
        echo ""
        echo -e "\t\"build\"\t\tBuild (minify) a fiddle"
        echo -e "\t\"create\"\tCreate a new fiddle"
        echo -e "\t\"combine\"\tCombine src files into an app.js file"
        echo -e "\t\"fork\"\t\tFork an existing fiddle"
        echo -e "\t\"index\"\t\tRe-index a specific fiddle type"
        echo -e "\t\"list\"\t\tList the fiddles defined for a specific type"
        echo -e "\t\"publish\"\tUpdate/Synchronize the configured GITHUB_PUBLISH_REPO"
        echo -e "\t\"setup\"\t\tSetup the local machine"
        echo -e "\t\"start\"\t\tStart the fiddle web service process"
        echo -e "\t\"delete\"\tDelete an existing fiddle"
        echo -e "\t\"refactor\"\tRename (\"refactor\") an existing fiddle"
        echo -e "\t\"test\"\t\tInvoke JsTestDriver for a given fiddle"
        echo -e "\t\"update\"\tRun npm-check-updates for a given fiddle or type"
        echo -e "\t\"emulate\"\tStartup the configured android emulator"
        echo -e "\t\"edit\"\t\tModify a fiddle"
        echo ""
        echo -e "[a1-aN]\targuments. The arguments required by the "
        echo -e "\tspecified command. There can be up to 3 arguments."
        echo -e "\tTo understand the arguments required by a specific"
        echo -e "\tcommand execute the command with no additional"
        echo -e "\tparameters."
        echo ""
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}
