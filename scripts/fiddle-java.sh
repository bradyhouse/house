#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/22/2016______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES/JAVA DIR_____________|
#  Command line Arguments  : $1 = FIDDLE NAME________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG.MARKDOWN @ 201609160420
# ---------------------------------------------------------------------------------------------------|

this=$0;

source bin/_utils.sh;
source bin/java/.javarc;
source bin/java/_install.sh;
source bin/java/_create.sh;


if [ "$#" -ne 1 ]
then
      echo "Incorrect number of arguments"
      echo "Please specify the name of the new fiddle"
      exit 59
fi
fiddleSubDir="../fiddles/java";
bornOnDate=$(date +"%m-%d-%y";)

function catch() {
    case $1 in
        0)  endLog "${this}";
            ;;
        1)  endLog "java is not installed or configured properly.";
            ;;
        2)  endLog "gradle is not installed or configured properly";
            ;;
        3)  endLog "git is not installed or configured properly";
            ;;
        4)  endLog "call to javaCreate function failed";
            ;;
        5)  endLog "cannot access root java fiddle directory.";
            ;;
        6)  endLog "cannot not parse project name";
            ;;
        7)  endLog "maven is not installed or configured properly";
            ;;
        *)  endLog "fubar! Something went wrong."
            ;;
    esac
    exit $1
}
# try
(
    startLog $(echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}');
    name=$1;
    suffix=$(parseName ${name};);
    projectName=$(toLowerCase ${suffix};);
    groupLog "App Name: \"${projectName}\"";
    cd "${fiddleSubDir}" || exit 5;
    isJavaInstalled || exit 1;
    isGradleInstalled || exit 2;
    isGitInstalled || exit 3;
    isMvnInstalled || exit 7;
    javaCreate $1 ${bornOnDate} ${projectName} ${__SEEDER__} || exit 4;
)
rc=$?; catch ${rc};
# finally
exit ${rc};


