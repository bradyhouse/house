#!/usr/bin/env bash

this=$0;

function updateProfile() {
    groupLog "updateProfile $1";
    _profile=$1;
    if [[ -e "${_profile}" ]]
    then
        echo -e "" >> ${_profile};
        echo -e "## nwjs ####" >> ${_profile};
        echo -e "export PATH=\"/opt/homebrew-cask/Caskroom/nwjs/0.12.3/nwjs-v0.12.3-osx-x64/nwjs.app/Contents/MacOS:$PATH\"" >> ${_profile};
    else
        groupLog "The file \"${_profile}\" does not exist.";
        exit 1;
    fi
}

function homePath() {
    cd ~;
    pwd;
}

function updateBashProfile() {
    groupLog "updateBashProfile";
    _homeRoot=$(homePath;);
    _bashProfile="${_homeRoot}/.bash_profile";
    _bashProfileUpdated=$(bashProfileUpdated;);
    if [[ "${_bashProfileUpdated}" == "false" ]]
    then
        echo -e "";
        read -p "Do you want to update your .bash_profile (Y/n)? "  _update;
        if [[ ${_update} == "n" ]]
        then
            exit 0;
        fi
        updateProfile ${_bashProfile} || exit $?;
    fi
}



function bashProfileUpdated() {
    _homeRoot=$(homePath;);
    _bashProfile="${_homeRoot}/.bash_profile";
    if [[ -e "${_bashProfile}" ]]
    then
        _nwjsFilter=$(cat ${_bashProfile} | grep nwjs | wc -l | sed -e 's/^[[:space:]]*//';);

        if [[ ${_nwjsFilter} -eq 0 ]]
        then
            echo "false";
        else
            echo "true";
        fi
    else
        echo "true";
    fi
}
function brewNwInstall() {
    groupLog "brewNwInstall";
    installed=$(isInstalled "nwjs";);
    if [[ "${installed}" == "false" ]]
    then
        brew cask install nwjs || exit $?;
    fi
}

function nwInstall() {
    groupLog "nwInstall";
    _brewInstalled=$(isInstalled "brew";);
    if [[ "${_brewInstalled}" == "false" ]]
    then
         groupLog "${this}: brew is not installed";
         exit 1;
    else
         brewNwInstall;
         updateBashProfile;
    fi
}
