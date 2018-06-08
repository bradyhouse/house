Node (update)
======

Executing the command `./fiddle.sh "update" "node" "0000"` produces the following output 
(see below).  This command, is used to update the dependencies defined in the package.json of the target fiddle, which
in this case is [fiddle-0000-Template](fiddle-0000-Template).

      {{ ʕ・ɭ・ʔ }}
      
      ├────UPDATEFIDDLE
      ├────UPDATE
      ├────NVMINSTALL
      v8.9.4 is already installed.
      Now using node v8.9.4 (npm v5.6.0)
      ├────NCUINSTALL
      ├────SHRINKWRAPINSTALL
      
      {{ ʕ・ɭ・ʔ }}
      
      ├────SETUP
      ├────INSTALL
      ├────IINSTALLSHRINKWRAP
      + shrinkwrap@0.4.0
      updated 1 package in 1.395s
      Done. shrinkwrap installed successfully.
      
      
      ├────RMNODEMODULES
      ├────RMPACKAGELOCK
      ├────NPMCHECKUPDATES
      Using /Users/bradyhouse/github/house_230/fiddles/node/fiddle-0000-Template/package.json
      ⸨░░░░░░░░░░░░░░░░░░⸩ ⠹ :
      All dependencies match the latest package versions :)
      
      ├────NPMSHRINKWRAP
      npm notice created a lockfile as npm-shrinkwrap.json. You should commit this file.
      └──UPDATE COMPLETE.

    
    
