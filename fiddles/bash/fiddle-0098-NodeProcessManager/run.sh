#!/usr/bin/env bash
clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function isInstalled() {
    if [[ ! $(which $1;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function sleepFor() {
  LBAR="  [";
  RBAR="]";
  BAR="#";
  for (( c=1; c<=$1; c++ ))
  do
    BAR="${BAR}#";
    echo -ne "${LBAR}${BAR}${RBAR}\r";
    sleep 1;
  done
  echo "\n";
}

function startLog() {
    message=$(echo $1 | sed 's/\.\///g' | awk '{print toupper($0)}');
    tput bold; tput rev;
    echo -e "┌──${message}";
    tput sgr0;
}

function endLog() {
    message=$(echo $1 | sed 's/\.\///g' | awk '{print toupper($0)}');
    tput bold; tput rev;
    echo -e "└──${message}";
    echo -e "";
    tput sgr0;
}

function cleanUp() {
  startLog "cleanup ...";
  pm2 stop all;
  cd ..;
  if [[ -d "angular-seed" ]]
  then
    rm -rf angular-seed;
  fi
}

function catch() {
  case $1 in
    0)  endLog "e2e complete";
        ;;
    1)  endLog "could not find java";
        ;;
    2)  endLog "could not find npm";
        ;;
    3)  endLog "could not find git";
        ;;
    4)  endLog "failed attempting to clone https://github.com/mgechev/angular-seed";
        ;;
    5)  endLog "failed installing angular-seed dependencies";
        ;;
    6)  endLog "failed rebuilding sass pieces";
        ;;
    7)  endLog "failed installing pm2";
        ;;
    8)  endLog "failed starting webdriver-start";
        ;;
    9)  endLog "failed starting e2e server";
        ;;
    10) endLog "failed while attempting to sleep for 60 seconds";
        ;;
    11) endLog "failed while running e2e";
        cleanUp;
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
  esac
  exit $1
}


# try
(
  startLog "Is Java Installed...";
  isInstalled java || exit 1;
  startLog "Is Npm installed...";
  isInstalled npm || exit 2;
  startLog "Is git installed...";
  isInstalled git || exit 3;
  startLog "cloning angular-seeder repo...";
  if [[ -d "angular-seed" ]]
  then
    rm -rf angular-seed;
  fi
  $(git clone --depth 1 "https://github.com/mgechev/angular-seed") || exit 4;
  startLog "installing dependencies...";
  cd angular-seed;
  npm install || exit 5;
  startLog "rebuilding sass pieces...";
  npm rebuild node-sass || exit 6;
  startLog "installing pm2...";
  npm install -g pm2 || exit 7;
  startLog "starting webdriver...";
  pm2 start npm -- run webdriver-start || exit 8;
  startLog "starting e2e server...";
  pm2 start npm -- run serve.e2e || exit 9;
  startLog "sleeping for 60 seconds...";
  sleepFor 60 || exit 10;
  startLog "starting e2e ...";
  npm run e2e || exit 11;
  cleanUp;
)
catch $?;

