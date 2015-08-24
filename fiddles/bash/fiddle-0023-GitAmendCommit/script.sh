#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

amend() {
    git commit --amend -m $1
}

cd $1
amend $2

