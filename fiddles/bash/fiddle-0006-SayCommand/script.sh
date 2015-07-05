#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

function badtv() {
    echo "badtv is"
    say -v zarvox -r 300  'be-d-be-d-be-d';
    say -v zarvox 'Buc';
    say -v zarvox -r 250 'Rajers!';
}
function nelson() {
    echo "nelson says"
    say -v junior -r 300 'Ha';
    say -v junior -r 250 'Ha';
}
badtv
nelson
