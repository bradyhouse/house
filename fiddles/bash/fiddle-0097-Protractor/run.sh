#!/usr/bin/env bash

source ../../../scripts/bin/_utils.sh;


clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function killPort() {
  PORT_NUMBER=$1;
  lsof -i tcp:${PORT_NUMBER} | awk 'NR!=1 {print $2}' | xargs kill;
  echo "Port be dead!";
}

function catch() {
    case $1 in
        0)  endLog "protractor run succeeded";
            ;;
        1)  endLog "install process failed";
            ;;
        2)  endLog "failed while starting server";
            ;;
        3)  endLog "failed trying to run protractor";
            ;;
        *)  echo "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    killPort 4444;
    ./install.sh || exit 1;
    ./start-server.sh || exit 2;
    startLog "waiting for server ...";
    sleep 10;
    startLog "starting protractor ...";
    protractor conf.js || exit 3;
    killPort 4444;
)
catch $?;
