#!/bin/bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/19/2015______________________________________________________________|
#  Description             : UTILITY USED TO ADD A NEW FIDDLE TO THE ../FIDDLES DIRECTORY____________|
#  Command line Arguments  : $1 = FIDDLE TYPE, $2 = FIDDLE NAME______________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# 03/19/2015 - Baseline Ver.
# 04/15/2015 - See CHANGELOG @ 201504151810
# 05/08/2015 - See CHANGELOG @ 201505061810
# 06/20/2015 - See CHANGELOG @ 201506200420
# 06/21/2015 - See CHANGELOG @ 201506210420
# 07/05/2015 - See CHANGELOG @ 201506290420
# 07/11/2015 - See CHANGELOG @ 201507110420
# 07/26/2015 - See CHANGELOG @ 201507260420
# 09/10/2015 - See CHANGELOG @ 201508240420
# 12/06/2015 - See CHANGELOG @ 201511100420
# 01/17/2016 - See CHANGELOG @ 201601100420
# 02/01/2016 - See CHANGELOG @ 201602010420
# 02/13/2016 - See CHANGELOG @ 201602130420
# 03/02/2016 - See CHANGELOG @ 201603020420
# 03/10/2016 - See CHANGELOG @ 201603050420
# 05/17/2016 - See CHANGELOG @ 201605020420
# 05/18/2015 - See CHANGELOG @ 201605180420
# 09/16/2016 - See CHANGELOG @ 201609160420
# 10/01/2016 - See CHANGELOG @ 201610010420
# 11/30/2016 - See CHANGELOG @ 201611280420
# ---------------------------------------------------------------------------------------------------|

this=$0;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}';
source bin/_utils.sh
source bin/_types.sh


