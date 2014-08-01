#!/bin/bash
if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 
fi
#try
(
     cp -rf "../fiddles/template" "../fiddles/$1/" || exit 1
     $(./substr.sh '{{FiddleName}}' $1 "../fiddles/$1/app.js" > app.tmp; mv app.tmp "../fiddles/$1/app.js") || exit 2 
     $(./substr.sh '{{FiddleName}}' $1 "../fiddles/$1/index.html" > index.tmp;  mv index.tmp "../fiddles/$1/index.html") || exit 3
     $(./substr.sh '{{FiddleName}}' $1 "../fiddles/$1/README.markdown" > README.tmp; mv README.tmp "../fiddles/$1/README.markdown") || exit 4
)
#catch
case $? in
    0)  echo "Done. The \"../fiddles/$1\" directory initialized."
        ;;
    1)  echo "foo bar! failed to create the ../fiddles/$1 directory."
        ;;
    2)  echo "foo bar! failed trying to update the ../fiddles/$1/app.js file."
	if [[ -d "../fiddles/$" ]]; then rm -R "../fiddles/$1"; fi
	;;
    3)  echo "foo bar! failed trying to update the ../fiddles/$1/index.html file."
        if [[ -d "../fiddles/$" ]]; then rm -R "../fiddles/$1"; fi
        ;;
    4)  echo "foo bar! failed trying to update the ../fiddles/$1/README.markdown file."
        if [[ -d "../fiddles/$" ]]; then rm -R "../fiddles/$1"; fi
        ;;
    *)  echo "foo bar! Something went wrong." 
        if [[ -d "../fiddles/$" ]]; then rm -R "../fiddles/$1"; fi
        ;;
esac
#finally
    exit $?




