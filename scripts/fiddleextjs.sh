#!/bin/bash
if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 
fi
#try
(
     if [[ -d "../fiddles/extjs/$1" ]]; then rm -R "../fiddles/extjs/$1"; fi
     cp -rf "../fiddles/extjs/template" "../fiddles/extjs/$1" || exit 1
<<<<<<< HEAD
     $(cd bin; ./house.substr '{{FiddleName}}' $1 "../../fiddles/extjs/$1/app.js";) || exit 2
     $(cd bin; ./house.substr '{{FiddleName}}' $1 "../../fiddles/extjs/$1/index.html";) || exit 3
     $(cd bin; ./house.substr '{{FiddleName}}' $1 "../../fiddles/extjs/$1/README.markdown";) || exit 4
=======
     $(cd bin; ./house.substr '{{FiddleName}}' $1 "../../fiddles/extjs/$1/app.js" > app.tmp; mv app.tmp "../../fiddles/extjs/$1/app.js") || exit 2
     $(cd bin; ./house.substr '{{FiddleName}}' $1 "../../fiddles/extjs/$1/index.html" > index.tmp;  mv index.tmp "../../fiddles/extjs/$1/index.html") || exit 3
     $(cd bin; ./house.substr '{{FiddleName}}' $1 "../../fiddles/extjs/$1/README.markdown" > README.tmp; mv README.tmp "../../fiddles/extjs/$1/README.markdown") || exit 4
>>>>>>> b4bda69ea75640ec6729ad591092444755f37038
)
#catch
case $? in
    0)  echo "Done. The \"../fiddles/extjs/$1\" directory has been initialized."
        ;;
    1)  echo "foo bar! failed to create the ../fiddles/extjs/$1 directory."
        ;;
    2)  echo "foo bar! failed trying to update the ../fiddles/extjs/$1/app.js file."
	if [[ -d "../fiddles/$" ]]; then rm -R "../fiddles/$1"; fi
	    ;;
    3)  echo "foo bar! failed trying to update the ../fiddles/extjs/$1/index.html file."
        if [[ -d "../fiddles/$" ]]; then rm -R "../fiddles/extjs/$1"; fi
        ;;
    4)  echo "foo bar! failed trying to update the ../fiddles/extjs/$1/README.markdown file."
        if [[ -d "../fiddles/$" ]]; then rm -R "../fiddles/extjs/$1"; fi
        ;;
    *)  echo "foo bar! Something went wrong."
        if [[ -d "../fiddles/$" ]]; then rm -R "../fiddles/extjs/$1"; fi
        ;;
esac
#finally
exit $?




