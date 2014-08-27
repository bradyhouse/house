#!/bin/bash
if [ "$#" -ne 2 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the names of the \"Source\" and \"Branch\" fiddles."
      echo ""
      echo "Usage:"
      echo ""
      echo "fiddlefork.sh \"<Source fiddle Name>\" \"<Branch fiddle Name>\""
      echo ""
      exit 
fi
#try
(
     if [[ !-d "../fiddles/$1 ]]; then exit 1; fi
     if [[ -d "../fiddles/$2" ]]; then sudo rm -R "../fiddles/$2" || exit 2; fi
     cp -rf "../fiddles/$1" "../fiddles/$2" || exit 3
     $(cd bin; ./house.substr $1 $2 "../../fiddles/$2/app.js" > app.tmp; mv app.tmp "../../fiddles/$2/app.js") || exit 4
     $(cd bin; ./house.substr $1 $2 "../../fiddles/$2/index.html" > index.tmp;  mv index.tmp "../../fiddles/$2/index.html") || exit 5
     $(cd bin; ./house.substr $1 $2 "../../fiddles/$2/README.markdown" > README.tmp; mv README.tmp "../../fiddles/$2/README.markdown") || exit 6
)
#catch
case $? in
    0)  echo "Done. The \"../fiddles/$2\" directory has been initialized."
        ;;
    1)  echo "fubar! The "\source\" fiddle does not exist."
        ;;
    2)  echo "fubar! The "\branch\" fiddle cannot be overwritten."
        ;;
    3)  echo "fubar! failed to create the ../fiddles/$1 directory."
        ;;
    4)  echo "fubar! failed trying to update the ../fiddles/$2/app.js file."
	if [[ -d "../fiddles/$2" ]]; then rm -R "../fiddles/$2"; fi
	;;
    5)  echo "fubar! failed trying to update the ../fiddles/$2/index.html file."
        if [[ -d "../fiddles/$2" ]]; then rm -R "../fiddles/$2"; fi
        ;;
    6)  echo "fubar! failed trying to update the ../fiddles/$2/README.markdown file."
        if [[ -d "../fiddles/$2" ]]; then rm -R "../fiddles/$2"; fi
        ;;
    *)  echo "fubar! Something went wrong." 
        if [[ -d "../fiddles/$" ]]; then rm -R "../fiddles/$1"; fi
        ;;
esac
#finally
    exit $?




