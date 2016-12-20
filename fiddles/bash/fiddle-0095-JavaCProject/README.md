fiddle-0094-InitCProject
======

### Title

Init C Project


### Creation Date

09-30-16


### Location

Chicago, IL


### Issue

[Issue #114](https://github.com/bradyhouse/house/issues/114)


### Description

This one actually intersects (or is an intersection) with cubicle space time.  Increasingly, I need the ability to create a simple java based command line app that explores a specific feature of java and/or single library without involving a full blown IDE or Maven repo.  The existing Java fiddle template, which is aimed at gradle/Maven/Spring, is over kill in this regard.  For instance, if you simply want to try something with apache's http library  or play with a Java 8 Lambda function, then creating a full-blown Spring based end point is beyond the pale. Not to mention, I have yet to determine why java fiddles (in their current form) can't actually be initialized during cubicle space time (aka within the fire wall). This alternate Java fiddle template, which would be designated `javac`, would bridge that gap.  Per the norm, the starting point for any fiddle.sh enhancement is a bash fiddle.  The fiddle should be forked from [bash fiddle #94](https://github.com/bradyhouse/house/tree/master/fiddles/bash/fiddle-0094-InitCProject), which should provide a good blue print for the changes required.


### Pre-Requisites

In order to run this POC, the javac compiler, `javac`, should be installed on the machine.  The path to javac is configured
via the [.javarc](scripts/bin/javac/.javacrc) file:

    #!/usr/bin/env bash
    # ---------------------------------------------------------------------------------------------------|
    #  Repo                    : https://github.com/bradyhouse/house_____________________________________|
    #  Specification           : N/A_____________________________________________________________________|
    #  Specification Path      : N/A_____________________________________________________________________|
    #  Author                  : brady house_____________________________________________________________|
    #  Create date             : 12/14/2016______________________________________________________________|
    #  Description             : GLOBAL VARIABLE CONFIG USED BY JAVAC CREATE/START SCRIPTS.______________|
    # ---------------------------------------------------------------------------------------------------|
    #  Revision History::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::|
    # ---------------------------------------------------------------------------------------------------|
    # Baseline Ver - CHANGELOG @ 201612120420
    # ---------------------------------------------------------------------------------------------------|
    
    export __DEFAULT_SOURCE_FILE__="Fiddle.java";
    export __JAVA_COMPILER__="/usr/bin/javac";
    export __DEFAULT_CLASSPATH__=${CLASSPATH};
    

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

Afterwards, the following files should be added to the `fiddles/javac` directory:

    ├── fiddles
    │   └── javac
    │       ├── fiddle-0000-Template
    │       │   ├── README.md
    │       │   └── template
    │       │       └── src
    │       │           └── Fiddle.java

    
#### To Test ...

This POC includes all of the logic necessary to extend the `fiddle.sh` script with `javac` fiddle support.  To see all of this
functionality in action.  Run the following command:

    ./test.sh
    
If everything is working properly, it should generate the following output:

    ┌──TEST.SH
    ├────TESTUTILCAPITALIZE
    Template
    ├────TESTISJAVACINSTALLED
    ├────TESTISJAVAINSTALLED
    ├────TESTJAVACCREATE
    FIDDLE-CREATE.SH
    ┌──FIDDLE-CREATE.SH
    ├────APP NAME:
    "template"
    ├────JAVACCREATE
    ├────INITFIDDLEDIRECTORY
    ├────INITFIDDLECONFIGFILE
    Password:
    ├────"FIDDLE-0000-TEMPLATE" CREATED.
    └──FIDDLE-CREATE.SH
    
    
    ├────TESTJAVACSTART
    FIDDLE-START.SH
    ├────STARTSERVER
    ├────JAVACSTART
    ├────INVOKING EXECUTABLE
    template compiled!
    
    ├────TESTJAVACFORK
    FIDDLE-FORK.SH
    ├────JAVACFORK
    ├────INITFIDDLECONFIGFILE
    ├────FIDDLE-0000-TEMPLATE FORKED TO FIDDLE-0001-FORK
    Done. The "../../fiddles/javac/fiddle-0001-Fork" directory has been initialized.
    ├────TESTJAVACREFACTOR
    FIDDLE-REFACTOR.SH
    Refactor process completed successfully.
    "fiddle-0001-Fork" is now "fiddle-0001-Refactor".
    ├────TESTJAVACLIST
    
    {{ ʕ・ɭ・ʔ }}
    FIDDLE-LIST.SH
    
    --------------------------------------------------------
    JAVAC FIDDLES
    --------------------------------------------------------
    
    fiddle-0000-Template
    fiddle-0001-Refactor
    
    --------------------------------------------------------
    Total:  2
    
    ├────TESTJAVACDELETE
    FIDDLE-DELETE.SH
    
    fiddle type:	javac
    fiddle name:	fiddle-0001-Refactor
    
    Are you sure you want to delete this fiddle? [Y/n] Y
    The "fiddle-0001-Refactor" javac fiddle has been deleted successfully.
    ├────TEARDOWN
    └──TEST.SH


### Tags

bash, javac, java
