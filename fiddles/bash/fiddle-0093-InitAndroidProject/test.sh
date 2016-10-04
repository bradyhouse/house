#!/usr/bin/env bash

source scripts/bin/_utils.sh;
source scripts/bin/android/.androidrc;
source scripts/bin/android/_create.sh;
source scripts/bin/android/_install.sh;
source scripts/bin/android/_start.sh;
source scripts/bin/android/_fork.sh;

function testUtilCapitalize() {
  actual=$(capitalize "template";);
  expected="Template";
  echo ${actual};
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 5;
  fi
}

function testIsAndroidInstalled() {
  actual=$(isAndroidInstalled;);
  expected=0;
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 1;
  fi
}

function testAndroidCreate() {
  bornOnDate=$(date +"%m-%d-%y";)
  name="fiddle-0000-Template";
  suffix=$(parseName ${name};);
  projectName=$(toLowerCase ${suffix};);
  cd "fiddles/android";
  androidCreate ${name} ${bornOnDate} ${projectName} || exit 2;
}

function testAndroidStart() {
  name="fiddle-0000-Template";
  cd "fiddles/android/${name}";
  androidStart || exit 3;
}

function testAndroidFork() {
  origFiddle="fiddle-0000-Template";
  newFiddle="fiddle-0001-Fork";
  cd scripts;
  if [[ -d "../fiddles/android/${newFiddle}" ]]; then rm -rf "../fiddles/android/${newFiddle}" || exit 4; fi
  cp -rf "../fiddles/android/${origFiddle}" "../fiddles/android/${newFiddle}" || exit 4;
  cd "../fiddles/android";
  androidFork ${origFiddle} ${newFiddle} || exit 4;
}

function tearDown() {
  if [[ -d "./fiddles/android/fiddle-0000-Template" ]]
  then
    rm -rf "./fiddles/android/fiddle-0000-Template";
  fi
  if [[ -d "./fiddles/android/fiddle-0001-Fork" ]]
  then
    rm -rf "./fiddles/android/fiddle-0001-Fork";
  fi
}

function catch() {
    case $1 in
        0)  endLog $(echo "$0" | sed 's/\.\///g');
            ;;
        1)  endLog "test 1 failed - testIsAndroidInstalled";
            ;;
        2)  endLog "test 2 failed - testAndroidCreate";
            ;;
        3)  endLog "test 3 failed - testAndroidStart";
            ;;
        4)  endLog "test 4 failed - testAndroidFork";
            ;;
        5)  endLog "test 5 failed - testUtilCapitalize";
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
    groupLog "testUtilCapitalize";
    testUtilCapitalize || exit $?;
    groupLog "testIsAndroidInstalled";
    testIsAndroidInstalled || exit $?;
    groupLog "testAndroidCreate";
    testAndroidCreate || exit $?;
    cd "${startingPoint}";
    groupLog "testAndroidStart";
    testAndroidStart || exit $?;
    cd "${startingPoint}";
    groupLog "testAndroidFork";
    testAndroidFork || exit $?;
    cd "${startingPoint}";
    groupLog "tearDown";
    #tearDown;
)
rc=$?; catch ${rc};
# finally
exit ${rc};
