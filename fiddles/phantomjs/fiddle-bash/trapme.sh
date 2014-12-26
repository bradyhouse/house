#!/bin/bash

phantomjs
OUT=$?
if [ $OUT -eq 0 ]; then
	echo "Done."
else
	echo "Oops! Failed.!"
fi

