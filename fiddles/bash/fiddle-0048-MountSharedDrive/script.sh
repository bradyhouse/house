#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."


mount_smbfs "//admin@192.168.1.14/Public" ~/Desktop
