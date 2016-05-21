#!/usr/bin/env bash

function dockerRunDaemon() {
    sudo docker daemon -H unix:///var/run/docker.sock - H tcp://0.0.0.0:2375;
    exit 0;
}