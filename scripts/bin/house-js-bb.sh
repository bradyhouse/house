#!/bin/bash
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
#try
(
    if [ "$#" -ne 1 ]; then exit 86; fi
    js-beautify -v || exit 88
    python --version || exit 90
    list=$1
    if [[ ! -e $list ]]; then exit 92; fi
    home=$(cd ~; pwd | sed -e 's/[]\/$*.^|[]/\\&/g')
    while read line; do
        set -- "$line"
        IFS=";"; declare -a Array=($*)
        skipBit=$(echo ${Array[0]})
        file=$(echo ${Array[1]} | sed 's/~/'$home'/g')
        if [[ $skipBit = "+" ]]
        then
            js-beautify $file > tmp.js
            sudo mv -f tmp.js $file || exit 94
            rm -r tmp.js
            echo "$file;beautified"
        else
            echo "$file;skipped"
        fi
    done < $list
)
#catch
rc=$?
case $rc in
    86) echo ""
        echo "js-beautify batch"
        echo ""
        echo "Usage:"
        echo ""
        echo "       $0 \"[f]\""
        echo ""
        echo "       [f] - semicolon delimited list."
        echo ""
        ;;
    88) echo "Python? Nope. I need it. You gotta have it. Just install it."
        ;;
    90) echo "js-beautify? Nope. I need it. You gotta have it. Just install it.."
        ;;
    92) echo "Input File List? Not so much-- \"$1\" doesn't exist. Let's keep it real next time."
        ;;
    94) echo "Write priveleges? Not so much-- I can't overwrite \"$file\". Be kind, sudo v."
        ;;
    *)  echo "An unknown error has occurred. Ha! Ha!"
        ;;
esac
#cleanup
if [[ -e tmp.js ]]; then rm -r tmp.js; fi
#finally
exit $rc




