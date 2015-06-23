#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'


function year() {
    date +"%y"
}
function month() {
    date +"%m"
}

function day() {
   date +"%d"
}

function datef() {
   date +"$1"
}

echo -e "%y\t\t"$(year;);
echo -e "%m\t\t"$(month;);
echo -e "%d\t\t"$(day;);
echo -e "%m-%d-%y\t"$(datef "%m-%d-%y";);
echo -e "%D\t\t"$(datef "%D";);
echo -e "%T\t\t"$(datef "%T";);
echo -e "%r\t\t"$(datef "%r";);
echo -e "%H:%M\t\t"$(datef "%H:%M";);

