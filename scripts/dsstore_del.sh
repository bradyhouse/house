#!/bin/bash
cd ..
find . -name ".DS_Store" -print0 | xargs -0 rm -rf
