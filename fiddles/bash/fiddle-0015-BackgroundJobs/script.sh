#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

function prompt() {
    echo ""
    read -p "Press any key to continue ..." EMPTY
}
sleep 6000 &
sleep 6000 &
sleep 6000 &
sleep 6000 &
jobs;
prompt;
kill %;
prompt;
kill %;
prompt;
kill %;
prompt;
kill %;
prompt;
sleep 6000 &
sleep 6000 &
sleep 6000 &
sleep 6000 &
jobs;
prompt;
killall sleep;
jobs;
prompt;




