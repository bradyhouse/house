#!/usr/bin/env bash

function startHttpServer() {
    groupLog "startHttpServer";
    http-server -o -c-1;
    exit 0;
}