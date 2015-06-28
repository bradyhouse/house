#!/usr/bin/env bash

clear;

function ftr() {
    tr $2 $3 < $1 > "$1.~"
    mv -f "$1.~" $1
}

# list the contents of the bash fiddle directory
ls -1 ../ > _bash_fiddles_

# Translate all 'f' characters to 'F'
ftr _bash_fiddles_ f F

# Display the results
cat _bash_fiddles_

# remove file
rm _bash_fiddles_


