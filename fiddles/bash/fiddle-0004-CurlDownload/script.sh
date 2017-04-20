#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

curl https://software.intel.com/sites/default/files/managed/19/94/haxm-macosx_v6_1_1.zip -o haxm-macosx_v6_1_1.zip
