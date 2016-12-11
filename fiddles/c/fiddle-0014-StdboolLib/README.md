fiddle-0014-StdboolLib
======

### Title

Boolean Data Types


### Creation Date

12-09-16


### Location

Chicago, IL


### Issue

[Issue 103](https://github.com/bradyhouse/house/issues/103)


### Description

Create a fiddle based on Program 6.10a from Stephen Kochan's book [Programming in C (Developer's Library) 4th Edition](http://a.co/1QJ9MDN).  
This program is a rewrite of Program 6.10 (see [fiddle #13](../fiddle-0013-BooleanDataType)) using the `bool` data type, defined in the `stdbool.h` library, 
in place of the `_Bool` defined in the `stdio.h` library.


### Use Case

Navigate to the scripts directory and execute the following command:

    ./fiddle.sh "start" "c" "0014"
    
This should produce the following output:

    H o u s e
    oooooooooooo  o8o        .o8        .o8  oooo
     888       8  `"'        888        888   888
     888         oooo   .oooo888   .oooo888   888   .ooooo.
     888oooo8     888  d88   888  d88   888   888  d88   88b
     888          888  888   888  888   888   888  888ooo888
     888          888  888   888  888   888   888  888    .o
    o888o        o888o  Y8bod88P   Y8bod88P  o888o  Y8bod8P
    
    FIDDLE.SH
    FIDDLE-START.SH
    ├────STARTSERVER
    ├────GCCSTART
    ├────INVOKING EXECUTABLE
    3 5 5 5 7 7 7 7 7 9 11 11 11 11 11 11 11 11 11 13 13 13 13 13 13 13 13 13 13 13 15 17 17 17 17 17 17 17 17 17 17 17 17 17 17 17 19 19 19 19 19 19 19 19 19 19 19 19 19 19 19 19 19 21 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 25 25 25 27 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 29 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 31 33 35 35 35 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 37 39 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 41 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 43 45 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 47 49 49 49 49 49

### Tags

gcc, c, bool, int, printf, %, stdio.h, stdbool.h


### Forked From

[fiddle-0013-BooleanDataType](../fiddle-0013-BooleanDataType)
