#!/bin/bash
if [ $# -ne "3" ]
then
  echo "Usage: `basename $0` old-pattern new-pattern filename"
  exit $E_BADARGS
fi
_s=$(echo $1 | sed -e 's/[]\/$*.^|[]/\\&/g')
_g=$(echo $2 | sed -e 's/[]\/$*.^|[]/\\&/g')
if [ -f "$3" ]
then
    _f=$3
else
    echo "File \"$3\" does not exist."
    exit 86
fi
sed -e "s/$_s/$_g/g" $_f
exit $?  
