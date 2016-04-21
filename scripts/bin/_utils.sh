#!/usr/bin/env bash
#!/usr/bin/env bash
# ---------------------------------------------------------------------------------------------------|
#  School / Organization   : bradyhouse.io___________________________________________________________|
#  Specification           : N/A_____________________________________________________________________|
#  Specification Path      : N/A_____________________________________________________________________|
#  Author                  : brady house_____________________________________________________________|
#  Create date             : 03/12/2016______________________________________________________________|
#  Description             : COLLECTION OF FUNCTION USED ACROSS THE SHELL SCRIPTS____________________|
#  Command line Arguments  : N/A_____________________________________________________________________|
# ---------------------------------------------------------------------------------------------------|
#  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
# ---------------------------------------------------------------------------------------------------|
# Baseline Ver.
# ---------------------------------------------------------------------------------------------------|


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
