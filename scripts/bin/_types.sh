#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/12/2016______________________________________________________________|
#  Description             : MASTER FIDDLE TYPES FUNCTION____________________________________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# 05/18/2015 - See CHANGELOG @ 201605180420
# 10/01/2016 - See CHANGELOG @ 201610010420
# 12/15/2016 - See CHANGELOG @ 201612120420
# 03/10/2017 - See CHANGELOG @ 201703100420
# 04/24/2017 - See CHANGELOG @ 201704170420
# ---------------------------------------------------------------------------------------------------|

voidEchoFiddleTypes() {

    case $1 in
        'build')
          echo -e "\t\"angular2-seeder\"\tAngular2 Seeder Fiddle";
          echo -e "\t\"angular2-cli\"\t\tAngular2 CLI Fiddle";
          ;;
        'setup')
           echo -e "\t\"android\"\tinstall android-sdk\thttps://developer.android.com";
           echo -e "\t\"brew\"\t\tinstall homebrew\thttp://brew.sh/";
           echo -e "\t\"gh\"\t\tinstall github terminal\thttps://www.npmjs.com/package/gh";
           echo -e "\t\"js-beautify\"\tinstall js-beautify\thttps://www.npmjs.com/package/js-beautify";
           echo -e "\t\"live-server\"\tinstall live-server\thttps://www.npmjs.com/package/live-server";
           echo -e "\t\"nativescript\"\tinstall nativeScript\thttps://www.npmjs.com/package/nativescript";
           echo -e "\t\"ng\"\t\tinstall angular2-cli\thttps://cli.angular.io/";
           echo -e "\t\"node\"\t\tinstall node.js\t\thttps://nodejs.org/en/";
           echo -e "\t\"nvm\"\t\tinstall nvm\t\thttps://github.com/creationix/nvm";
           echo -e "\t\"typescript\"\tinstall typeScript\thttps://www.npmjs.com/package/typescript";
           echo -e "\t\"yarn\"\t\tinstall yarn\t\thttps://yarnpkg.com/lang/en/";
           echo -e "\t\"zsh\"\t\tinstall zsh\t\thttp://ohmyz.sh/";

           echo -e "";
           echo -e "\t\"all\"\t\tinstall everything";
          ;;
        'combine')
            echo -e "\t\"angular2\"\tAngular2 Fiddle"
            echo -e "\t\"d3\"\t\tData Driven Document Fiddle"
            echo -e "\t\"extjs5\"\tExt JS 5 Fiddle"
            echo -e "\t\"extjs6\"\tExt JS 6 Fiddle"
            echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
            echo -e "\t\"three\"\t\three.js / WebGl Fiddle"
            echo -e "\t\"svg\"\t\tScalar Vector Graphic Fiddle"
            ;;
        'emulate')
            echo -e "\t\"android\"\tAndroid Fiddle"
            echo -e "\t\"nativescript\"\tNativeScript Fiddle"
            ;;
        'edit')
            echo -e "\t\"javac\"\t\tCommandline Java Fiddle"
            echo -e "\t\"c\"\t\tC Fiddle"
            ;;
        'index')
            echo -e "\t\"angular\"\t\tAngular Fiddle"
            echo -e "\t\"angular2\"\t\tAngular2 Fiddle"
            echo -e "\t\"aurelia\"\t\tAurelia Fiddle"
            echo -e "\t\"d3\"\t\t\tData Driven Document Fiddle"
            echo -e "\t\"dojo\"\t\t\tDojo Fiddle"
            echo -e "\t\"ember\"\t\t\tEmber Fiddle"
            echo -e "\t\"extjs 5\"\t\tExt JS 5 Fiddle"
            echo -e "\t\"extjs 6\"\t\tExt JS 6 Fiddle"
            echo -e "\t\"meteor\"\t\tMeteor Fiddle"
            echo -e "\t\"rxjs\"\t\t\tRxJS Fiddle"
            echo -e "\t\"jquery\"\t\tjQuery / Bootstrap Fiddle"
            echo -e "\t\"three\"\t\t\three.js / WebGl Fiddle"
            echo -e "\t\"tween\"\t\t\ttween.js Fiddle"
            echo -e "\t\"svg\"\t\t\tScalar Vector Graphic Fiddle"
            ;;
        'start')
            voidEchoFiddleTypes;
            echo -e "\t\"all\"\t\tstartup all Web based JS Fiddles"
            ;;
        *)
            echo -e "\t\"android\"\t\tAndroid Fiddle"
            echo -e "\t\"ant\"\t\t\tAnt Fiddle"
            echo -e "\t\"angular\"\t\tAngular Fiddle"
            echo -e "\t\"angular2\"\t\tAngular2 Fiddle"
            echo -e "\t\"angular2-cli\"\t\tAngular2 CLI Fiddle"
            echo -e "\t\"angular2-seeder\"\tAngular2 Seeder Fiddle"
            echo -e "\t\"aurelia\"\t\tAurelia Fiddle"
            echo -e "\t\"bash\"\t\t\tBash Fiddle"
            echo -e "\t\"c\"\t\t\tC Fiddle"
            echo -e "\t\"compass\"\t\tCompass Fiddle"
            echo -e "\t\"d3\"\t\t\tData Driven Document Fiddle"
            echo -e "\t\"docker\"\t\tDocker Fiddle"
            echo -e "\t\"dojo\"\t\t\tDojo Fiddle"
            echo -e "\t\"electron\"\t\tElectron Fiddle"
            echo -e "\t\"ember\"\t\t\tEmber Fiddle"
            echo -e "\t\"extjs 5\"\t\tExt JS 5 Fiddle"
            echo -e "\t\"extjs 6\"\t\tExt JS 6 Fiddle"
            echo -e "\t\"meteor\"\t\tMeteor Fiddle"
            echo -e "\t\"nativescript\"\t\tNativeScript Fiddle"
            echo -e "\t\"php\"\t\t\tPHP Fiddle"
            echo -e "\t\"python\"\t\tPython Fiddle"
            echo -e "\t\"rxjs\"\t\t\tRxJS Fiddle"
            echo -e "\t\"java\"\t\t\tJava Fiddle"
            echo -e "\t\"javac\"\t\t\tCommandline Java Fiddle"
            echo -e "\t\"jquery\"\t\tjQuery / Bootstrap Fiddle"
            echo -e "\t\"three\"\t\t\three.js / WebGl Fiddle"
            echo -e "\t\"chrome\"\t\tChrome Extension Fiddle"
            echo -e "\t\"node\"\t\t\tNode Fiddle"
            echo -e "\t\"tween\"\t\t\ttween.js Fiddle"
            echo -e "\t\"typescript\"\t\tTypeScript Fiddle"
            echo -e "\t\"svg\"\t\t\tScalar Vector Graphic Fiddle"
            ;;
    esac
}
