#!/usr/bin/env bash

source scripts/bin/_utils.sh;
source scripts/bin/_env.sh;
source scripts/bin/python/_create.sh;
source scripts/bin/python/_install.sh;
source scripts/bin/python/_start.sh;

__TEST_NUM__=14;

function contains() {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
  return 1
}

function menu() {
    testArr=("1" "2" "3" "4" "5" "6" "7" "8" "9" "10")
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
    echo -e "7\t\"test list\""
    echo -e "8\t\"test all\""
    echo -e "9\t\"teardown\""
    echo -e "10\t Quit"
    echo -e ""
    echo -e "--------------------------------------------------------"
    read -p "(1-14)? " _test
    if [[ $(contains "${_test}" "${testArr[@]}"; echo "$?";) == "0" ]]
    then
        __TEST_NUM__=${_test};
    else
        menu;
    fi
}


function testPyCreate() {
  bornOnDate=$(date +"%m-%d-%y";)
  name="fiddle-0000-Template";
  cd "scripts";
  ./fiddle.sh create python "${name}" || exit 1;
  cd ..;
}

function testPyStart() {
  name="fiddle-0000-Template";
  cd "scripts";
  nohup ./fiddle.sh start python ${name} &
  sleep 20;
  echo -e "GET http://localhost:3000 HTTP/1.0\n\n" | nc localhost 3000 > /dev/null 2>&1;
  if [ $? -ne 0 ]; then killPort 3000 || exit $?; exit 2; fi
  killPort 3000 || exit $?;
  cd ..;
}


function testPyFork() {
  name="0000";
  newName="fiddle-0001-Fork";
  cd "scripts";
  ./fiddle.sh fork python ${name} ${newName}  || exit 4;
  cd ..;
}

function testPyUpdate() {
  name="fiddle-0000-Template";
    cd "scripts";
  ./fiddle.sh update python ${name} || exit 5;
  cd ..;
}


function testPyRefactor() {
  name="0001";
  newName="fiddle-0100-Fork";
  cd "scripts";
  ./fiddle.sh refactor python ${name} ${newName}  || exit 6;
  cd ..;
}

function testPyList() {
  cd "scripts";
  ./fiddle.sh list python || exit 7;
  cd ..;
}


function testPyIndex() {
  cd "scripts";
  ./fiddle.sh index python || exit 9;
  cd ..;
}

function testPyDelete() {
  name="0000";
  cd "scripts";
  ./fiddle.sh delete python ${name} || exit 10;
  cd ..;
}

function testAll() {
    startingPoint=$(pwd);
    startLog $(echo "$0" | sed 's/\.\///g');
    tearDown || exit $?;
    groupLog "testPyCreate";
    testPyCreate || exit $?;
    groupLog "testPyStart";
    testPyStart || exit $?;
    groupLog "testPyFork";
    testPyFork || exit $?;
    groupLog "testPyRefactor";
    testPyRefactor || exit $?;
    groupLog "testPyList";
    testPyList || exit $?;
    groupLog "tearDown";
    tearDown || exit $?;
}

function tearDown() {
  if [[ -d "./fiddles/python/fiddle-0000-Template" ]]
  then
    rm -rf "./fiddles/python/fiddle-0000-Template" || exit $?;
  fi

  if [[ -d "./fiddles/python/fiddle-0001-Fork" ]]
  then
    rm -rf "./fiddles/python/fiddle-0001-Fork" || exit $?;
  fi
  if [[ -d "./fiddles/python/fiddle-0100-Fork" ]]
  then
    rm -rf "./fiddles/python/fiddle-0100-Fork" || exit $?;
  fi
}

function runTest() {
    case ${__TEST_NUM__} in
        1)  testPyCreate || exit $?;
            ;;
        2)  testPyFork || exit $?;
            ;;
        3)  testPyIndex || exit $?;
            ;;
        4)  testPyStart || exit $?;
            ;;
        5)  testPyDelete || exit $?;
            ;;
        6)  testPyRefactor || exit $?;
            ;;
        7) testPyList || exit $?;
            ;;
        8) testAll || exit $?;
            ;;
        9) tearDown || exit $?;
            ;;
        *)  echo "Goodbye!"; exit $?;
            ;;
    esac
}

function catch() {
    case $1 in
        0)  endLog $(echo "$0" | sed 's/\.\///g');
            ;;
        1)  endLog "test 1 failed - testPyCreate";
            ;;
        2)  endLog "test 2 failed - testPyStart";
            ;;
        4)  endLog "test 4 failed - testPyFork";
            ;;
        6)  endLog "test 6 failed - testPyRefactor";
            ;;
        7)  endLog "test 7 failed - testPyList";
            ;;
        9)  endLog "test 9 failed - testPyIndex";
            ;;
        10) endLog "test 10 failed - testPyDelete";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    menu || exit $?;
    runTest || exit $?;
    sleep 5 || exit $?;
    if [[ ${__TEST_NUM__} -ne "14" ]]
    then
       ./test.sh || exit $?;
    fi
    exit $?;
)
catch $?;
