#!/usr/bin/env bash

function createAndroid() {
    android create project -a Main -k com.example.app -t 19 -g -v 0.10 -p AppWithGradleTemplate

}