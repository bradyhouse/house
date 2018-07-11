#!/usr/bin/env bash

source scripts/bin/_utils.sh;
source scripts/bin/setup/mac/_bash.sh;


function tearDown() {
  if [[ -d "../home" ]]
  then
    rm -rf "../home";
    mkdir "../home";
    touch "../home/.zshrc";
    touch "../home/.bash_profile";
  fi


}

function testUtilFileContains() {
  homeDir=$(cd ../home;  pwd;);
  actual=$(fileContains "${homeDir}/.zshrc" "FIDDLE.SH";);
  expected="1";
  groupLog "testUtilFileContains | Actual: ${actual} | Expected: ${expected}";
  if [[ "${actual}" != "${expected}" ]]
  then
    exit 1;
  fi
}

function testIsZshrc() {
  _actual=$(isZshrc;);
  _expected="1";
  groupLog "testIsZshrc | Actual: ${_actual} | Expected: ${_expected}";
  if [[ "${_actual}" != "${_expected}" ]]
  then
    exit 2;
  fi
}

function testUpdateZshrc() {
  _actual=$(updateZshrc);
  _expected="";
  groupLog "testUpdateZshrc | Actual: ${_actual} | Expected: ${_expected}";
  if [[ "${_actual}" != "${_expected}" ]]
  then
    exit 3;
  fi
}

function testIsBashProfile() {
  _actual=$(isBashProfile;);
  _expected="1";
  groupLog "testIsBashProfile | Actual: ${_actual} | Expected: ${_expected}";
  if [[ "${_actual}" != "${_expected}" ]]
  then
    exit 4;
  fi
}

function testUpdateBashProfile() {
  _actual=$(updateBashProfile);
  _expected="";
  groupLog "testUpdateBashProfile | Actual: ${_actual} | Expected: ${_expected}";
  if [[ "${_actual}" != "${_expected}" ]]
  then
    exit 5;
  fi
}

function catch() {
    case $1 in
        0)  endLog $(echo "$0" | sed 's/\.\///g');
            ;;
        1)  endLog "test 1 failed - testUtilFileContains";
            ;;
        2)  endLog "test 2 failed - testIsZshrc";
            ;;
        3)  endLog "test 3 failed - testUpdateZshrc";
            ;;
        4)  endLog "test 4 failed - testIsBashProfile";
            ;;
        5)  endLog "test 5 failed - testUpdateBashProfile";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
  startLog $(echo "$0" | sed 's/\.\///g');
  cd scripts;
  tearDown || exit $?:
  testUtilFileContains || exit $?:
  testIsZshrc || exit $?:
  testUpdateZshrc || exit $?:
  testIsBashProfile || exit $?;
  testUpdateBashProfile || exit $?;
  tearDown || exit $?:
)
rc=$?; catch ${rc};
# finally
exit ${rc};
