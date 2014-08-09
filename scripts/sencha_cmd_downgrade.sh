#!/bin/bash

if [[ ! -e ~/.bash_profile_ext5 && -e ~/.bash_profile_ext422 ]]
then
	sudo mv ~/.bash_profile ~/.bash_profile_ext5
	sudo mv ~/.bash_profile_ext422 ~/.bash_profile
	source ~/.bash_profile
	echo ".bash_profile downgraded to ext_4.2.2"
	
	if [[ ! -d ~/cme/ext_5 && -d ~/cme/ext_422 && -d ~/cme/ext ]]
	then
		sudo mv ~/cme/ext ~/cme/ext_5
		sudo mv ~/cme/ext_422 ~/cme/ext
		echo "~/cme/ext downgraded to ext_4.2.2"
	else
		echo "Cannot downgrade the ~/cme/ext directory. Please update manually."
	fi
else
	echo "Already downgraded based on the .bash_profile"
fi
