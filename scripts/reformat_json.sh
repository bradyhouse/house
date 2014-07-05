#!/bin/bash
cd ~/github/house/web/house
file=$1
file_tmp=tmp.json
cat $file | sed -e $'s/,/,\\\n/g' > $file_tmp
rm $file_tmp
mv $file_tmp $file


