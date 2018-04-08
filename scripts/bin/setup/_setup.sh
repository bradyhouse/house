#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 02/11/2017______________________________________________________________|
#  Description             : MASTER SETUP SCRIPT_____________________________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline   - See CHANGELOG @ 201702110420
# 03/10/2017 - See CHANGELOG @ 201703100420
# 01/24/2018 - See CHANGELOG @ aurelia-dependencies-update
# 04/08/2018 - See CHANGELOG @ 222_fiddle.sh_setup_mac_add_gradle
# ---------------------------------------------------------------------------------------------------|

function setup() {
    groupLog "setup";
    if [ "$#" -lt 2 ]; then  exit 86; fi
    _os=$1;
    _app=$2;
    case ${_os} in
        'mac')
            case ${_app} in
              'android')
                source bin/setup/mac/_android.sh;
                install || exit $?;
                ;;
              'au')
                source bin/setup/mac/_au.sh;
                install || exit $?;
                ;;
              'brew')
                source bin/setup/mac/_brew.sh;
                install || exit $?;
                ;;
              'gh')
                source bin/setup/mac/_gh.sh;
                install || exit $?;
                ;;
              'gradle')
                source bin/setup/mac/_gradle.sh;
                install || exit $?;
                ;;
              'joe')
                source bin/setup/mac/_joe.sh;
                install || exit $?;
                ;;
              'js-beautify')
                source bin/setup/mac/_js-beautify.sh;
                install || exit $?;
                ;;
              'live-server')
                source bin/setup/mac/_live-server.sh;
                install || exit $?;
                ;;
              'nativescript')
                source bin/setup/mac/_nativescript.sh;
                install || exit $?;
                ;;
              'ng')
                 source bin/setup/mac/_ng.sh;
                 install || exit $?;
                 ;;
              'yarn')
                 source bin/setup/mac/_yarn.sh;
                 install || exit $?;
                 ;;
              'zsh')
                source bin/setup/mac/_zsh.sh;
                install || exit $?;
                ;;
              'node')
                source bin/setup/mac/_node.sh;
                install || exit $?;
                ;;
              'nvm')
                source bin/setup/mac/_nvm.sh;
                install || exit $?;
                ;;
              'typescript')
                source bin/setup/mac/_typescript.sh;
                install || exit $?;
                ;;
              'all')
                setup ${_os} "android" || exit $?;
                setup ${_os} "au" || exit $?;
                setup ${_os} "brew" || exit $?;
                setup ${_os} "gradle" || exit $?;
                setup ${_os} "gh" || exit $?;
                setup ${_os} "node" || exit $?;
                setup ${_os} "nvm" || exit $?;
                setup ${_os} "joe" || exit $?;
                setup ${_os} "js-beautify" || exit $?;
                setup ${_os} "live-server" || exit $?;
                setup ${_os} "nativescript" || exit $?;
                setup ${_os} "ng" || exit $?;
                setup ${_os} "typescript" || exit $?;
                setup ${_os} "yarn" || exit $?;
                setup ${_os} "zsh" || exit $?;
                ;;
               *) exit 86;
                ;;
            esac
            ;;
        *)  exit 86;
            ;;
    esac
}
