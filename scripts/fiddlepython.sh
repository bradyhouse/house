#!/bin/bash
if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 
fi
#try
(
     if [[ -d "../fiddles/python/$1" ]]; then rm -R "../fiddles/python/$1"; fi
     cp -rf "../fiddles/python/template" "../fiddles/python/$1" || exit 1
     $(cd bin; ./house.substr '{{FiddleName}}' $1 "../../fiddles/python/$1/fiddle.py" > app.tmp; mv app.tmp "../../fiddles/python/$1/fiddle.py") || exit 2
     $(cd bin; ./house.substr '{{FiddleName}}' $1 "../../fiddles/python/$1/README.markdown" > README.tmp; mv README.tmp "../../fiddles/python/$1/README.markdown") || exit 3
)
#catch
case $? in
    0)  echo "Done. The \"../fiddles/python/$1\" directory has been initialized."
        ;;
    1)  echo "fubar! failed to create the ../fiddles/python/$1 directory."
        ;;
    2)  echo "fubar! failed trying to update the ../fiddles/python/$1/fiddle.py file."
	if [[ -d "../fiddles/python/$1" ]]; then rm -R "../fiddles/python/$1"; fi
	    ;;
    3)  echo "fubar! failed trying to update the ../fiddles/python/$1/README.markdown file."
        if [[ -d "../fiddles/python/$1" ]]; then rm -R "../fiddles/python/$1"; fi
        ;;
    *)  echo "fubar! Something went wrong."
        if [[ -d "../fiddles/python/$1" ]]; then rm -R "../fiddles/python/$1"; fi
        ;;
esac
#finally
exit $?