#try
(
	if [ "$#" -ne 2 ]; then  exit 86; fi
    case $1 in
        'android')
            source bin/android/.androidrc;
            source bin/android/_install.sh;
            source bin/android/_create.sh;
            create $2 || exit 107;
            ;;
        'angular')
            source bin/angular/_create.sh;
            create $2 || exit 87;
            ./fiddle-index.sh "angular" || exit 87;
            ;;
        'angular2')
            source bin/angular2/_create.sh;
            create $2 || exit 87;
            ./fiddle-index.sh "angular2" || exit 87;
            ;;
        'angular2-cli')
            source bin/angular2-cli/_install.sh;
            source bin/angular2-cli/_create.sh;
            create $2 || exit 87;
            ;;
        'angular2-seeder')
            source bin/angular2-seeder/_create.sh;
            create $2 || exit 87;
            ;;
        'ant')
            source bin/ant/_create.sh;
            create $2 || exit 87;
            ;;
        'aurelia')
            source bin/aurelia/_create.sh;
            create $2 || exit 104;
            ./fiddle-index.sh "aurelia" || exit 104;
            ;;
        'bash')
            source bin/bash/_create.sh;
            create $2 || exit 95;
            ;;
        'c')
            source bin/c/.gccrc;
            source bin/c/_install.sh;
            source bin/c/_create.sh;
            create $2 || exit 108;
            ;;
        'chrome')
            source bin/chrome/_create.sh;
            create $2 || exit 92;
            ;;
        'compass')
            source bin/compass/_create.sh;
            create $2 || exit 87;
            ./fiddle-index.sh "compass" || exit 87;
            ;;
        'd3')
            source bin/d3/_create.sh;
            create $2 || exit 99;
            ./fiddle-index.sh "d3" || exit 99;
            ;;
        'docker')
            source bin/docker/_brew_update.sh;
            source bin/docker/_brew_install_virtualbox.sh;
            source bin/docker/_brew_install_docker.sh;
            source bin/docker/_create.sh;
            create $2 || exit 105;
            ;;
        'dojo')
            source bin/dojo/_create.sh;
            create $2 || exit 91;
            ./fiddle-index.sh "dojo" || exit 91
        ;;
        'electron')
            source bin/electron/_install.sh;
            source bin/electron/_create.sh;
            create $2 || exit 105;
            ;;
        'ember')
            source bin/ember/_install.sh;
            source bin/ember/_create.sh;
            create $2 || exit 103;
            ;;
        'extjs5')
            source bin/extjs5/_create.sh;
            create $2 || exit 87;
            ./fiddle-index.sh "extjs5" || exit 87;
            ;;
        'extjs6')
            source bin/extjs6/_create.sh;
            create $2 || exit 87;
            ./fiddle-combine.sh $1 $2 || exit 87;
            ./fiddle-index.sh "extjs6" || exit 87;
            ;;
        'java')
            source bin/java/.javarc;
            source bin/java/_install.sh;
            source bin/java/_create.sh;
            create $2 || exit 106;
            ;;
        'jquery')
            source bin/jquery/_create.sh;
            create $2 || exit 88;
            ./fiddle-index.sh "jquery" || exit 88;
            ;;
        'meteor')
            source bin/meteor/_install.sh;
            source bin/meteor/_create.sh;
            create $2 || exit 102;
            ;;
        'nativescript')
            source bin/nativescript/.nativescriptrc
            source bin/nativescript/_create.sh;
            source bin/nativescript/_install.sh;
            source bin/nativescript/_start.sh;
            create $2 || exit 105;
            ;;
        'node')
            source bin/node/_create.sh;
            create $2 || exit 93;
            ;;
        'php')
            source bin/php/_create.sh;
            create $2 || exit 90;
            ;;
        'python')
            source bin/python/_create.sh;
            create $2 || exit 98;
            ;;
        'rxjs')
            source bin/rxjs/_create.sh;
            create $2 || exit 100;
            ./fiddle-index.sh "rxjs" || exit 100
            ;;
        'three')
            source bin/three/_create.sh;
            create $2 || exit 89;
            ./fiddle-combine.sh "three" "$2" "app.js" "0" || exit 89
            ./fiddle-index.sh "three" || exit 89
            ;;
        'typescript')
            source bin/typescript/_install_global.sh;
            source bin/typescript/_add_directories.sh;
            source bin/typescript/_init.sh;
            source bin/typescript/_add_typingsrc.sh;
            source bin/typescript/_install_save.sh;
            source bin/typescript/_add_gulpfile.sh;
            source bin/typescript/_add_karma_conf.sh;
            source bin/typescript/_create.sh;
            create $2 || exit 101;
            ;;
        'tween')
            source bin/tween/_create.sh;
            create $2 || exit 94;
            ./fiddle-index.sh "tween" || exit 94
            ;;
        'svg')
            source bin/svg/_create.sh;
            create $2 || exit 97;
            ./fiddle-index.sh "svg" || exit 97
            ;;
        *)  exit 86
            ;;
    esac
    # Update the changelog
    if [[ $2 != "fiddle-0000-Template" ]]
    then
      $(echo "* Added [fiddles/$1/$2](fiddles/$1/$2)" >> "../CHANGELOG.md") || exit 96
    fi
)
#catch
_rc=$?
case ${_rc} in
    0)  echo ""
        ;;
    86) echo ""
        echo "Nope ~ Incorrect number of arguments"
        echo ""
        echo "Usage:"
        echo ""
        echo "$0 \"[t]\" \"[n]\""
        echo ""
        echo "[t] - type. Valid types include: "
        echo ""
        voidEchoFiddleTypes;
        echo ""
        echo "[n] - fiddle Name.  For example: \"fiddleParabolaSurface\""
        echo ""
        echo ""
        ;;
    87) echo "fubar! fiddle creation failed."
        ;;
    88) echo "fubar! jquery fiddle creation failed."
        ;;
    89) echo "fubar! three fiddle creation failed."
        ;;
    90) echo "fubar! php fiddle creation failed."
        ;;
    91) echo "fubar! dojo fiddle creation failed."
        ;;
    92) echo "fubar! chrome fiddle creation failed."
        ;;
    93) echo "fubar! node fiddle creation failed."
        ;;
    94) echo "fubar! tween fiddle creation failed."
        ;;
    95) echo "fubar! bash fiddle creation failed."
        ;;
    96) echo "fubar! failed while attempting update the CHANGELOG.md file"
        ;;
    97) echo "fubar! svg fiddle creation failed."
        ;;
    98) echo "fubar! python fiddle creation failed."
        ;;
    99) echo "fubar! d3 fiddle creation failed."
        ;;
    100) echo "fubar! rxjs fiddle creation failed."
        ;;
    101) echo "fubar! typescript fiddle creation failed."
        ;;
    102) echo "fubar! meteor fiddle creation failed."
        ;;
    103) echo "fubar! ember fiddle creation failed."
        ;;
    104) echo "fubar! aurelia fiddle creation failed."
        ;;
    105) echo "fubar! nativescript fiddle creation failed."
        ;;
    106) echo "fubar! java fiddle creation failed."
        ;;
    107) echo "fubar! android fiddle creation failed."
        ;;
    108) echo "fubar! c fiddle creation failed."
        ;;
    *)  echo "fubar! Something went wrong."
        ;;
esac
#finally
exit ${_rc}
