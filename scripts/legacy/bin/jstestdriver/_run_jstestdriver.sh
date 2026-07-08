#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : FUNCTION SET FOR INTERACTING WITH JSTESTDRIVER__________________________|
#  Entry Point             : runJsTestDriver_________________________________________________________|
#  Input Parameters        : $1 = jsTestDriver.conf path directory___________________________________|
#  Initial Consumer        : ../fiddle-test.sh_______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605020420
# ---------------------------------------------------------------------------------------------------|

stopJsTestDriver() {
    _port=4224
    if [ "$#" -eq 1 ]; then _port=$1; fi
    _pid=$(lsof -i:${_port} -t || echo '-1')  # Capture Process Id

    #try
    (
      # Verify pid found
      if [[ ${_pid} -eq "-1" ]]; then exit 0; fi

      # Kill the process
      $(lsof -i:${_port} -t | xargs kill;) || exit 86

    )
    #catch
    _rc=$?
    case ${_rc} in
        0)  echo "jsTestDriver on port ${_port} ~ is dead."
            ;;
        86) echo "FUBAR ~ Attempt to kill Pid = ${_pid} failed."
            ;;
        *)  echo "An unknown error has occurred. Haaa-Ha! You Win :)"
            ;;
    esac
    #bubble up (re-throw)
    exit ${_rc}
}

startJsTestDriver() {
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

      # Kill the existing process
      stopJsTestDriver "${_port}" || exit 90

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
}

runJsTestDriver() {

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
        echo ${jsTestDriverConfPath}
        if [[ ! -f "${jsTestDriverConfPath}" ]]; then exit 89; fi
        # Startup the jsTestDriver Server and capture and instance of Chrome
        startJsTestDriver || exit 90

        sleep 5;

        # Change directory to server root
        cd $1

        # init jsTestDriver using conf file
        java -jar ${jsTestDriverJar} --tests all

        sleep 5;

        # Finally kill the jsTestDriver Server and the instance of Chrome
        cd ${bin}
        stopJsTestDriver || exit 91
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
}