#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 11/30/2018______________________________________________________________|
#  Description             : MASTER CHEF STOP FUNCTION_______________________________________________|
#  Entry Point             : chefStop________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-stop.sh_______________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - See CHANGELOG @ 272_add_fiddle_stop
# ---------------------------------------------------------------------------------------------------|

function kitchenDestroy() {
  groupLog "kitchenDestroy";
  kitchen destroy;
}

function vboxmanageDelete() {
  groupLog "vboxmanageDelete";
  installed=$(isVboxManageInstalled;);
  if [[ "${installed}" == "true" ]]
  then
    details=$(vboxmanage list vms | grep $1;);
    vmRaw=$(echo ${details} | awk '{print $1;}'; );
    vm="${vmRaw%\"}";
    vm="${vm#\"}";
    if [[ !  -z  ${vm}  ]]
    then
      vboxmanage unregistervm ${vm} --delete
    fi
  fi
}

function vagrantDelete() {
  groupLog "vagrantDelete";
  installed=$(isKitchenInstalled;);
  if [[ "${installed}" == "true" ]]
  then
    details=$(vagrant global-status | grep $1;);
    id=$(echo ${details} | awk '{print $1;}'; );
    if [[ !  -z  ${id}  ]]
    then
      vagrant destroy ${id} || exit $?;
    fi
  fi
}


function chefStop() {
    groupLog "chefStop";
    kitchenDestroy || exit $?;
    vagrantDelete $1 || exit $?;
    vboxmanageDelete $1 || exit $?;
    echo 0;
}
