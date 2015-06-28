#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

function badtv() {
    say -v zarvox -r 300  'be-d-be-d-be-d';
    say -v zarvox 'Buc';
    say -v zarvox -r 250 'Rajers!';
}

badtv
