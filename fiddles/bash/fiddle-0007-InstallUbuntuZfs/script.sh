#!/usr/bin/env bash

clear;
echo "$0" | sed 's/\.\///g' | awk '{print toupper($0)}'

# install pre-requisites
sudo apt-get -y install build-essential gawk zlib1g-dev uuid-dev vim-nox python-software-properties

# change repository
sudo add-apt-repository ppa:zfs-native/stable

# apply updates
sudo apt-get update

# install zfs
sudo apt-get install ubuntu-zfs

sudo echo spl >> /etc/modules
sudo echo zavl >> /etc/modules
sudo echo znvpair >> /etc/modules
sudo echo zunicode >> /etc/modules
sudo echo zcommon >> /etc/modules
sudo echo zfs >> /etc/modules

# Update boot manager
sudo update-initramfs -u
