#!/usr/bin/env bash
function voidSubstr() {
    if [ $# -ne "3" ]
    then
      echo ""
      echo "sub string"
      echo ""
      echo "Usage: `basename $0` old-pattern new-pattern filename"
      exit 86
    fi

    if [ -f "$3" ]
    then
        _f=$3
    else
        echo "File \"$3\" does not exist."
        exit 86
    fi

    _s=$(echo $1 | sed -e 's/[]\/$*.^|[]/\\&/g')
    _g=$(echo $2 | sed -e 's/[]\/$*.^|[]/\\&/g')
    _tmp=$(echo "$3.tmp")

    sed -e "s/$_s/$_g/g" $_f > $_tmp

    sudo mv -f $_tmp $_f

    if [ -f $_tmp ]
    then
       rm -R $_tmp
    fi

    exit $?
}

function log() {
    script=$(echo $1 | sed 's/\.\///g' | awk '{print toupper($0)}');
    message=$(echo $2 | sed 's/\.\///g' | awk '{print toupper($0)}');
    tput bold; tput rev;
    echo -e "├──${message}";
    tput sgr0;
}

function groupLog() {
    message=$(echo $1 | sed 's/\.\///g' | awk '{print toupper($0)}');
    tput bold; tput rev;
    echo -e "├────${message}";
    tput sgr0;
}

function endLog() {
    message=$(echo $1 | sed 's/\.\///g' | awk '{print toupper($0)}');
    tput bold; tput rev;
    echo -e "└──${message}";
    echo -e "";
    tput sgr0;
}

function findReplace() {
    _f=$3;
    _s=$(echo $1 | sed -e 's/[]\/$*^|[]/\\&/g');
    _g=$(echo $2 | sed -e 's/[]\/$*^|[]/\\&/g');
    _tmp=$(echo "$3.tmp");
    sed -e "s/$_s/$_g/g" $_f > $_tmp;
    sudo mv -f $_tmp $_f;
    if [[ -f $_tmp ]]
    then
       rm -R $_tmp
    fi
}

function voidShowTitle() {
    echo -e ""
    echo -e "H o u s e"
    echo -e "oooooooooooo  o8o        .o8        .o8  oooo    "
    echo -e " 888       8  \`\"'        888        888   888   "
    echo -e " 888         oooo   .oooo888   .oooo888   888   .ooooo."
    echo -e " 888oooo8     888  d88   888  d88   888   888  d88   88b"
    echo -e " 888          888  888   888  888   888   888  888ooo888"
    echo -e " 888          888  888   888  888   888   888  888    .o "
    echo -e "o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P "
    echo -e ""
    echo "$1" | awk '{print toupper($0)}'
}

function voidEchoUpperCase() {
    echo "$1" | awk '{print toupper($0)}'
}

function voidPathRecursiveList() {
    if [ $# -ne "3" ]
    then
      echo ""
      echo "directory recursive file type list"
      echo ""
      echo "Usage:"
      echo ""
      echo "       $0 \"[d]\" \"[e]\" \"[f]\""
      echo ""
      echo "       [d] - directory to search"
      echo "       [e] - file extension criteria"
      echo "       [f] - output file name"
      echo ""
      exit 86
    fi
    home=$(cd ~; pwd | sed -e 's/[]\/$*.^|[]/\\&/g')
    _d=$(echo $1 | sed 's/~/'$home'/g')
    _f=$(echo $3 | sed 's/~/'$home'/g')
    find $_d -name ".$2" -prune -o -type f -print | grep ".$2" > $_f
}

function listAndCount() {
    cd ../fiddles/$1
    echo $(ls -1 | grep $2 | wc -l | sed -e 's/^[[:space:]]*//';)
}

function getFiddle() {
    matches=$(listAndCount $1 $2;)
    if [[ ${matches} -eq 1 ]]
    then
        cd ../fiddles/$1;
        echo $(ls -1 | grep $2 | sed -e 's/^[[:space:]]*//';);
    else
        echo "";
    fi
}

function isInstalled() {
    app=$1;

    if [[ ! $(which ${app};) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}