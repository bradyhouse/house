#!/usr/bin/env bash

clear;

function fln() {
    nl $1 > "$1.~"
    mv -f "$1.~" $1
}

function fpr() {
    pr -h $2 -l 38 $1 > "$1.~"
    mv -f "$1.~" $1
}

# Create a list of all bash fiddles
ls -1 ../ | grep fiddle > _bash_fiddles_

# Add line numbers
fln _bash_fiddles_
fpr _bash_fiddles_ "__fiddles/bash/*__"

# Display the output
cat _bash_fiddles_

# remove file
rm _bash_fiddles_


