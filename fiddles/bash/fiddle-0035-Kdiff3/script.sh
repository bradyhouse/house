#!/bin/bash
#####################################################
# cmpk3.sh:  a simple script that combines cmp with
# kdiff3.  Given two files, run cmp.
# If the files match-up, do nothing.
# Otherwise, invoke kdiff3.
#####################################################

ARGS=2            # Script requires 2 arguments.
E_BADARGS=85      # Wrong number of arguments.
E_KDIFF3EXIST=86  # KDIFF3 not installed.
E_FILEAEXIST=87   # File A does not exist.
E_FILEBEXIST=88   # File B does not exist.
E_RMORIGFILE=89	  # Orig File could not be deleted.

KDIFF3_HOME=/Applications/kdiff3.app/Contents/MacOS

# try
(
	set -e
	if [[ $# -ne "$ARGS" ]];  then exit $E_BADARGS; fi
	if [[ ! -d $KDIFF3_HOME ]]; then exit $E_KDIFF3EXIST; fi
	fileA=$1; # Kdiff3 file A
	fileB=$2; # Kdiff3 file B
	fileO=$(echo "$fileA.orig") # Kdiff3 *.orig file
 	if [[ ! -e "$fileA"  ]]; then exit $E_FILEAEXIST; fi
	if [[ ! -e "$fileB"  ]]; then exit $E_FILEBEXIST; fi
	cmp -s $fileA $fileB || kdiff3 $fileA $fileB -o $fileA
	if [[ -e "$fileO" ]]
	then
		rm "$fileO" || exit $E_RMORIGFILE
 	fi
)
# catch
case $? in
    0)  echo "$1=$2"
        ;;
    85)  echo "Usage Error:  Try something like--"; echo ""; echo "  `basename $0` first-file second-file"; echo ""
	;;
    86) echo "Dependency Error:  Is kdiff3 installed?  Can't find `$KDIFF3_HOME`."
	;;
    87) echo "Input Error:  $1 does not exist."
	;;
    88) echo "Input Error:  $2  does not exist."
        ;;
    89) echo "Cleanup Error: $1.orig could not be deleted."
        ;;
    *)  echo "Unknown Error:  HOUSTON--What the frack!"
	;;
esac
# finally
exit $?
