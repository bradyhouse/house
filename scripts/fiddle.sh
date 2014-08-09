#!/bin/bash
#try
(
	if [ "$#" -ne 2 ]; then  exit 1; fi
    	case $1 in
        	'extjs') ./fiddleextjs.sh $2
           		;;
    		'py') exit 3
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
		2)  echo "foobar! extjs fiddle creation failed."
                        ;;
 		3)  echo "fimbar! python fiddle creation is not yet implemented."
                        ;; 
    		*)  echo "f??bar! Something went wrong."
        		;;
	esac
)
#finally
(
	exit $?
)
