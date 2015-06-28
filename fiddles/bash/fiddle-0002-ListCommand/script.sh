#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'


#try
(
	if [ "$#" -lt 1 ]; then  exit 86; fi

    echo "ls -a ... # List All files" > script.log
    echo "" >> script.log
    ls -a "$1" >> script.log
    echo "" >> script.log
    echo "ls -A ... # List Almost all files everything but ('.' or '..')" >> script.log
    echo "" >> script.log
    ls -A "${1}" >> script.log
    echo "" >> script.log
    echo "ls -C ... # list in column format" >> script.log
    echo "" >> script.log
    ls -C "${1}" >> script.log
    echo "" >> script.log
    echo "ls -d ... # list directories" >> script.log
    echo "" >> script.log
    ls -d ${1} >> script.log
    echo "" >> script.log
    echo "ls -f ... # list file names" >> script.log
    echo "" >> script.log
    ls -f ${1} >> script.log
    echo "" >> script.log
    echo "ls -F ... # list file names classified by file type" >> script.log
    echo "" >> script.log
    ls -F ${1} >> script.log
    echo "" >> script.log
    echo "ls -l ... # list filenames in long format" >> script.log
    ls -l ${1} >> script.log
    echo "" >> script.log
    echo "ls -lh ... # list filenames with human readable file sizes" >> script.log
    echo "" >> script.log
    ls -lh ${1} >> script.log
    echo "" >> script.log
    echo "ls -lG ... # long format without group information" >> script.log
    echo "" >> script.log
    ls -lG ${1} >> script.log
    echo "" >> script.log
    echo "ls -r ... # list reverse sorted" >> script.log
    echo "" >> script.log
    ls -r ${1} >> script.log
    echo "" >> script.log
    echo "ls -R ... # list recursively" >> script.log
    echo "" >> script.log
    ls -R ${1} >> script.log
    echo "" >> script.log
    echo "ls -s ... # list file size in kilobytes" >> script.log
    echo "" >> script.log
    ls -s ${1} >> script.log
    echo "" >> script.log
    echo "ls -S ... # list files sorted by size" >> script.log
    echo "" >> script.log
    ls -S ${1} >> script.log
    echo "" >> script.log
    echo "ls -t ... # list files sorted by modification time " >> script.log
    echo "" >> script.log
    ls -t ${1} >> script.log
    echo "" >> script.log
    echo "ls -U ... # list file names without sorting " >> script.log
    echo "" >> script.log
    ls -U ${1} >> script.log
    echo "" >> script.log
    echo "ls -x ... # list filenames in rows rather than in columns" >> script.log
    echo "" >> script.log
    ls -x ${1} >> script.log
    echo ""
    cat script.log | less
)
#catch
_rc=$?
case ${_rc} in
    0)  echo ""
        ;;
    86) echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}

cd $1




