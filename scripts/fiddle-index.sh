#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bedlington.io___________________________________________________________|
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
      echo ""
      exit
fi

location=$(pwd;)
home=$(cd ~; pwd)
fiddleDir=$(cd ..; cd "fiddles/$1"; pwd;)
fiddleNameStub=$(echo "index";)
indexFile=$(echo "$fiddleDir/index.html";)
binDir=$(echo "$location/bin";)

#try
(
    #ToDo Refactor
    case $1 in
        'extjs'|'php'|'jquery'|'three'|'dojo')
            case $1 in
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
            cat tpl/indexfooter >> $indexFile
            exit 0
            ;;
        *)  exit 86
            ;;
    esac
)
#catch
case $? in
    0)  echo "Done. All \"$1\" fiddles have been re-indexed."
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
    exit $?










