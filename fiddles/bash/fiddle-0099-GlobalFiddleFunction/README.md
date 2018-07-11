fiddle-0099-GlobalFiddleFunction
======

### Title

Global Fiddle Function


### Creation Date

06-15-18


### Location

Chicago, IL


### Issue

[Issue #232](https://github.com/bradyhouse/house/issues/232)


### Description

I am sick of having to navigate to the scripts directory every time I want to execute fiddle.sh.  How do I automate 
these steps using a globally defined `fiddle` function?  Assuming there is no learning curve obstruction, how do I 
then automate the installation (aka setup) of said function? Time for my favorite: an actual bash fiddle.  

### Use Case

#### To Test ...

From the root directory, execute the `test.sh` script:

    ./test.sh
    
    ┌──TEST.SH
    ├────TESTUTILFILECONTAINS | ACTUAL: 1 | EXPECTED: 1
    ├────TESTISZSHRC | ACTUAL: 1 | EXPECTED: 1
    ├────TESTUPDATEZSHRC | ACTUAL: | EXPECTED:
    ├────TESTISBASHPROFILE | ACTUAL: 1 | EXPECTED: 1
    ├────TESTUPDATEBASHPROFILE | ACTUAL: | EXPECTED:
    └──TEST.SH


#### To Run ...

From the root directory, execute `run.sh` script:

    ./run.sh
    
    {{ ʕ・ɭ・ʔ }}
    
    ├────SETUP
    ├────INSTALL
    └──DONE ~ BASH INSTALLED SUCCESSFULLY.
    
    
    
    └──RUN.SH

Once complete, the [home/.bash_profile](home/.bash_profile) and the [home/.zshrc](home/.zshrc) should both contain:


    ### FIDDLE.SH ####
    
    function fiddle() {
    	 _location=$(pwd;);
    	 cd /Users/bradyhouse/github/house_232/fiddles/bash/fiddle-0099-GlobalFiddleFunction/scripts;
    	 ./fiddle.sh "$@";
    	 cd ${_location};
    }

In addition, a backup of both files should be added to the home directory.  Finally, if execute `./run.sh` a 
second time, nothing should change.



### Tags

bash, .zshrc, .bash_profile, grep, wc
