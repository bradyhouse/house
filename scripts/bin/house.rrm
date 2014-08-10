#!/bin/bash

if [ $# -ne "2" ]
then
  echo ""
  echo "recursive remove"
  echo ""
  echo "Usage:"
  echo ""
  echo "       $0 \"[d]\" \"[c]\""
  echo ""
  echo "       [d] - directory"
  echo "       [c] - filename delete criteria"
  echo ""
  exit 86
fi

cd $1
find . -name $2 -print0 | xargs -0 rm -rf
