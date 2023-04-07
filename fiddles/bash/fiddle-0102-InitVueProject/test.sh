#!/usr/bin/env bash

source scripts/bin/_utils.sh;
source scripts/bin/_env.sh;
source scripts/bin/react/_create.sh;
source scripts/bin/react/_install.sh;
source scripts/bin/react/_start.sh;

__TEST_NUM__=14;

function contains() {
  local e
  for e in "${@:2}"; do [[ "$e" == "$1" ]] && return 0; done
  return 1
}

function menu() {
    testArr=("1" "2" "3" "4" "5" "6" "7" "8" "9" "10" "11" "12" "13" "14")
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
    echo -e "9\t\"test update all\""
    echo -e "10\t\"test list\""
    echo -e "11\t\"test build\""
    echo -e "12\t\"test all\""
    echo -e "13\t\"teardown\""
    echo -e "14\t Quit"
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


function testVueCreate() {
  bornOnDate=$(date +"%m-%d-%y";)
  name="fiddle-0000-Template";
  cd "scripts";
  ./fiddle.sh create vue "${name}" "ts" || exit 1;
  cd ..;
}

function testVueStart() {
  name="fiddle-0000-TemplateTs";
  cd "scripts";
  nohup ./fiddle.sh start vue ${name} &
  sleep 20;
  echo -e "GET http://localhost:3000 HTTP/1.0\n\n" | nc localhost 3000 > /dev/null 2>&1;
  if [ $? -ne 0 ]; then killPort 3000 || exit $?; exit 2; fi
  killPort 3000 || exit $?;
  cd ..;
}

function testVueBuild() {
  name="fiddle-0000-TemplateTs";
    cd "scripts";
  ./fiddle.sh build vue ${name} || exit 3;
  cd ..;
}

function testVueFork() {
  name="0000";
  newName="fiddle-0001-Fork";
  cd "scripts";
  ./fiddle.sh fork vue ${name} ${newName}  || exit 4;
  cd ..;
}

function testVueUpdate() {
  name="fiddle-0000-TemplateTs";
    cd "scripts";
  ./fiddle.sh update vue ${name} || exit 5;
  cd ..;
}

function testVueUpdateAll() {
    cd "scripts";
  ./fiddle.sh update vue || exit 12;
  cd ..;
}


function testVueRefactor() {
  name="0001";
  newName="fiddle-0100-Fork";
  cd "scripts";
  ./fiddle.sh refactor vue ${name} ${newName}  || exit 6;
  cd ..;
}

function testVueList() {
  cd "scripts";
  ./fiddle.sh list vue || exit 7;
  cd ..;
}

function testVueTest() {
  name="0000";
  cd "scripts";
  ./fiddle.sh test vue ${name} || exit 8;
  cd ..;
}

function testVueIndex() {
  cd "scripts";
  ./fiddle.sh index vue || exit 9;
  cd ..;
}

function testVueDelete() {
  name="0000";
  cd "scripts";
  ./fiddle.sh delete vue ${name} || exit 10;
  cd ..;
}

function testAll() {
    startingPoint=$(pwd);
    startLog $(echo "$0" | sed 's/\.\///g');
    tearDown || exit $?;
    groupLog "testVueCreate";
    testVueCreate || exit $?;
    groupLog "testVueStart";
    testVueStart || exit $?;
    groupLog "testVueBuild";
    testVueBuild || exit $?;
    groupLog "testVueFork";
    testVueFork || exit $?;
    groupLog "testVueUpdate";
    testVueUpdate || exit $?;
    groupLog "testVueUpdateAll";
    testVueUpdateAll || exit $?;
    groupLog "testVueRefactor";
    testVueRefactor || exit $?;
    groupLog "testVueList";
    testVueList || exit $?;
    groupLog "tearDown";
    tearDown || exit $?;
}

function tearDown() {
  if [[ -d "./fiddles/vue/dist/fiddle-0000-TemplateTs" ]]
  then
    rm -rf "./fiddles/vue/dist/fiddle-0000-TemplateTs" || exit $?;
  fi
   if [[ -d "./fiddles/vue/dist/fiddle-0000-TemplateJs" ]]
  then
    rm -rf "./fiddles/vue/dist/fiddle-0000-TemplateJs" || exit $?;
  fi
  if [[ -d "./fiddles/vue/fiddle-0000-TemplateTs" ]]
  then
    rm -rf "./fiddles/vue/fiddle-0000-TemplateTs" || exit $?;
  fi
  if [[ -d "./fiddles/vue/fiddle-0000-TemplateJs" ]]
  then
    rm -rf "./fiddles/vue/fiddle-0000-TemplateJs" || exit $?;
  fi
  if [[ -d "./fiddles/vue/dist/fiddle-0001-Fork" ]]
  then
    rm -rf "./fiddles/vue/dist/fiddle-0001-Fork" || exit $?;
  fi
  if [[ -d "./fiddles/vue/fiddle-0001-Fork" ]]
  then
    rm -rf "./fiddles/vue/fiddle-0001-Fork" || exit $?;
  fi
  if [[ -d "./fiddles/vue/fiddle-0100-Fork" ]]
  then
    rm -rf "./fiddles/vue/fiddle-0100-Fork" || exit $?;
  fi
}

function runTest() {
    case ${__TEST_NUM__} in
        1)  testVueCreate || exit $?;
            ;;
        2)  testVueFork || exit $?;
            ;;
        3)  testVueIndex || exit $?;
            ;;
        4)  testVueStart || exit $?;
            ;;
        5)  testVueDelete || exit $?;
            ;;
        6)  testVueRefactor || exit $?;
            ;;
        7)  testVueTest || exit $?;
            ;;
        8)  testVueUpdate || exit $?;
            ;;
        9) testVueUpdateAll || exit $?;
            ;;
        10) testVueList || exit $?;
            ;;
        11) testVueBuild || exit $?;
            ;;
        12) testAll || exit $?;
            ;;
        13) tearDown || exit $?;
            ;;
        *)  echo "Goodbye!"; exit $?;
            ;;
    esac
}

function catch() {
    case $1 in
        0)  endLog $(echo "$0" | sed 's/\.\///g');
            ;;
        1)  endLog "test 1 failed - testVueCreate";
            ;;
        2)  endLog "test 2 failed - testVueStart";
            ;;
        3)  endLog "test 3 failed - testVueBuild";
            ;;
        4)  endLog "test 4 failed - testVueFork";
            ;;
        5)  endLog "test 5 failed - testVueUpdate";
            ;;
        6)  endLog "test 6 failed - testVueRefactor";
            ;;
        7)  endLog "test 7 failed - testVueList";
            ;;
        8)  endLog "test 8 failed - testVueTest";
            ;;
        9)  endLog "test 9 failed - testVueIndex";
            ;;
        10) endLog "test 10 failed - testVueDelete";
            ;;
        11) endLog "test 11 failed - testVueStartAll";
            ;;
        12) endLog "test 12 failed - testVueUpdateAll";
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
rc=$?; catch ${rc};
# finally
exit ${rc};
