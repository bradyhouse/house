#!/usr/bin/env bash

source scripts/bin/_utils.sh;
source scripts/bin/java/.javarc;
source scripts/bin/java/_create.sh;
source scripts/bin/java/_install.sh;
source scripts/bin/java/_start.sh;
source scripts/bin/java/_fork.sh;

function testIsJavaInstalled() {
  actual=$(isJavaInstalled;);
  expected=0;
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 1;
  fi
}

function testIsBrewInstalled() {
  actual=$(isBrewInstalled;);
  expected=0;
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 4;
  fi
}

function testIsSdkInstalled() {
  actual=$(isSdkInstalled;);
  expected=0;
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 3;
  fi
}

function testIsGradleInstalled() {
  actual=$(isGradleInstalled;);
  expected=0;
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 2;
  fi
}

function testIsGitInstalled() {
  actual=$(isGitInstalled;);
  expected=0;
  if [[ ${actual} -ne ${expected} ]]
  then
    exit 5;
  fi
}

function testJavaCreate() {
  bornOnDate=$(date +"%m-%d-%y";)
  name="fiddle-0000-Template";
  suffix=$(parseName ${name};);
  projectName=$(toLowerCase ${suffix};);
  cd "fiddles/java";
  javaCreate ${name} ${bornOnDate} ${projectName} ${__SEEDER__} || exit 7;
  cd "../..";
}

function testJavaStart() {
  name="fiddle-0000-Template";
  cd "fiddles/java/${name}";
  javaStart || exit 8;
  cd "../../../..";
}

function testJavaFork() {
  origFiddle="fiddle-0000-Template";
  newFiddle="fiddle-0001-TemplateFork";
  cd scripts;
  if [[ -d "../fiddles/java/${newFiddle}" ]]; then rm -rf "../fiddles/java/${newFiddle}" || exit 9; fi
  cp -rf "../fiddles/java/${origFiddle}" "../fiddles/java/${newFiddle}" || exit 9;
  cd "../fiddles/java";
  javaFork ${origFiddle} ${newFiddle} || exit 9;
  cd "../..";
}

function tearDown() {
  if [[ -d "./fiddles/java/fiddle-0000-Template" ]]
  then
    rm -rf "./fiddles/java/fiddle-0000-Template";
  fi
  if [[ -d "./fiddles/java/fiddle-0001-TemplateFork" ]]
  then
    rm -rf "./fiddles/java/fiddle-0001-TemplateFork";
  fi
}

function catch() {
    case $1 in
        0)  endLog $(echo "$0" | sed 's/\.\///g');
            ;;
        1)  endLog "test 1 failed - testIsJavaInstalled";
            ;;
        2)  endLog "test 2 failed - testIsGradleInstalled";
            ;;
        3)  endLog "test 3 failed - testIsSdkInstalled";
            ;;
        4)  endLog "test 4 failed - testIsBrewInstalled";
            ;;
        5)  endLog "test 5 failed - testIsGitInstalled";
            ;;
        6)  endLog "test 6 failed - testGitCloneSeeder";
            ;;
        7)  endLog "test 7 failed - testJavaCreate";
            ;;
        8)  endLog "test 8 failed - testJavaStart";
            ;;
        9)  endLog "test 9 failed - testJavaFork";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    startLog $(echo "$0" | sed 's/\.\///g');
    groupLog "testIsJavaInstalled";
    testIsJavaInstalled || exit $?;
    groupLog "testIsGradleInstalled";
    testIsGradleInstalled || exit $?;
    groupLog "testIsSdkInstalled";
    testIsSdkInstalled || exit $?;
    groupLog "testIsBrewInstalled";
    testIsBrewInstalled || exit $?;
    groupLog "testIsGitInstalled";
    testIsGitInstalled || exit $?;
    groupLog "testJavaCreate";
    testJavaCreate || exit $?;
    groupLog "testJavaStart";
    testJavaStart || exit $?;
    groupLog "testJavaFork";
    testJavaFork || exit $?;
    groupLog "tearDown";
    tearDown;
)
rc=$?; catch ${rc};
# finally
exit ${rc};
