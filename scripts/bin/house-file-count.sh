#!/bin/bash

if [ $# -ne "1" ]
then
  echo ""
  echo "recursive file count"
  echo ""
  echo "Usage:"
  echo ""
  echo "       $0 \"[d]\""
  echo ""
  echo "       [d] - directory"
  echo ""
  exit 86
fi

_s=$1
_total=0
_agg=0
 
if [ ! -d $_s ] 
then
	echo "$_s not a directory!"
	exit 1
fi
 
_dirs=$(find "$_s" -type d)
 
for _dir in $_dirs
do
   	if [ "$_dir" != "." -a "$_dir" != ".." ] 
	then
		_total=$(ls -l $_dir | wc -l)
		_agg=$(($_agg+$_total))
	fi
done

echo "$_agg"
cd $1
