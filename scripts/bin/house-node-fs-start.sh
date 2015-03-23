#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bedlington.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO START A NODE.JS FILE SERVER ON PORT 8889________________|
#  Command line Arguments  : $1 = root directory_____________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# ---------------------------------------------------------------------------------------------------|

_path=$(pwd;)  # Capture Path

#try
(
  # Validate requisites
  node --version || exit 86
  if [[ ! -f ${_path}/house-node-fs-stop.sh ]]; then exit 87; fi
  if [[ ! -f ${_path}/house-node-fs.js ]]; then exit 88; fi
  if [[ ! -d $1 ]]; then exit 89; fi

  # Kill existing process
  ./house-node-fs-stop.sh || exit 90

  # Change directory to server root
  cd $1

  # Startup on a secondary thread
  nohup node ${_path}/house-node-fs.js &

)
#catch
_rc=$?
case ${_rc} in
    0)  echo "node file server started @ http://localhost:8889"
        ;;
    86) echo "Please install node.js"
        ;;
    87) echo "FUBAR ~ ${_path}/stop-node-fs.sh could not be found."
        ;;
    88) echo "FUBAR ~ ${_path}/bin/house-node-fs.js script could not be found."
        ;;
    89) echo "FUBAR ~ $1 directory does not exist."
        ;;
    90) echo "FUBAR ~ Attempt to execute ${_path}/stop-node-fs.sh failed."
        ;;
    *)  echo "An unknown error has occurred. Haaa-Ha! You Win :)"
        ;;
esac
#bubble up (re-throw)
exit ${_rc}