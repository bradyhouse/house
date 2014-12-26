#!/bin/bash

if [ $# -ne "1" ]
then
  echo ""
  echo "node directory file server"
  echo ""
  echo "Usage:"
  echo ""
  echo "       $0 \"[d]\""
  echo ""
  echo "       [d] - startup root directory"
  echo ""
  exit 86
fi

_bin=$(pwd)

cd $1
node $_bin/server.js
