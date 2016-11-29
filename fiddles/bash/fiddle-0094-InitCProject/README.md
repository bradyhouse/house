fiddle-0094-InitCProject
======

### Title

Init C Project


### Creation Date

09-30-16


### Location

Chicago, IL


### Issue

[Issue 89](https://github.com/bradyhouse/house/issues/89)


### Description

Starting point for [Issue 88](https://github.com/bradyhouse/house/issues/88).  Specifically, before making changes to the `fiddle.sh` script start with a POC.  Build a bash script that can be used to initialize a new `C` project.  Fork [Bash Fiddle #93](https://github.com/bradyhouse/house/tree/master/fiddles/bash/fiddle-0093-InitAndroidProject) as a starting point.  This will provide you with a `fiddle.sh` style blue print with all the necessary pieces.


### Pre-Requisites

In order to run this POC, the GNU C compiler, `gcc`, should be installed on the machine.  The path to GCC is configured
via the [.gccrc](scripts/bin/c/.gccrc) file:

    #!/usr/bin/env bash
    # ---------------------------------------------------------------------------------------------------|
    #  Repo                    : https://github.com/bradyhouse/house_____________________________________|
    #  Specification           : N/A_____________________________________________________________________|
    #  Specification Path      : N/A_____________________________________________________________________|
    #  Author                  : brady house_____________________________________________________________|
    #  Create date             : 11/29/2016______________________________________________________________|
    #  Description             : GLOBAL VARIABLE CONFIG USED BY C CREATE/START SCRIPTS.__________________|
    # ---------------------------------------------------------------------------------------------------|
    #  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
    # ---------------------------------------------------------------------------------------------------|
    # Baseline Ver - CHANGELOG @ 201611280420
    # ---------------------------------------------------------------------------------------------------|
    
    export __DEFAULT_SOURCE_FILE__="main.c";
    export __C_COMPILER__="/usr/bin/gcc";
    

### Use Case

#### To Run ...

To create a new Android project, from the root directory, execute the `run.sh` script:

    ./run.sh

If everything is working properly, it should generate the following output:

    ┌──FIDDLE-C.SH
    ├────APP NAME:
    "console"
    ├────GCCCREATE
    ├────INITFIDDLEDIRECTORY
    ├────INITFIDDLECONFIGFILE
    ├────"FIDDLE-0001-CONSOLE" CREATED.
    └──FIDDLE-C.SH
    
    └──RUN.SH

Afterwards, the following files should be added to the `fiddles/c` directory:

    ├── fiddles
    │   └── c
    │       ├── fiddle-0001-Console
    │       │   ├── README.md
    │       │   └── console
    │       │       └── main.c

    
#### To Test ...

This POC includes all of the logic necessary to extend the `fiddle.sh` script with java fiddle support.  To see all of this
functionality in action.  Run the following command:

    ./test.sh
    
If everything is working properly, it should generate the following output:

    ┌──TEST.SH
    ├────TESTUTILCAPITALIZE
    Template
    ├────TESTISGCCINSTALLED
    ├────TESTGCCCREATE
    ├────GCCCREATE
    ├────INITFIDDLEDIRECTORY
    ├────INITFIDDLECONFIGFILE
    ├────"FIDDLE-0000-TEMPLATE" CREATED.
    ├────TESTGCCSTART
    ├────GCCSTART
    ├────INVOKING EXECUTABLE
    template compiled!
    
    ├────TESTGCCFORK
    ├────CFORK
    ├────INITFIDDLECONFIGFILE
    ├────FIDDLE-0000-TEMPLATE FORKED TO FIDDLE-0001-FORK
    ├────TEARDOWN
    └──TEST.SH


### Tags

bash, c, gcc
