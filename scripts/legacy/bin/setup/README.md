setup
=====

This folder contains a collection of _sub-scripts_ used to setup applications and libraries required by the `fiddle.sh` app. 
The collection is organized by operating system. Each `*.sh` file contain functions referenced (or "sourced") by the `_setup.sh` 
script.  The `_*` prefix is a convention meant to indicate that the file cannot be executed directly. The `_setup.sh` script
is meant as the entry point for deciding which operating system collection should be used.  It is `sourced` by the master
[fiddle-setup.sh](../../fiddle-setup.sh) script.
