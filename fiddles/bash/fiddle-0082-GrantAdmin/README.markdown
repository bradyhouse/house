fiddle-0082-GrantAdmin
======

### Title

Grant Admin


### Creation Date

05-21-16


### Location

Chicago, IL


### Description

I tried running `brew update` on my new Mac mini today, and it returned the following error message:

    Error: The /usr/local directory is not writable.
    Even if this directory was writable when you installed Homebrew, other
    software may change permissions on this directory. For example, upgrading
    to OS X El Capitan has been known to do this. Some versions of the
    "InstantOn" component of Airfoil or running Cocktail cleanup/optimizations
    are known to do this as well.
    
    You should probably change the ownership and permissions of /usr/local
    back to your user account.
      sudo chown -R $(whoami):admin /usr/local

This simple script, which (will) add a new function to the [_utils.sh](../../../scripts/bin/_utils.sh) script can be 
used to recursively grant admin permissions to the current user for a given directory. The new utils function 
`grantAdmin` is based on the command suggested in the above message.  Its accepts a path and then recursively
updates its permissions.


### Tags

bash, chown, whoami, admin, user, local
