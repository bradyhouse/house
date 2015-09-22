#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'
echo "Bash version ${BASH_VERSION}..."

function extractJar() {
    jar xvf $1
}

# extractJar "/Users/e13542/bin/Sencha/Cmd/5.1.2.52/sencha.jar"
cd Sencha
cd Cmd
cd 6.0.0.202
extractJar "/Users/e13542/bin/Sencha/Cmd/6.0.0.202/sencha.jar"
