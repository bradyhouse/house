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
# 01/24/2018 - See CHANGELOG @ aurelia-dependencies-update
# 05/26/2018 - See CHANGELOG @ 230_update_and_shrinkwrap
# 07/27/2018 - See CHANGELOG @ 234_add_bash_setup
# 08/04/2018 - See CHANGELOG @ 006_fiddle_react
# 11/10/2018 - See CHANGELOG @ 263_node_fiddle_29
# 11/21/2018 - See CHANGELOG @ 262_add_chef_setup
# ---------------------------------------------------------------------------------------------------|

voidEchoFiddleTypes() {

    case $1 in
        'build')
          echo -e "\t\"angular2-cli\"\t\tAngular2 CLI Fiddle";
          ;;
        'setup')
           echo -e "\t\"abd\"\t\tinstall android debug bridge\thttps://developer.android.com/studio/command-line/adb";
           echo -e "\t\"android\"\tinstall android-sdk\t\thttps://developer.android.com";
           echo -e "\t\"bash\"\\t\tinstall fiddle command line";
           echo -e "\t\"brew\"\t\tinstall homebrew\t\thttp://brew.sh/";
           echo -e "\t\"chef\"\t\tinstall chef\t\t\thttp://chef.io";
           echo -e "\t\"gh\"\t\tinstall github terminal\t\thttps://www.npmjs.com/package/gh";
           echo -e "\t\"gradle\"\tinstall gradle\t\t\thttps://gradle.org/";
           echo -e "\t\"js-beautify\"\tinstall js-beautify\t\thttps://www.npmjs.com/package/js-beautify";
           echo -e "\t\"live-server\"\tinstall live-server\t\thttps://www.npmjs.com/package/live-server";
           echo -e "\t\"meteor\"\tinstall meteor\t\t\thttps://www.meteor.com/";
           echo -e "\t\"nativescript\"\tinstall nativeScript\t\thttps://www.npmjs.com/package/nativescript";
           echo -e "\t\"ncu\"\t\tinstall npm-check-updates\thttps://www.npmjs.com/package/npm-check-updates";
           echo -e "\t\"ng\"\t\tinstall angular2-cli\t\thttps://cli.angular.io/";
           echo -e "\t\"node\"\t\tinstall node.js\t\t\thttps://nodejs.org/en/";
           echo -e "\t\"nvm\"\t\tinstall nvm\t\t\thttps://github.com/creationix/nvm";
           echo -e "\t\"php\"\t\tinstall PHP\t\t\thttps://secure.php.net/";
           echo -e "\t\"shrinkwrap\"\tinstall shrinkwrap\t\thttps://www.npmjs.com/package/shrinkwrap";
           echo -e "\t\"tree\"\t\tinstall tree\t\t\thttp://mama.indstate.edu/users/ice/tree/";
           echo -e "\t\"typescript\"\tinstall typeScript\t\thttps://www.npmjs.com/package/typescript";
           echo -e "\t\"vagrant\"\tinstall vagrant\t\t\thttps://www.vagrantup.com/";
           echo -e "\t\"virtualbox\"\tinstall virtual box\t\thttps://www.virtualbox.org/";
           echo -e "\t\"yarn\"\t\tinstall yarn\t\t\thttps://yarnpkg.com/lang/en/";
           echo -e "\t\"zsh\"\t\tinstall zsh\t\t\thttp://ohmyz.sh/";
           echo -e "";
           echo -e "\t\"all\"\t\tinstall everything";
          ;;
        'combine')
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
            echo -e "\t\"angular\"\t\tAngular Fiddles"
            echo -e "\t\"d3\"\t\t\tData Driven Document Fiddles"
            echo -e "\t\"dojo\"\t\t\tDojo Fiddle"
            echo -e "\t\"ember\"\t\t\tEmber Fiddle"
            echo -e "\t\"extjs 5\"\t\tExt JS 5 Fiddle"
            echo -e "\t\"extjs 6\"\t\tExt JS 6 Fiddle"
            echo -e "\t\"meteor\"\t\tMeteor Fiddle"
            echo -e "\t\"react\"\t\t\tReact Fiddles";
            echo -e "\t\"rxjs\"\t\t\tRxJS Fiddles"
            echo -e "\t\"jquery\"\t\tjQuery / ES6 Fiddles"
            echo -e "\t\"three\"\t\t\three.js / WebGl Fiddles"
            echo -e "\t\"tween\"\t\t\ttween.js Fiddles"
            echo -e "\t\"svg\"\t\t\tScalar Vector Graphic Fiddles"
            ;;
        'start')
            voidEchoFiddleTypes;
            echo -e "\t\"all\"\t\t\tstartup all Web based JS Fiddles"
            ;;
        'publish')
            echo -e "\t\"angular\"\t\tAngular Fiddles";
            echo -e "\t\"d3\"\t\t\tData Driven Document Fiddles";
            echo -e "\t\"dojo\"\t\t\tDojo Fiddles";
            echo -e "\t\"ember\"\t\t\tEmber Fiddles";
            echo -e "\t\"extjs 5\"\t\tExt JS 5 Fiddles";
            echo -e "\t\"extjs 6\"\t\tExt JS 6 Fiddles";
            echo -e "\t\"meteor\"\t\tMeteor Fiddles";
            echo -e "\t\"react\"\t\t\tReact Fiddles";
            echo -e "\t\"rxjs\"\t\t\tRxJS Fiddles";
            echo -e "\t\"jquery\"\t\tjQuery / Bootstrap Fiddles";
            echo -e "\t\"three\"\t\t\three.js / WebGl Fiddles";
            echo -e "\t\"tween\"\t\t\ttween.js Fiddles";
            echo -e "\t\"svg\"\t\t\tScalar Vector Graphic Fiddles";
            echo -e "\t\"all\"\t\t\tAll of the above";
            ;;
         'update')
            echo -e "\t\"angular2-cli\"\tAngular CLI Fiddles";
            echo -e "\t\"electron\"\tElectron Fiddles";
            echo -e "\t\"ember\"\t\tEmber Fiddles";
            echo -e "\t\"meteor\"\tMeteor Fiddles";
            echo -e "\t\"nativescript\"\tNativeScript Fiddles";
            echo -e "\t\"node\"\t\tNode Fiddles";
            echo -e "\t\"react\"\t\tReact Fiddles";
            echo -e "\t\"all\"\t\tAll of the above";
            ;;
        *)
            echo -e "\t\"android\"\t\tAndroid Fiddle"
            echo -e "\t\"ant\"\t\t\tAnt Fiddle"
            echo -e "\t\"angular\"\t\tAngular Fiddle"
            echo -e "\t\"angular2-cli\"\t\tAngular2 CLI Fiddle"
            echo -e "\t\"bash\"\t\t\tBash Fiddle"
            echo -e "\t\"c\"\t\t\tC Fiddle"
            echo -e "\t\"chef\"\t\t\tChef Recipe Fiddle"
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
            echo -e "\t\"react\"\t\t\tReact Fiddle";
            echo -e "\t\"rxjs\"\t\t\tRxJS Fiddle"
            echo -e "\t\"java\"\t\t\tJava Fiddle"
            echo -e "\t\"javac\"\t\t\tCommandline Java Fiddle"
            echo -e "\t\"jquery\"\t\tjQuery / Bootstrap Fiddle"
            echo -e "\t\"three\"\t\t\three.js / WebGl Fiddle"
            echo -e "\t\"chrome\"\t\tChrome Extension Fiddle"
            echo -e "\t\"node\"\t\t\tNode Fiddle"
            echo -e "\t\"tween\"\t\t\ttween.js Fiddle"
            echo -e "\t\"svg\"\t\t\tScalar Vector Graphic Fiddle"
            ;;
    esac
}
