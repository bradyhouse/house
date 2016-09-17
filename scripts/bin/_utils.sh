#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  Repo                    : https://github.com/bradyhouse/house_____________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 05/02/2016______________________________________________________________|
#  Description             : COLLECTION OF RE-USABLE FUNCTIONS.______________________________________|
#  Entry Point             : N/A_____________________________________________________________________|
#  Input Parameters        : N/A_____________________________________________________________________|
#  Initial Consumer        : ../fiddle-*.sh__________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver - CHANGELOG.MARKDOWN ~ 201605020420
# 09/16/2016 - See CHANGELOG @ 201609160420
# ---------------------------------------------------------------------------------------------------|


function split() {
  str=$1;
  delimiter=$2;
  echo ${str//$delimiter/ };
}

function parseName() {
  pieces=($(split $1 "-";));
  if [[ ${#pieces[@]} -eq 3 ]]
  then
    if [[ ${pieces[0]} -eq "fiddle" ]]
    then
      # ToDo add logic to verify pieces[1] is numeric
      echo ${pieces[2]};
    else
      exit -1;
    fi
  else
    exit -1;
  fi
}

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

function toLowerCase() {
    echo "$1" | awk '{print tolower($0)}'
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
        echo "NA";
    fi
}

function isInstalled() {
    if [[ ! $(which $1;) ]]
    then
        echo "false";
    else
        echo "true";
    fi
}

function voidGrantAdmin() {
    groupLog "voidGrantAdmin";
    target=$1;
    groupLog "${target}";
    if [[ ! -d ${target} ]]; then endLog "Invalid Path"; exit -1; fi
    sudo chown -R $(whoami):admin ${target} || exit $?;
}

function contains() {
    string="$1"
    substring="$2"
    if test "${string#*$substring}" != "$string"
    then
        return 0    # $substring is in $string
    else
        return 1    # $substring is not in $string
    fi
}

function stripLine() {
    file=$1
    fileTmp="${file}.~"
    searchCriteria=$2

    if [[ -f "${file}" ]]
    then
       cat "${file}" | grep -v "${searchCriteria}" > "${fileTmp}"
       cat "${fileTmp}" > "${file}"
       rm -f "${fileTmp}"
    fi
}

function subDelimStr() {
    _str=$1;
    _delm=$2;
    _pos=$3;
    IFS=${_delm} read -r -a array <<< "${_str}";
    _arrayLength=$(echo "${#array[@]}";);
    if [[ ${_pos} -lt ${_arrayLength} ]]
    then
        echo ${array[${_pos}]};
    else
        echo "";
    fi
}


