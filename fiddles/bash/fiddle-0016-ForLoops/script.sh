#!/bin/bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function exampleA() {
    echo ""
    echo "exampleA:"
    echo ""
    for i in 1 2 3 4 5
    do
       echo -e "\tWelcome $i times"
    done

}

function exampleB() {
    echo ""
    echo "exampleB:"
    echo ""
    for i in {1..5}
    do
        echo -e "\tWelcome $i times"
    done
    echo ""
}


exampleA
exampleB
