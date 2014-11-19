#!/bin/bash
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
if [ $# -ne "3" ]
then
  echo ""
  echo "directory recursive file type list"
  echo ""
  echo "Usage:"
  echo ""
  echo "       $0 \"[d]\" \"[e]\" \"[f]\""
  echo ""
  echo "       [d] - directory to search"
  echo "       [e] - file extension criteria"
  echo "       [f] - output file name"
  echo ""
  exit 86
fi
home=$(cd ~; pwd | sed -e 's/[]\/$*.^|[]/\\&/g')
_d=$(echo $1 | sed 's/~/'$home'/g')
_f=$(echo $3 | sed 's/~/'$home'/g')
find $_d -name ".$2" -prune -o -type f -print | grep ".$2" > $_f
