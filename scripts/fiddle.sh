#!/bin/bash
#try
(
	if [ "$#" -ne 2 ]; then  exit 1; fi
    	case $1 in
        	'extjs') ./fiddleextjs.sh $2
           		;;
            'php') ./fiddlephp.sh $2
                ;;
    		'python') exit 83
        		;;
    		*)  exit 86
        		;;
    	esac
)
#catch
(
	case $? in
		0)  exit $?
        		;;
    	1)  printf "\n"; echo "Usage:"; echo "./fiddle.sh \"<type>\" \"<name>\""; echo "Types:"; echo "\"extjs\" - ExtJS Fiddle"; echo "\"py\" - Python Fiddle"; printf "\n"
        		;;
		2)  echo "fubar! extjs fiddle creation failed."
                ;;
        83) echo "fubar! python support not implemented."
                ;;
    	*)  echo "fubar! Something went wrong."
        		;;
	esac
)
#finally
(
	exit $?
)
