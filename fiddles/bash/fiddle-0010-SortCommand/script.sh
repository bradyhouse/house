#!/usr/bin/env bash

clear;

function ftr() {
    tr $2 $3 < $1 > "$1.~"
    mv -f "$1.~" $1
}

function fsort() {
    sort -f -r <$1 > "$1.~"
    mv -f "$1.~" $1
}

# list all bash fiddles directories
ls -1 ../ | grep fiddle > _bash_fiddles_

# Translate all 'f' characters to 'F'
ftr _bash_fiddles_ f F

# sort the file
fsort _bash_fiddles_

# Display the results
echo ""
cat _bash_fiddles_
echo ""

# remove file
rm _bash_fiddles_


