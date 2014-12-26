#!/bin/bash
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
#try
(
    if [ "$#" -ne 1 ]; then exit 86; fi
    if [[ ! -d $1 ]]; then exit 87; fi
    cd $1
    git reset --soft HEAD~1 
)
#catch
rc=$?
case $rc in
    86) echo ""
        echo "git undo commit"
        echo ""
        echo "Usage:"
        echo ""
        echo "       $0 \"[r]\""
        echo ""
        echo "       [r] - repository root path."
        echo ""
        ;;
    87) echo "Specified repository, \"$1\", not so much.  It doesn't seem exist."
        ;;
    90) echo "<Error Message 3>"
        ;;
    *)  echo "An unknown error has occurred. Ha! Ha!"
        ;;
esac
#finally
exit 0