#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO STOP THE NODE FILE SERVER_______________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# 04/09/2015 - CHANGELOG.MARKDOWN ~ 201504091810
# 03/12/2016 - CHANGELOG.MARKDOWN ~ 201603050420
# 04/16/2016 - CHANGELOG.MARKDOWN ~ 201604160420
# ---------------------------------------------------------------------------------------------------|
clear
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
source bin/_utils.sh
source bin/_types.sh

_path=$(pwd;)  # Capture Path
_bin="${_path}/bin"
_type=$(echo $1)
_port=8889
#try
(
    # Validate requisites
    if [[ ! -d bin ]]; then exit 87; fi
     if [ "$#" -eq 1 ]; then _port=$1; fi
    cd bin
    ./house-node-fs-stop.sh ${_port}
)
#catch
rc=$?
case ${rc} in
    0)  echo ""
        ;;
    87) echo -e "Fubar\tCannot find the \"${_path}/bin\" directory."
        ;;
    *)  echo -e "Fubar\tAn unknown error has occurred. You win -- Ha! Ha!"
        ;;
esac
#finally
exit ${rc}
