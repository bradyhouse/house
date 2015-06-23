#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 6/21/2015_______________________________________________________________|
#  Description             : UTILITY USED TO START THE JSTESTDRIVER JAR AND CAPTURE CHROME___________|
#  Command line Arguments  : $1 = port (default 4224)________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201506210420
# ---------------------------------------------------------------------------------------------------|

_path=$(pwd;)  # Capture Path
_port=4224
jsTestDriverJarVer="1.3.5"
jsTestDriverJarPath="${JSTESTDRIVER_HOME}/JsTestDriver-${jsTestDriverJarVer}.jar"

if [ "$#" -gt 1 ]; then _port=$1; fi
# try
(
  # Validate requisites
  java -version || exit 86
  if [[ ! -f "${jsTestDriverJarPath}" ]]; then exit 87; fi
  if [[ ! -f ${_path}/house-jstestdriver-stop.sh ]]; then exit 88; fi

  # Kill the existing process
  ./house-jstestdriver-stop.sh "${_port}" || exit 90

  # Startup the server and capture and instance of chrome
  nohup java -jar "$JSTESTDRIVER_HOME/JsTestDriver-1.3.5.jar" --port ${_port} --browser "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" &

)
# catch
_rc=$?
case ${_rc} in
    0)  echo "jsTestDriver server started @ http://localhost:${_port}"
        ;;
    86) echo "FUBAR ~ Got Java? Nope. Please install Java and try again."
        ;;
    87) echo "FUBAR ~ Got ${jsTestDriverJarPath}? Nope. Please download the JsTestDriver-${jsTestDriverJarVer}.jar file."
        echo "        Configure the \"JSTESTDRIVER_HOME\" environment variable that points to its location."
        ;;
    89) echo "FUBAR ~ Got jsTestDriver.conf file? Nope. Please add a jsTestDriver.conf file to the \"$1\" directory."
        ;;
    90) echo "FUBAR ~ Attempt to execute ${_path}/house-jstestdriver-stop.sh failed."
        ;;
    *)  echo "An unknown error has occurred. Haaa-Ha! You Win :)"
        ;;
esac
# finally
exit ${_rc}
