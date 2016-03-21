#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/12/2016______________________________________________________________|
#  Description             : COLLECTION OF FUNCTION USED ACROSS THE FIDDLE-*.SH SCRIPTS______________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# ---------------------------------------------------------------------------------------------------|
echo $(echo "$0" | sed 's/\.\///g') | awk '{print toupper($0)}'

voidEchoFiddleTypes() {
    echo -e "\t\"ant\"\t\tAnt Fiddle"
    echo -e "\t\"angular\"\t\tAngular Fiddle"
    echo -e "\t\"angular2\"\t\tAngular2 Fiddle"
    echo -e "\t\"bash\"\t\tBash Fiddle"
    echo -e "\t\"compass\"\tCompass Fiddle"
    echo -e "\t\"d3\"\t\tData Driven Document Fiddle"
    echo -e "\t\"dojo\"\t\tDojo Fiddle"
    echo -e "\t\"extjs 5\"\t\tExt JS 5 Fiddle"
    echo -e "\t\"extjs 6\"\t\tExt JS 6 Fiddle"
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
}
