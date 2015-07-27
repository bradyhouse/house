#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 07/26/2015______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/COMPASS DIRECTORY____|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 07/26/2015 - Baseline Ver ~ See CHANGELOG @ 201507260420
# ---------------------------------------------------------------------------------------------------|
if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit
fi

fiddleSubDir="compass"
bornOnDate=$(date +"%m-%d-%y";)
echo ${bornOnDate}

#try
(
    if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
    $(cp -rf "../fiddles/${fiddleSubDir}/template" "../fiddles/${fiddleSubDir}/$1") || exit 1
    $(cd bin; ./house-substr.sh '{{FiddleName}}' $1 "../../fiddles/${fiddleSubDir}/$1/index.html";) || exit 2
    $(cd bin; ./house-substr.sh '{{BornOnDate}}' ${bornOnDate} "../../fiddles/${fiddleSubDir}/$1/index.html";) || exit 2
    $(cd bin; ./house-substr.sh '{{FiddleName}}' $1 "../../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 3
    $(cd bin; ./house-substr.sh '{{BornOnDate}}' ${bornOnDate} "../../fiddles/${fiddleSubDir}/$1/README.markdown";) || exit 3
    cd "../fiddles/${fiddleSubDir}/$1"
    mkdir resources
    compass create --bare --sass-dir "resources/sass" --css-dir "resources/css" --javascripts-dir "../resources/js" --images-dir "../resources/images"
)
#catch
rc=$?
case ${rc} in
    0)  echo "Done. The \"../fiddles/${fiddleSubDir}/$1\" directory has been initialized."
        ;;
    1)  echo "foo bar! failed to create the \"../fiddles/${fiddleSubDir}/$1\" directory."
        ;;
    2)  echo "foo bar! failed trying to update the \"../fiddles/${fiddleSubDir}/$1/app.js\" file."
	if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
	    ;;
    3)  echo "foo bar! failed trying to update the \"../fiddles/${fiddleSubDir}/$1/index.html\" file."
        if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
        ;;
    4)  echo "foo bar! failed trying to update the \"../fiddles/${fiddleSubDir}/$1/README.markdown\" file."
        if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
        ;;
    *)  echo "foo bar! Something went wrong."
        if [[ -d "../fiddles/${fiddleSubDir}/$1" ]]; then rm -R "../fiddles/${fiddleSubDir}/$1"; fi
        ;;
esac
#finally
exit ${rc}





