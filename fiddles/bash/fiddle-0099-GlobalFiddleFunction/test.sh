#!/usr/bin/env bash

source scripts/bin/_utils.sh;
source scripts/bin/setup/mac/_bash.sh;


function tearDown() {
  if [[ -e "home/.zshrc" ]]
  then
    rm -rf "home";
    mkdir "home";
    touch "home/.zshrc";
  fi
}

function testUtilFileContains() {
  homeDir=$(cd home;  pwd;);
  actual=$(fileContains "${homeDir}/.zshrc" "FIDDLE.SH";);
  expected=1;
  if [[ "${actual}" != "${expected}" ]]
  then
    exit 1;
  fi
}

function testIsZshrc() {
  actual=$(isZshrc;);
  expected=1;
  if [[ "${actual}" != "${expected}" ]]
  then
    groupLog "testIsZshrc | Actual: ${actual} | Expected: ${expected}";
    exit 2;
  fi
}

function testUpdateZshrc() {
  actual=$(updateZshrc);
  expected="";
  if [[ "${actual}" != "${expected}" ]]
  then
    groupLog "testUpdateZshrc | Actual: ${actual} | Expected: ${expected}";
    exit 3;
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
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
  tearDown || exit $?:
  testUtilFileContains || exit $?:
  testIsZshrc || exit $?:
  testUpdateZshrc || exit $?:
  # tearDown || exit $?:
)
rc=$?; catch ${rc};
# finally
exit ${rc};
