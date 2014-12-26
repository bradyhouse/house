#!/bin/bash
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
#try
(
    
    list=$1
    if [[ ! -e $list ]]; then echo "Please specify a list file"; exit 86; fi
    home=$(cd ~; pwd | sed -e 's/[]\/$*.^|[]/\\&/g')
    while read line; do
        set -- "$line" 
        IFS=";"; declare -a Array=($*)
        skipBit=$(echo ${Array[0]})
        fileA=$(echo ${Array[1]} | sed 's/~/'$home'/g';)
        if [[ $skipBit = "+" ]]
        then 
            fileB=$(echo ${Array[2]} | sed 's/~/'$home'/g';)
            ./house-jasmine-stub.sh $fileA $fileB;
        fi
    done < $list
)
#catch
case $? in
    0)  echo "42."
        ;;
    86) echo ""
        echo "Jasmine Stub Generation Tool ~ Batch Wrap"
        echo ""
        echo "Usage:"
        echo ""
        echo "       $0 \"[f]\""
        echo ""
        echo "       [f] - 3 column semicolon delimited list file."
        echo ""
        ;;
    *)  echo "An unknown error has occurred. Haaa-Ha! You win :)"
        ;;
esac
#cleanup
if [[ -e tmp.js ]]; then rm -r tmp.js; fi
#finally
exit $rc




