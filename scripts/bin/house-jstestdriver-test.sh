#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 6/21/2015_______________________________________________________________|
#  Description             : UTILITY USED TO START THE JSTESTDRIVER JAR______________________________|
#  Command line Arguments  : $1 = jsTestDriver.conf path directory___________________________________|
#                            $2 = jsTestDriver version (default 1.3.5)_______________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201506210420
# ---------------------------------------------------------------------------------------------------|

bin=$(pwd;)  # Capture Path
jsTestDriverJarVer="1.3.5"
jsTestDriverJar="${JSTESTDRIVER_HOME}/JsTestDriver-${jsTestDriverJarVer}.jar"
jsTestDriverConfPath="$1/jsTestDriver.conf"


if [ "$#" -gt 1 ]; then jsTestDriverJarVer=$2; fi
# try
(
    # Validate requisites
    java -version || exit 86
    if [[ ! -f "${jsTestDriverJar}" ]]; then exit 87; fi
    if [[ ! -f ${bin}/house-jstestdriver-stop.sh ]]; then exit 88; fi
    if [[ ! -f ${bin}/house-jstestdriver-start.sh ]]; then exit 88; fi
    echo ${jsTestDriverConfPath}
    if [[ ! -f "${jsTestDriverConfPath}" ]]; then exit 89; fi
    # Startup the jsTestDriver Server and capture and instance of Chrome
    ./house-jstestdriver-start.sh || exit 90

    sleep 5;

    # Change directory to server root
    cd $1

    # init jsTestDriver using conf file
    java -jar ${jsTestDriverJar} --tests all

    sleep 5;

    # Finally kill the jsTestDriver Server and the instance of Chrome
    cd ${bin}
    ./house-jstestdriver-stop.sh || exit 91
)
# catch
_rc=$?
case ${_rc} in
    0)  echo "JsTestDriver run complete."
        ;;
    86) echo "FUBAR ~ Got Java? Nope. Please install Java and try again."
        ;;
    87) echo "FUBAR ~ Got ${jsTestDriverJarPath}? Nope. Please download the JsTestDriver-${jsTestDriverJarVer}.jar file."
        echo "        Configure the \"JS_TESTDRIVER_HOME\" environment variable that points to its location."
        ;;
    88) echo "FUBAR ~ Cannot find the jstestdriver start or stop scripts."
        ;;
    89) echo "FUBAR ~ Got jsTestDriver.conf file? Nope. Please add a jsTestDriver.conf file to the \"$1\" directory."
        ;;
    90) echo "FUBAR ~ Attempt to execute ${_path}/house-jstestdriver-start.sh failed."
        ;;
    91) echo "FUBAR ~ Attempt to execute ${_path}/house-jstestdriver-stop.sh failed."
        ;;
    *)  echo "An unknown error has occurred. Haaa-Ha! You Win :)"
        ;;
esac
# finally
exit ${_rc}
