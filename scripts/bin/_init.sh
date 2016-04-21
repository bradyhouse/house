#!/usr/bin/env bash

function npmInit() {
    log "$0" "npmInit";
    npm init;
}

function bowerInit() {
    log "$0" "bowerInit";
    bower init;
}

function tsdInit() {
    log "$0" "tsdInit";
    tsd init;
}

