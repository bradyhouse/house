#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

# mount //192.168.1.14/Public -t smbfs /tmp/bdrive -o "username=admin,password=4414!aJS$"

mount_smbfs "//admin@192.168.1.14/Public" ~/Desktop
