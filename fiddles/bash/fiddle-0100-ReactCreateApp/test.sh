#!/usr/bin/env bash

source scripts/bin/_utils.sh;
source scripts/bin/_env.sh;
source scripts/bin/react/_create.sh;
source scripts/bin/react/_install.sh;
source scripts/bin/react/_start.sh;

__TEST_NUM__=12;

function contains() {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
  return 1
}

function menu() {
    testArr=("1" "2" "3" "4", "5" "6" "7" "8", "9" "10" "11" "12")
    echo -e ""
    echo -e "--------------------------------------------------------"
    echo -e "TEST MENU"
    echo -e "--------------------------------------------------------"
    echo -e ""
    echo -e "1\t\"test create\""
    echo -e "2\t\"test fork\""
    echo -e "3\t\"test index\""
    echo -e "4\t\"test start\""
    echo -e "5\t\"test delete\""
    echo -e "6\t\"test refactor\""
    echo -e "7\t\"test test\""
    echo -e "8\t\"test update\""
    echo -e "9\t\"test list\""
    echo -e "10\t\"test build\""
    echo -e "11\t\"test all\"\tEverything but start"
    echo -e "12\tQuit"
    echo -e ""
    echo -e "--------------------------------------------------------"
    read -p "(1-11)? " _test
    if [[ $(contains "${_test}" "${testArr[@]}"; echo "$?";) == "0" ]]
    then
        __TEST_NUM__=${_test};
    else
        clear;
        menu;
    fi
}


function testReactCreate() {
  bornOnDate=$(date +"%m-%d-%y";)
  name="fiddle-0000-Template";
  cd "scripts";
  ./fiddle.sh create react ${name} || exit 1;
  cd ..;
}

function testReactStart() {
  name="0000";
    cd "scripts";
  ./fiddle.sh start react ${name} || exit 2;
  cd ..;
}

function testReactStartAll() {
    cd "scripts";
  $(nohup ./fiddle.sh start react &) || exit 11;
  sleep 2m;

  cd ..;
}

function testReactBuild() {
  name="0000";
    cd "scripts";
  ./fiddle.sh build react ${name} || exit 3;
  cd ..;
}

function testReactFork() {
  name="0000";
  newName="fiddle-0001-Fork";
  cd "scripts";
  ./fiddle.sh fork react ${name} ${newName}  || exit 4;
  cd ..;
}

function testReactUpdate() {
  name="0000";
    cd "scripts";
  ./fiddle.sh update react ${name} || exit 5;
  cd ..;
}

function testReactRefactor() {
  name="0001";
  newName="fiddle-0100-Fork";
  cd "scripts";
  ./fiddle.sh refactor react ${name} ${newName}  || exit 6;
  cd ..;
}

function testReactList() {
  cd "scripts";
  ./fiddle.sh list react || exit 7;
  cd ..;
}

function testReactTest() {
  name="0000";
  cd "scripts";
  ./fiddle.sh test react ${name} || exit 8;
  cd ..;
}

function testReactIndex() {
  cd "scripts";
  ./fiddle.sh index react || exit 9;
  cd ..;
}

function testReactDelete() {
  name="0000";
  cd "scripts";
  ./fiddle.sh delete react ${name} || exit 10;
  cd ..;
}

function testAll() {
    startingPoint=$(pwd);
    startLog $(echo "$0" | sed 's/\.\///g');
    tearDown || exit $?;
    groupLog "testReactCreate";
    testReactCreate || exit $?;
    #groupLog "testReactStart";
    #testReactStart || exit $?;
    groupLog "testReactBuild";
    testReactBuild || exit $?;
    groupLog "testReactFork";
    testReactFork || exit $?;
    groupLog "testReactUpdate";
    testReactUpdate || exit $?;
    groupLog "testReactRefactor";
    testReactRefactor || exit $?;
    groupLog "testReactList";
    testReactList || exit $?;
    groupLog "tearDown";
    tearDown || exit $?;
}

function tearDown() {
  if [[ -d "./fiddles/react/dist" ]]
  then
    rm -rf "./fiddles/react/dist" || exit $?;
  fi
  if [[ -d "./fiddles/react/fiddle-0000-Template" ]]
  then
    rm -rf "./fiddles/react/fiddle-0000-Template" || exit $?;
  fi
  if [[ -d "./fiddles/react/fiddle-0001-Fork" ]]
  then
    rm -rf "./fiddles/react/fiddle-0001-Fork" || exit $?;
  fi
}

function runTest() {
    case ${__TEST_NUM__} in
        1)  testReactCreate || exit $?;
            ;;
        2)  testReactFork || exit $?;
            ;;
        3)  testReactIndex || exit $?;
            ;;
        4)  testReactStart || exit $?;
            ;;
        5)  testReactDelete || exit $?;
            ;;
        6)  testReactRefactor || exit $?;
            ;;
        7)  testReactTest || exit $?;
            ;;
        8)  testReactUpdate || exit $?;
            ;;
        9)  testReactList || exit $?;
            ;;
        10) testReactBuild || exit $?
            ;;
        11) testAll || exit $?
            ;;
        *)  echo "Goodbye!"
            ;;
    esac
}

function catch() {
    case $1 in
        0)  endLog $(echo "$0" | sed 's/\.\///g');
            ;;
        1)  endLog "test 1 failed - testReactCreate";
            ;;
        2)  endLog "test 2 failed - testReactStart";
            ;;
        3)  endLog "test 3 failed - testReactBuild";
            ;;
        4)  endLog "test 4 failed - testReactFork";
            ;;
        5)  endLog "test 5 failed - testReactUpdate";
            ;;
        6)  endLog "test 6 failed - testReactRefactor";
            ;;
        7)  endLog "test 7 failed - testReactList";
            ;;
        8)  endLog "test 8 failed - testReactTest";
            ;;
        9)  endLog "test 9 failed - testReactIndex";
            ;;
        10)  endLog "test 10 failed - testReactDelete";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    clear;
    menu || exit $?;
    runTest || exit $?;
)
rc=$?; catch ${rc};
# finally
exit ${rc};
