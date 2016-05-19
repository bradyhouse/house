#!/usr/bin/env bash

this=$(pwd;);

function emberCreate() {
    groupLog "emberCreate";
    fiddle=$1;
    # try
    (
        if [[ -e "${fiddle}" ]]
        then
            rm -rf "${fiddle}" || exit 1;
        fi
        ember new $1 || exit 2;
    )
    # catch
    rc=$?; case ${rc} in
        0)  echo "";
            ;;
        1)  echo "${this}: attempt to remove the existing directory failed";
            ;;
        2)  echo "${this}: Call to ember CLI \"new\" failed";
            ;;
        *)  echo "${this}: F U B A R ~ Something went wrong."
            ;;
    esac
    return ${rc};
}
