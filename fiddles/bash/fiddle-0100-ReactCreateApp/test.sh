#!/usr/bin/env bash

source scripts/bin/_utils.sh;
source scripts/bin/_env.sh;
source scripts/bin/react/_create.sh;
source scripts/bin/react/_install.sh;
source scripts/bin/react/_start.sh;


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

function testReactDelete() {
  name="0000";
    cd "scripts";
  ./fiddle.sh start react ${name} || exit 3;
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



function tearDown() {
  if [[ -d "./fiddles/react/fiddle-0000-Template" ]]
  then
    rm -rf "./fiddles/react/fiddle-0000-Template";
  fi
  if [[ -d "./fiddles/react/fiddle-0001-Fork" ]]
  then
    rm -rf "./fiddles/react/fiddle-0001-Fork";
  fi
}

function catch() {
    case $1 in
        0)  endLog $(echo "$0" | sed 's/\.\///g');
            ;;
        1)  endLog "test 1 failed - testReactCreate";
            ;;
        2)  endLog "test 2 failed - testReactStart";
            ;;
        3)  endLog "test 3 failed - testReactDelete";
            ;;
        4)  endLog "test 4 failed - testReactFork";
            ;;
        5)  endLog "test 5 failed - testReactUpdate";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    startingPoint=$(pwd);
    startLog $(echo "$0" | sed 's/\.\///g');
    groupLog "testReactCreate";
    testReactCreate || exit $?;
    #groupLog "testReactStart";
    #testReactStart || exit $?;
    #groupLog "testReactDelete";
    #testReactDelete || exit $?;
    #groupLog "testReactFork";
    #testReactFork || exit $?;
    #groupLog "testReactUpdate";
    #testReactUpdate || exit $?;
    groupLog "tearDown";
    tearDown;
)
rc=$?; catch ${rc};
# finally
exit ${rc};
