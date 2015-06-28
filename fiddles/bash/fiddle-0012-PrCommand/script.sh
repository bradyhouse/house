#!/usr/bin/env bash

clear;

# Initialize the stdout.txt with contents of root
ls -1 ../ | grep fiddle > _bash_fiddles_


pr -h "__fiddles/bash/*__" -l 38 _bash_fiddles_

# remove file
rm _bash_fiddles_


