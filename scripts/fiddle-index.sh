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
# 05/08/2015 - See CHANGELOG @ 201505061810
# 06/20/2015 - See CHANGELOG @ 201506200420
# 07/05/2015 - See CHANGELOG @ 201506290420
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
    echo -e "\t\"dojo\"\t\tDojo Fiddle"
    echo -e "\t\"extjs\"\t\tExt JS Fiddle"
    echo -e "\t\"php\"\t\tPHP Fiddle"
    echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
    echo -e "\t\"three\"\t\tthree.js / WebGl Fiddle"
    echo -e "\t\"chrome\"\tChrome Extension Fiddle"
    echo -e "\t\"node\"\t\tnode.js Fiddle"
    echo -e "\t\"tween\"\t\ttween.js Fiddle"
    echo -e "\t\"svg\"\t\tScalar Graphic Vector Fiddle"
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
        'extjs'|'php'|'jquery'|'three'|'dojo'|'node'|'tween'|'svg')
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
               ignore=$(echo $(cat "../../.gitignore" | grep "${line}" | wc -l;))
               if [[ "${ignore}" -eq "0" ]]
               then
                  echo "<a href=\"$line/$fiddleName\" target=\"_self\">$line</a></br>" >> $indexFile;
               fi
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










