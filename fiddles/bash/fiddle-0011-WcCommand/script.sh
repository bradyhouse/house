#!/usr/bin/env bash
clear;

function voidSort() {
    sort -f <$1 > "$1.~"
    mv -f "$1.~" $1
}

function voidFormat() {
     touch "$1.~";
     while read line; do
          echo -e "*\t[${line}](fiddles/${line})" >> "$1.~";
     done < $1
     mv -f "$1.~" $1
}

function voidWc() {
    lines=$(cat $1 | wc -l;)
    words=$(cat $1 | wc -w;)
    chars=$(cat $1 | wc -c;)
    echo ""
    echo -e "lines:\t${lines}"
    echo -e "words:\t${words}"
    echo -e "chars:\t${chars}"
    echo ""
}

# Initialize the stdout.txt with contents of root
ls -1 ../.. | grep -v "index.html" | grep -v "screenshot.png" | grep -v "resources" | grep -v "README.markdown" > _bash_fiddles_

echo "fiddle types:"
echo ""

voidSort _bash_fiddles_;
voidFormat _bash_fiddles_;
cat _bash_fiddles_

# Count the file
voidWc _bash_fiddles_;

# remove file
rm _bash_fiddles_


