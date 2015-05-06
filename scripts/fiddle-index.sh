#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO REGENERATE A SPECIFIED FIDDLE INDEX PAGE________________|
#  Command line Arguments  : $1 = FIDDLE TYPE (AKA ../FIDDLE/* SUBDIRECTORY)_________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# 05/01/2015 - See CHANGELOG @ 201505011810
# ---------------------------------------------------------------------------------------------------|
thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'

if [ "$#" -ne 1 ]
then
      echo ""
      echo "Nope ~ Incorrect number of arguments"
      echo ""
      echo "Usage:"
      echo ""
      echo "$0 \"[t]\""
      echo ""
      echo "[t] - type. Valid types include: "
      echo ""
      echo "   \"dojo\"    - Dojo Fiddle"
      echo "    \"extjs\"  - Ext JS Fiddle"
      echo "    \"php\"    - PHP Fiddle"
      echo "    \"jquery\" - jQuery / Bootstrap Fiddle"
      echo "    \"three\"  - three.js Fiddle"
      echo "    \"node\"   - node.js Fiddle"
      echo ""
      exit
fi

location=$(pwd;)
home=$(cd ~; pwd)
type=$1

fiddleDir=$(cd ..; cd "fiddles/${type}"; pwd;)
fiddleNameStub=$(echo "index";)
indexFile=$(echo "$fiddleDir/index.html";)
binDir=$(echo "$location/bin";)
bornOnDate=$(date +"%m-%d-%y";)
echo ${bornOnDate}

#try
(
    case ${type} in
        'extjs'|'php'|'jquery'|'three'|'dojo'|'node')
            case ${type} in
                'php') fiddleName=$(echo "$fiddleNameStub.php";)
                    ;;
                'python') fiddleName=$(echo "fiddle.py";)
                    ;;
                *) fiddleName=$(echo "$fiddleNameStub.html";)
                    ;;
            esac
            cd $binDir
            cat tpl/indexheader > $indexFile
            cd $fiddleDir
            ls -1 | grep 'fiddle' > index.tmp
            mv index.tmp $binDir
            cd $binDir
            while read line; do
               echo "<a href=\"$line/$fiddleName\" target=\"_self\">$line</a></br>" >> $indexFile
            done < index.tmp
            rm -r index.tmp
            cat tpl/indexfooter >> $indexFile
            ./house-substr.sh '{{FiddleType}}' ${type} $indexFile || exit 86
            ./house-substr.sh '{{BornOnDate}}' ${bornOnDate} $indexFile || exit 86
            ;;
        *)  exit 5000
            ;;
    esac
)
#catch
rc=$?
case ${rc} in
    0)  echo "Done. All \"$1\" fiddles have been re-indexed."
        ;;
    86) echo "Error:  Call to the \"bin/house-substr.sh\" script failed."
        ;;
    *)  echo "Error: Something went wrong."
        ;;
esac
#finally
exit ${rc}










