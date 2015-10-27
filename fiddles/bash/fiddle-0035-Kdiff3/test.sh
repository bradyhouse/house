#!/usr/bin/env bash
clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."



./script.sh "../fiddle-0035-Kdiff3/sencha_ver5.sh" "../fiddle-0035-Kdiff3/sencha_ver6.sh"




