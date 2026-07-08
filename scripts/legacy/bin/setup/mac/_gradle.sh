             #!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 04/08/2018______________________________________________________________|
#  Description             : MASTER GRADLE INSTALL SCRIPT FOR MAC OS_________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 04/08/2018 - See CHANGELOG @ 222_fiddle.sh_setup_mac_add_gradle
# ---------------------------------------------------------------------------------------------------|


function installGradle() {
  groupLog "installGradle";
  cd $1;
  brew install gradle;
}

function install() {
  groupLog "install";
  #try
  (
   installGradle || exit 1;
  )
  #catch
  _rc=$?
  case ${_rc} in
      0)  endLog "Done ~ gradle installed successfully."
          ;;
      *)  endLog "foo bar! Something went wrong."
          ;;
  esac
  #finally
  exit ${_rc}
}
