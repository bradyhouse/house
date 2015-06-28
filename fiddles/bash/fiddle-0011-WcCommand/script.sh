#!/usr/bin/env bash
clear;

function fsort() {
    sort -f -r <$1 > "$1.~"
    mv -f "$1.~" $1
}

function fwc() {
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
ls -1 ../ | grep fiddle > _bash_fiddles_

echo "bash fiddle list:"
echo ""

fsort _bash_fiddles_

cat _bash_fiddles_

# Count the file
fwc _bash_fiddles_

# remove file
rm _bash_fiddles_


