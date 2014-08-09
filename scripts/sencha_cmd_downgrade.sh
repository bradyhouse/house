#!/bin/bash

if [[ ! -e ~/.bash_profile_ext5 && -e ~/.bash_profile_ext422 ]]
then
	sudo mv ~/.bash_profile ~/.bash_profile_ext5
	sudo mv ~/.bash_profile_ext422 ~/.bash_profile
	source ~/.bash_profile
	echo ".bash_profile downgraded to ext_4.2.2"
	
	if [[ ! -d ~/github/house/web/ext_5 && -d ~/github/house/web/ext_422 && -d ~/github/house/web/ext ]]
	then
		sudo mv ~/github/house/web/ext ~/github/house/web/ext_5
		sudo mv ~/github/house/web/ext_422 ~/github/house/web/ext
		echo "~/github/house/web/ext downgraded to ext_4.2.2"
	else
		echo "Cannot downgrade the ~/github/house/web/ext directory. Please update manually."
	fi
else
	echo "Already downgraded based on the .bash_profile"
fi
