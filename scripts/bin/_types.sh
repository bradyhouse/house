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
# ---------------------------------------------------------------------------------------------------|


voidEchoFiddleTypes() {

    case $1 in
        'combine')
            echo -e "\t\"angular2\"\tAngular2 Fiddle"
            echo -e "\t\"d3\"\t\tData Driven Document Fiddle"
            echo -e "\t\"extjs 5\"\tExt JS 5 Fiddle"
            echo -e "\t\"extjs 6\"\tExt JS 6 Fiddle"
            echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
            echo -e "\t\"three\"\t\three.js / WebGl Fiddle"
            echo -e "\t\"svg\"\t\tScalar Vector Graphic Fiddle"
            ;;
        *)
            echo -e "\t\"ant\"\t\tAnt Fiddle"
            echo -e "\t\"angular\"\tAngular Fiddle"
            echo -e "\t\"angular2\"\tAngular2 Fiddle"
            echo -e "\t\"angular2-cli\"\tAngular2 CLI Fiddle"
            echo -e "\t\"angular2-seeder\"\tAngular2 Seeder Fiddle"
            echo -e "\t\"aurelia\"\tAurelia Fiddle"
            echo -e "\t\"bash\"\t\tBash Fiddle"
            echo -e "\t\"compass\"\tCompass Fiddle"
            echo -e "\t\"d3\"\t\tData Driven Document Fiddle"
            echo -e "\t\"docker\"\tDocker Fiddle"
            echo -e "\t\"dojo\"\t\tDojo Fiddle"
            echo -e "\t\"electron\"\tElectron Fiddle"
            echo -e "\t\"ember\"\t\tEmber Fiddle"
            echo -e "\t\"extjs 5\"\tExt JS 5 Fiddle"
            echo -e "\t\"extjs 6\"\tExt JS 6 Fiddle"
            echo -e "\t\"meteor\"\tMeteor Fiddle"
            echo -e "\t\"nativescript\"\tNativeScript Fiddle"
            echo -e "\t\"php\"\t\tPHP Fiddle"
            echo -e "\t\"python\"\tPython Fiddle"
            echo -e "\t\"rxjs\"\t\tRxJS Fiddle"
            echo -e "\t\"jquery\"\tjQuery / Bootstrap Fiddle"
            echo -e "\t\"three\"\t\three.js / WebGl Fiddle"
            echo -e "\t\"chrome\"\tChrome Extension Fiddle"
            echo -e "\t\"node\"\t\tNode Fiddle"
            echo -e "\t\"tween\"\t\ttween.js Fiddle"
            echo -e "\t\"typescript\"\tTypeScript Fiddle"
            echo -e "\t\"svg\"\t\tScalar Vector Graphic Fiddle"
            ;;
    esac
}
