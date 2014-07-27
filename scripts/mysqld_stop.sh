#!/bin/bash
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
(
    set -e
    if [[ ! -d /usr/local/mysql/support-files ]]; then exit 1001; fi
    cd /usr/local/mysql/support-files
    sudo ./mysql.server stop
)

case $? in
    1001)  echo "Yo! MySql must installed to use this script. Game Over."
        ;;
esac