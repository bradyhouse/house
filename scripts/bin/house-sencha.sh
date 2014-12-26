#!/bin/bash
thisFile=$(echo "$0" | sed 's/\.\///g')
echo "${thisFile}" | awk '{print toupper($0)}'
pidUndefined=$(echo "-1")
pid=$(lsof -i:1841 -t || echo ${pidUndefined})
(
    if [[ "$#" -ne 1 ]]; then exit 86; fi
    home=$(cd ~; pwd | sed -e 's/[]\/$*.^|[]/\\&/g')
    targetDir=$(echo "$1" | sed 's/~/'${home}'/g')
    senchaCmdDir=$(echo "${SENCHA_CMD_5_0_1}")
    if [[ ! -d ${targetDir} ]]; then exit 87; fi
    if [[ ! -d ${senchaCmdDir} ]]; then exit 88; fi
    if [[ ${pid} -ne ${pidUndefined} ]]; then exit 89; fi
    cd ${targetDir}
    nohup sencha app watch &
    pid=$(lsof -i:1841 -t || echo ${pidUndefined})
    if [[ ${pid} -eq ${pidUndefined} ]]; then exit 90; fi
)
case $? in
    0)  echo "Sencha App Watch started @ ${pid}"
        ;;
    86) clear
        echo "${thisFile}" | awk '{print toupper($0)}'
        echo ""
        echo "Sencha App Watch Nohup Utility "
        echo ""
        echo "This script can be used to invoke (or \"spawn\") sencha cmd's watch feature"
        echo "from a given ExtJS 5 project using a secondary thread. "
        echo ""
        echo "USAGE:"
        echo ""
        echo "       ./${thisFile} \"[d]\""
        echo ""
        echo "       [d] - target ExtJS application (project) directory"
        echo ""
        echo ""
        echo "PRE-REQUISITES:"
        echo ""
        echo "In order to run this script (successfully), the following conditions must be met:"
        echo ""
        echo "1) Sencha command is installed.  This verification depends on the \$SENCHA_CMD_5_0_1 environment"
        echo "variable pointing to a valid directory."
        echo ""
        echo "2) The target application directory should be a valid ExtJS 5.* project directory.  That said, the script"
        echo "(in its current form) does not verify that this is actually true. In other words, you should verify"
        echo "that the \"sencha app build\" command can be run successfully from the target project directory."
        echo ""
        echo "3) Port 1841 is not in use.  The script verifies that port 1841, which is the default port used by"
        echo "sencha cmd, is not already in use by an existing Process. If it is, then the existing Process IDentification"
        echo "(PID) number is returned."
        echo ""
        ;;
    87) echo "Target Directory? Nope. The specifed \"target directory\",$1, doesn't exist.  Game Over :("
        ;;
    88) echo "Sencha Cmd 5.*? Nope. It does not appear that Sencha Cmd is installed or configured properly.  Game Over :("
        ;;
    89) echo "Port 1841 Free? Nope. It appears that \"sencha app watch\" is already running @ pid = ${pid}. Game Over :("
        ;;
    90) echo "Pid? Nope. Attempt to initiate \"sencha app watch\" did not return a valid process id. Game Over :("
        ;;
    *)  echo "An unknown error has occurred. Ha! Ha!"
        ;;
esac
exit $?




