#!/bin/bash

if [[ -e ~/.bash_profile_ext5 && ! -e ~/.bash_profile_ext422 ]]
then
	sudo mv ~/.bash_profile ~/.bash_profile_ext422
	sudo mv ~/.bash_profile_ext5 ~/.bash_profile
	source ~/.bash_profile
	echo ".bash_profile pointed to ext5 and re-sourced"

	if [[ ! -d ~/cme/ext_422 && -d ~/cme/ext_5 && -d ~/cme/ext ]]
	then
		sudo mv ~/cme/ext ~/cme/ext_422
		sudo mv ~/cme/ext_5 ~/cme/ext
		echo "~/cme/ext upgraded to ext_5"
	else
		echo "Cannot upgrade the ~/cme/ext directory. Please update manually."
	fi
else
	echo "Already running ext5 based on the .bash_profile"
fi
