#!/bin/bash

if [[ -e ~/.bash_profile_ext5 && ! -e ~/.bash_profile_ext422 ]]
then
	sudo mv ~/.bash_profile ~/.bash_profile_ext422
	sudo mv ~/.bash_profile_ext5 ~/.bash_profile
	source ~/.bash_profile
	echo ".bash_profile pointed to ext5 and re-sourced"

	if [[ ! -d ~/github/house/web/ext_422 && -d ~/github/house/web/ext_5 && -d ~/github/house/web/ext ]]
	then
		sudo mv ~/github/house/web/ext ~/github/house/web/ext_422
		sudo mv ~/github/house/web/ext_5 ~/github/house/web/ext_5
		echo "~/github/house/ext upgraded to ext_5"
	else
		echo "Cannot upgrade the ~/github/house/web/ext directory. Please update manually."
	fi
else
	echo "Already running ext5 based on the .bash_profile"
fi
