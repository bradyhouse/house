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
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# 07/27/2018 - See CHANGELOG @ 234_add_bash_setup
# 11/10/2018 - See CHANGELOG @ 263_node_fiddle_29
# 11/21/2018 - See CHANGELOG @ 262_add_chef_setup
# ---------------------------------------------------------------------------------------------------|

function setup() {
    groupLog "setup";
    if [ "$#" -lt 2 ]; then  exit 86; fi
    _os=$1;
    _app=$2;
    case ${_os} in
        'mac')
            case ${_app} in
              'bash')
                source bin/setup/mac/_bash.sh;
                install || exit $?;
                ;;
              'abd')
                source bin/setup/mac/_abd.sh;
                install || exit $?;
                ;;
              'android')
                source bin/setup/mac/_android.sh;
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
              'meteor')
                source bin/setup/mac/_meteor.sh;
                install || exit $?;
                ;;
              'ng')
                 source bin/setup/mac/_ng.sh;
                 install || exit $?;
                 ;;
              'ncu')
                 source bin/setup/mac/_ncu.sh;
                 install || exit $?;
                 ;;
              'php')
                 source bin/setup/mac/_php.sh;
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
              'shrinkwrap')
                source bin/setup/mac/_shrinkwrap.sh;
                install || exit $?;
                ;;
              'tree')
                source bin/setup/mac/_tree.sh;
                install || exit $?;
                ;;
              'typescript')
                source bin/setup/mac/_typescript.sh;
                install || exit $?;
                ;;
              'chef')
                source bin/setup/mac/_chef.sh;
                install || exit $?;
                setup ${_os} "vagrant" || exit $?;
                setup ${_os} "virtualbox" || exit $?;
                ;;
              'vagrant')
                source bin/setup/mac/_vagrant.sh;
                install || exit $?;
                ;;
              'virtualbox')
                source bin/setup/mac/_virtualbox.sh;
                install || exit $?;
                ;;
              'vue')
                source bin/setup/mac/_vue.sh;
                install || exit $?;
                ;;
              'frontend')
                setup ${_os} "gh" || exit $?;
                setup ${_os} "ncu" || exit $?;
                setup ${_os} "js-beautify" || exit $?;
                setup ${_os} "live-server" || exit $?;
                setup ${_os} "meteor" || exit $?;
                setup ${_os} "nativescript" || exit $?;
                setup ${_os} "ng" || exit $?;
                setup ${_os} "shrinkwrap" || exit $?;
                setup ${_os} "typescript" || exit $?;
                ;;
               *) exit 86;
                ;;
            esac
            ;;
        *)  exit 86;
            ;;
    esac
}
