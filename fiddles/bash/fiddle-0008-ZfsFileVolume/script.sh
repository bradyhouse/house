#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

dd if=/dev/zero of=/disk1 bs=128M count=1
zpool create webstorage /disk1
zpool list
