#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

curl http://apache.claz.org/logging/log4j/1.2.17/log4j-1.2.17.zip -o log4j-1.2.17.zip
