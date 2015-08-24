#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

repo="https://github.com/ariya/phantomjs.git"
dest_dir=$1
dest_file="${dest_dir}/phantomjs"

function validArgument() {

    if [[ "$#" -ne 1 ]]; then exit 85; fi
    if [[ ! -d ${dest_dir} ]]; then exit 86; fi
    if [[ -e ${dest_file} ]]; then exit 86; fi

}
function whichPhantomJs() {
    which phantomjs
    if [[ $? -eq "0" ]]
    then
        exit 87
    fi
    exit 0
}

function installPhantomJs() {
    if [[ -d phantomjs ]]
    then
        sudo rm -r phantomjs || exit 88;
    fi
    git clone ${repo}
    if [[ ! -d phantomjs ]]
    then
        exit 89;
    fi
    cd phantomjs
    git checkout 2.0
    ./build.sh --qt-config "-I /usr/local/include/ -L /usr/local/lib/" || exit 90
    cd bin
    cp -rf phantomjs ${dest_file} || exit 91
}

function catch() {
     case $1 in
        0)  echo -e "42 ~ phantomjs installed"
            ;;
        85) echo "$0 \"[dest]\""
            echo ""
            echo -e "[dest]\tTarget install path"
            echo ""
            ;;
        86) echo -e "Fubar\tthe specified \"dest\", ${dest}, is invalid or already contains the phantomjs executable."
            ;;
        87) echo -e "Fubar\tphantomjs is already installed"
            ;;
        88) echo -e "Fubar\tThe existing phantomjs directory could not be deleted."
            ;;
        89) echo -e "Fubar\tAttempt to clone the phantomjs git repo, \"${repo}\", failed."
            ;;
        90) echo -e "Fubar\tAttempt to execute the phantomjs build script failed."
            ;;
        91) echo -e "attempt to copy the binary file to \"${dest_dir}\" failed."
            ;;
    esac
    exit $1
}


#try
(
    validArgument || exit $?
    whichPhantomJs || exit $?
    installPhantomJs || exit $?
)
catch $?




