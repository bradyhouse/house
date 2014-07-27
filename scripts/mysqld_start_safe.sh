#!/bin/bash

echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
(
    set -e
    if [[ ! -d /usr/local/mysql ]]; then exit 1001; fi
    cd /usr/local/mysql/bin
    sudo ./mysqld_safe --skip-grant-table
)

case $? in
    1001)  echo "Yo! MySql must installed to use this script. Game Over."
        ;;
esac